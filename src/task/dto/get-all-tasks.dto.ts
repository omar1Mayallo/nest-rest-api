import { IsOptional, IsString, IsInt } from 'class-validator';

export class GetAllTasksDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  page?: number;

  @IsOptional()
  @IsString()
  limit?: number;

  @IsOptional()
  @IsString()
  sort?: string;
}
