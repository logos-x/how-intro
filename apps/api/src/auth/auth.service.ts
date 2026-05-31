import {
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
import { RefreshDto } from './dto/request/refresh.dto';
import { createHash } from 'node:crypto';
import { LogoutDto } from './dto/request/logout.dto';
import { RegisterResponseDto } from './dto/response/register-response.dto';
import { LoginResponseDto } from './dto/response/login-response.dto';
import { RefreshResponseDto } from './dto/response/refresh-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<RegisterResponseDto> {
    try {
      const hashedPass = await bcrypt.hash(dto.password, 10);
      const defaultRole = await this.prisma.role.findUnique({
        where: { name: ROLES.USER },
      });
      if (!defaultRole)
        throw new InternalServerErrorException(
          'Vai trò mặc định không tồn tại',
        );

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
            provider: AUTH_PROVIDER,
            providerAccountId: dto.email,
            password: hashedPass,
          },
        });

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

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const isEmail = dto.identifier.includes('@');
    const user = await this.prisma.user.findFirst({
      where: isEmail ? { email: dto.identifier } : { username: dto.identifier },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const account = await this.prisma.account.findFirst({
      where: {
        userId: user.id,
        provider: AUTH_PROVIDER,
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

  async refresh(dto: RefreshDto): Promise<RefreshResponseDto> {
    const tokenHash = createHash('sha256')
      .update(dto.refreshToken)
      .digest('hex');
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

  async logout(dto: LogoutDto): Promise<void> {
    const tokenHash = createHash('sha256')
      .update(dto.refreshToken)
      .digest('hex');
    await this.prisma.refreshToken.deleteMany({
      where: {
        token: tokenHash,
      },
    });
  }
}
