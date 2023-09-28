import { IsNotEmpty, IsEmail, Length, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(6, 20)
  @IsString()
  @IsNotEmpty()
  password: string;
}
