import { IsOptional, Length, IsString, IsDateString, IsInt } from 'class-validator';

export class UpdateTaskDto {
  @Length(3, 100)
  @IsString()
  @IsOptional()
  title: string;

  @Length(3, 500)
  @IsString()
  @IsOptional()
  notes: string;

  @IsDateString()
  @IsOptional()
  reminder: Date;

  @IsInt()
  @IsOptional()
  listId: number;
}
