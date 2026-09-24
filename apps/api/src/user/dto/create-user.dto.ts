import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4, { message: 'username phải có ít nhất 4 kí tự' })
  @MaxLength(20, { message: 'username không được quá 20 kí tự' })
  username!: string;

  @IsUUID()
  @IsNotEmpty()
  roleId!: string;
}
