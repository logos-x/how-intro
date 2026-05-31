import { UserInfoDto } from './user-info.dto';

export class LoginResponseDto {
  accessToken!: string;
  refreshToken!: string;
  user!: UserInfoDto;
}
