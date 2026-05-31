import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/request/register.dto';
import { LoginDto } from './dto/request/login.dto';
import { RefreshDto } from './dto/request/refresh.dto';
import { LogoutDto } from './dto/request/logout.dto';
import { RegisterResponseDto } from './dto/response/register-response.dto';
import { LoginResponseDto } from './dto/response/login-response.dto';
import { RefreshResponseDto } from './dto/response/refresh-response.dto';
import { ResponseMessage } from '../common/decorators/response-message.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ResponseMessage('Register successfully')
  async register(@Body() dto: RegisterDto): Promise<RegisterResponseDto> {
    return await this.authService.register(dto);
  }

  @Post('login')
  @ResponseMessage('Login successfully')
  async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    return await this.authService.login(dto);
  }

  @Post('refresh')
  @ResponseMessage('Token refreshed successfully')
  async refresh(@Body() dto: RefreshDto): Promise<RefreshResponseDto> {
    return await this.authService.refresh(dto);
  }

  @Post('logout')
  @ResponseMessage('Logout successfully')
  async logout(@Body() dto: LogoutDto): Promise<void> {
    return await this.authService.logout(dto);
  }
}
