import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/request/register.dto';
import * as bcrypt from 'bcrypt';
import { ROLES, AUTH_PROVIDER } from '@repo/shared';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/request/login.dto';
import type { StringValue } from 'ms';
import { Prisma } from '@prisma/client';
import ms from 'ms';
import { createHash, randomBytes } from 'node:crypto';
import { RegisterResponseDto } from './dto/response/register-response.dto';
import { UserInfoDto } from './dto/response/user-info.dto';
import { MailService } from '../mail/mail.service';
import { OAuth2Client } from 'google-auth-library';
import { ChangePasswordDto } from './dto/request/change-password.dto';
import { ForgotPasswordDto } from './dto/request/forgot-password.dto';
import { ResetPasswordDto } from './dto/request/reset-password.dto';

type LoginResult = {
  accessToken: string;
  refreshToken: string;
  user: UserInfoDto;
};

type RefreshResult = {
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class AuthService {
  private readonly googleClient: OAuth2Client;
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {
    this.googleClient = new OAuth2Client(
      this.config.get<string>('GOOGLE_CLIENT_ID'),
    );
  }

  async register(dto: RegisterDto): Promise<RegisterResponseDto> {
    try {
      const hashedPass = await bcrypt.hash(dto.password, 10);
      const defaultRole = await this.prisma.role.findUnique({
        where: { name: ROLES.USER },
      });
      if (!defaultRole)
        throw new InternalServerErrorException('Default role not found');

      return await this.prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
          data: {
            username: dto.username,
            email: dto.email,
            name: dto.name ?? dto.username,
            roleId: defaultRole.id,
          },
        });

        await tx.account.create({
          data: {
            userId: newUser.id,
            provider: AUTH_PROVIDER.LOCAL,
            providerAccountId: dto.email,
            password: hashedPass,
          },
        });

        // Send verification email
        const token = randomBytes(32).toString('hex');
        await tx.verificationToken.create({
          data: {
            email: dto.email,
            token,
            expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
          },
        });

        this.mailService
          .sendVerificationEmail(dto.email, token)
          .catch(console.error);

        return {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          name: newUser.name,
        };
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('The username or email is already exists');
      }
      if (error instanceof Error) throw error;
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  async verifyEmail(token: string): Promise<void> {
    const record = await this.prisma.verificationToken.findUnique({
      where: { token },
    });
    if (!record || record.expiredAt < new Date()) {
      throw new BadRequestException('Invalid or expired verification token');
    }

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { email: record.email },
        data: { emailVerifiedAt: new Date() },
      }),
      this.prisma.verificationToken.delete({
        where: { id: record.id },
      }),
    ]);
  }

  async login(dto: LoginDto): Promise<LoginResult> {
    const isEmail = dto.identifier.includes('@');
    const user = await this.prisma.user.findFirst({
      where: isEmail ? { email: dto.identifier } : { username: dto.identifier },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (!user.emailVerifiedAt) {
      throw new UnauthorizedException(
        'Please verify your email before logging in',
      );
    }

    const account = await this.prisma.account.findFirst({
      where: {
        userId: user.id,
        provider: AUTH_PROVIDER.LOCAL,
      },
    });
    if (!account) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (!account.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      account.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (user.isBlocked) {
      throw new ForbiddenException('Account is blocked');
    }

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastLoginAt: new Date(),
      },
    });

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      roleId: user.roleId,
    });
    const refreshExpiresIn =
      (this.config.get<string>('JWT_REFRESH_EXPIRES_IN') as StringValue) ??
      '7d';
    const refreshExpiresMs = ms(refreshExpiresIn);
    const refreshToken = await this.jwtService.signAsync(
      { sub: user.id },
      {
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: refreshExpiresMs,
      },
    );

    const hashedToken = createHash('sha256').update(refreshToken).digest('hex');
    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: hashedToken,
        expiredAt: new Date(Date.now() + refreshExpiresMs),
      },
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        roleId: user.roleId,
      },
    };
  }

  async googleLogin(accessTokenGoogle: string): Promise<LoginResult> {
    const response = await fetch(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: { Authorization: `Bearer ${accessTokenGoogle}` },
      },
    );
    if (!response.ok) {
      throw new UnauthorizedException('Invalid Google access token');
    }
    const profile = await response.json();

    const { email, name, sub } = profile;

    let user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email },
          {
            accounts: {
              some: { provider: AUTH_PROVIDER.GOOGLE, providerAccountId: sub },
            },
          },
        ],
      },
    });

    if (user) {
      if (user.isBlocked) {
        throw new ForbiddenException('Account is blocked');
      }

      const existingAccount = await this.prisma.account.findFirst({
        where: { userId: user?.id, provider: AUTH_PROVIDER.GOOGLE },
      });
      if (!existingAccount) {
        await this.prisma.account.create({
          data: {
            userId: user?.id,
            provider: AUTH_PROVIDER.GOOGLE,
            providerAccountId: sub,
          },
        });
      }
    } else {
      const defaultRole = await this.prisma.role.findUnique({
        where: { name: ROLES.USER },
      });
      if (!defaultRole) {
        throw new InternalServerErrorException('Default role not found');
      }

      const username =
        email.split('@')[0] + '_' + Math.random().toString(36).slice(2, 6);

      user = await this.prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
          data: {
            email,
            name: name ?? email.split('@')[0],
            username,
            roleId: defaultRole.id,
          },
        });

        await tx.account.create({
          data: {
            userId: newUser.id,
            provider: AUTH_PROVIDER.GOOGLE,
            providerAccountId: sub,
          },
        });

        return newUser;
      });
    }

    await this.prisma.user.update({
      where: { id: user?.id },
      data: { lastLoginAt: new Date() },
    });

    const accessToken = await this.jwtService.signAsync({
      sub: user?.id,
      email: user?.email,
      roleId: user?.roleId,
    });
    const refreshExpiresIn =
      (this.config.get<string>('REFRESH_EXPIRES_IN') as StringValue) ?? '7d';
    const refreshExpiresMs = ms(refreshExpiresIn);
    const refreshToken = await this.jwtService.signAsync(
      { sub: user?.id },
      {
        secret: this.config.get<string>('REFRESH_SECRET'),
        expiresIn: refreshExpiresMs,
      },
    );
    const hashedToken = createHash('sha256').update(refreshToken).digest('hex');
    await this.prisma.refreshToken.create({
      data: {
        userId: user?.id,
        token: hashedToken,
        expiredAt: new Date(Date.now() + refreshExpiresMs),
      },
    });
    return {
      accessToken,
      refreshToken,
      user: {
        id: user?.id,
        email: user?.email,
        name: user?.name,
        roleId: user?.roleId,
      },
    };
  }

  async refresh(refreshToken: string): Promise<RefreshResult> {
    const tokenHash = createHash('sha256').update(refreshToken).digest('hex');
    const tokenRecord = await this.prisma.refreshToken.findFirst({
      where: {
        token: tokenHash,
        expiredAt: {
          gt: new Date(),
        },
      },
      include: {
        user: true,
      },
    });
    if (!tokenRecord) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = tokenRecord.user;
    if (user.isBlocked) {
      throw new ForbiddenException('Account is blocked');
    }

    await this.prisma.refreshToken.delete({
      where: {
        id: tokenRecord.id,
      },
    });

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      roleId: user.roleId,
    });
    const refreshExpiresIn =
      (this.config.get<string>('JWT_REFRESH_EXPIRES_IN') as StringValue) ??
      '7d';
    const refreshExpiresMs = ms(refreshExpiresIn);
    const newRefreshToken = await this.jwtService.signAsync(
      { sub: user.id },
      {
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: refreshExpiresMs,
      },
    );
    const hashedToken = createHash('sha256')
      .update(newRefreshToken)
      .digest('hex');

    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: hashedToken,
        expiredAt: new Date(Date.now() + refreshExpiresMs),
      },
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(refreshToken: string): Promise<void> {
    const tokenHash = createHash('sha256').update(refreshToken).digest('hex');
    await this.prisma.refreshToken.deleteMany({
      where: {
        token: tokenHash,
      },
    });
  }

  async changePassword(userId: string, dto: ChangePasswordDto): Promise<void> {
    const { currentPassword, newPassword } = dto;
    const existingAccount = await this.prisma.account.findFirst({
      where: { userId, provider: AUTH_PROVIDER.LOCAL },
    });
    if (!existingAccount) {
      throw new BadRequestException('This account cannot change password');
    }
    const isMatch = await bcrypt.compare(
      currentPassword,
      existingAccount.password!,
    );
    if (!isMatch) {
      throw new BadRequestException('Current password is not match');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prisma.$transaction([
      this.prisma.account.update({
        where: { id: existingAccount.id },
        data: { password: hashedPassword },
      }),
      this.prisma.refreshToken.deleteMany({
        where: { userId },
      }),
    ]);
  }

  async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    const { email } = dto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) return;

    const account = await this.prisma.account.findFirst({
      where: { userId: user.id, provider: AUTH_PROVIDER.LOCAL },
    });
    if (!account) return;

    await this.prisma.passwordResetToken.deleteMany({
      where: { email },
    });

    const token = randomBytes(32).toString('hex');
    await this.prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expiredAt: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    this.mailService.sendPasswordResetEmail(email, token).catch(console.error);
  }

  async resetPassword(dto: ResetPasswordDto): Promise<void> {
    const { token, password } = dto;

    const record = await this.prisma.passwordResetToken.findUnique({
      where: { token },
    });
    if (!record || record.expiredAt < new Date()) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const user = await this.prisma.user.findUnique({
      where: { email: record.email },
    });
    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const account = await this.prisma.account.findFirst({
      where: { userId: user.id, provider: AUTH_PROVIDER.LOCAL },
    });
    if (!account) {
      throw new BadRequestException('This account cannot reset password');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.prisma.$transaction([
      this.prisma.account.update({
        where: { id: account.id },
        data: { password: hashedPassword },
      }),
      this.prisma.passwordResetToken.delete({
        where: { id: record.id },
      }),
      this.prisma.refreshToken.deleteMany({
        where: { userId: user.id },
      }),
    ]);
  }
}
