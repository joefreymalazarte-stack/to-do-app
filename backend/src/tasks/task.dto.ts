import { IsString, IsEnum, IsOptional, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(['todo', 'in-progress', 'done'])
  status?: string;

  @IsOptional()
  @IsNumber()
  priority?: number;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(['todo', 'in-progress', 'done'])
  status?: string;

  @IsOptional()
  @IsNumber()
  priority?: number;
}
