import { IsString, IsNumber, IsOptional, IsEnum, Min } from 'class-validator';
import { WorkshopStatus } from '@prisma/client';

export class CreateWorkshopDto {
  @IsString()
  name: string;

  @IsString()
  city: string;

  @IsString()
  address: string;

  @IsNumber()
  @Min(1800)
  foundedYear: number;

  @IsOptional()
  @IsEnum(WorkshopStatus)
  status?: WorkshopStatus;
}
