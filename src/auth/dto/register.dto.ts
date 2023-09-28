import { IsNotEmpty, IsEmail, Length, IsString } from 'class-validator';

export class RegisterDto {
  @Length(3, 20)
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @Length(6, 20)
  @IsString()
  @IsNotEmpty()
  password: string;
}
