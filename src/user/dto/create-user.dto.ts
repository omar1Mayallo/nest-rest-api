import { IsNotEmpty, IsEmail, Length, IsString } from 'class-validator';

export class CreateUserDto {
  @Length(3, 20)
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Length(3, 20)
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @Length(6, 20)
  @IsString()
  @IsNotEmpty()
  password: string;
}
