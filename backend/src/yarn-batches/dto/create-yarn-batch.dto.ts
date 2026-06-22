import { IsString, IsNumber, Min } from 'class-validator';

export class CreateYarnBatchDto {
  @IsString()
  batchCode: string;

  @IsString()
  fiberType: string;

  @IsString()
  color: string;

  @IsNumber()
  @Min(0)
  weightKg: number;

  @IsString()
  supplier: string;

  @IsNumber()
  @Min(0)
  unitCost: number;
}
