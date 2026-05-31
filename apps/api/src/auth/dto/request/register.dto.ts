import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4, { message: 'username phải có ít nhất 4 kí tự ' })
  @MaxLength(20, { message: 'username không được quá 20 kí tự ' })
  username!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Mật khẩu phải chứa chữ hoa, chữ thường và số',
  })
  password!: string;

  @IsNotEmpty()
  @IsNotEmpty()
  email!: string;

  @IsOptional()
  @IsString()
  name?: string;
}
