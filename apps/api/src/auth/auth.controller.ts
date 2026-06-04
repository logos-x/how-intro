import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  UnauthorizedException,
  Query,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/request/register.dto';
import { LoginDto } from './dto/request/login.dto';
import { RegisterResponseDto } from './dto/response/register-response.dto';
import { LoginResponseDto } from './dto/response/login-response.dto';
import { RefreshResponseDto } from './dto/response/refresh-response.dto';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import type { Response, Request } from 'express';
import { REFRESH_TOKEN_COOKIE_OPTIONS } from './constants/cookie.constant';
import { ConfigService } from '@nestjs/config';
import { GoogleLoginDto } from './dto/request/google-login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  @Post('register')
  @ResponseMessage('Register successfully')
  async register(@Body() dto: RegisterDto): Promise<RegisterResponseDto> {
    return await this.authService.register(dto);
  }

  @Get('verify-email')
  async verifyEmail(
    @Res() res: Response,
    @Query('token') token: string,
  ): Promise<void> {
    try {
      await this.authService.verifyEmail(token);
      return res.redirect(
        `${this.config.get<string>('WEB_URL')}/login?verified=true`,
      );
    } catch {
      return res.redirect(
        `${this.config.get<string>('WEB_URL')}/login?verified=false`,
      );
    }
  }

  @Post('login')
  @ResponseMessage('Login successfully')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginDto,
  ): Promise<LoginResponseDto> {
    const result = await this.authService.login(dto);
    res.cookie(
      'refreshToken',
      result.refreshToken,
      REFRESH_TOKEN_COOKIE_OPTIONS(),
    );

    return {
      accessToken: result.accessToken,
      user: result.user,
    };
  }

  @Post('google')
  @ResponseMessage('Login with Google successfully')
  async googleLogin(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: GoogleLoginDto,
  ): Promise<LoginResponseDto> {
    const result = await this.authService.googleLogin(dto.accessToken);
    res.cookie(
      'refreshToken',
      result.refreshToken,
      REFRESH_TOKEN_COOKIE_OPTIONS(),
    );
    return {
      accessToken: result.accessToken,
      user: result.user,
    };
  }

  @Post('refresh')
  @ResponseMessage('Token refreshed successfully')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<RefreshResponseDto> {
    const refreshToken = req.cookies.refreshToken as string | undefined;
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }
    const result = await this.authService.refresh(refreshToken);
    res.cookie(
      'refreshToken',
      result.refreshToken,
      REFRESH_TOKEN_COOKIE_OPTIONS(),
    );
    return {
      accessToken: result.accessToken,
    };
  }

  @Post('logout')
  @ResponseMessage('Logout successfully')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const refreshToken = req.cookies.refreshToken as string | undefined;
    if (refreshToken) {
      await this.authService.logout(refreshToken);
      res.clearCookie('refreshToken', {
        ...REFRESH_TOKEN_COOKIE_OPTIONS(),
        maxAge: undefined,
      });
    }
  }
}
