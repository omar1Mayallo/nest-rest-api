import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserProfileDto {
  @Length(3, 20)
  @IsString()
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @Length(6, 20)
  @IsString()
  @IsOptional()
  password?: string;
}
