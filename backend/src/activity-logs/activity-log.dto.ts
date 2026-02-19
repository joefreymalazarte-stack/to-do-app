import { IsString, IsOptional } from 'class-validator';

export class CreateActivityLogDto {
  @IsString()
  taskId: string;

  @IsString()
  action: string;

  @IsOptional()
  @IsString()
  details?: string;
}
