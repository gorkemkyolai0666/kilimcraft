import { IsString, IsNumber, IsEnum, IsDateString, Min, Max, IsOptional } from 'class-validator';
import { InspectionResult } from '@prisma/client';

export class CreateQualityInspectionDto {
  @IsDateString()
  inspectionDate: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  score: number;

  @IsNumber()
  @Min(0)
  defectCount: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsString()
  orderId: string;

  @IsEnum(InspectionResult)
  result: InspectionResult;
}
