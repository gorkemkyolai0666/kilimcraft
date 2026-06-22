import { IsString, IsNumber, IsOptional, IsEnum, Min } from 'class-validator';
import { LoomStatus } from '@prisma/client';

export class CreateLoomDto {
  @IsString()
  code: string;

  @IsNumber()
  @Min(0)
  widthCm: number;

  @IsString()
  loomType: string;

  @IsOptional()
  @IsEnum(LoomStatus)
  status?: LoomStatus;

  @IsString()
  workshopId: string;
}
