import { IsString, IsNumber, IsOptional, IsEnum, IsDateString, Min } from 'class-validator';
import { ProductionRunStatus } from '@prisma/client';

export class CreateProductionRunDto {
  @IsDateString()
  runDate: string;

  @IsNumber()
  @Min(0)
  hoursWorked: number;

  @IsNumber()
  @Min(0)
  cmCompleted: number;

  @IsString()
  orderId: string;

  @IsString()
  weaverId: string;

  @IsOptional()
  @IsEnum(ProductionRunStatus)
  status?: ProductionRunStatus;
}
