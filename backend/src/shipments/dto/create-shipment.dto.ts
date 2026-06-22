import { IsString, IsNumber, IsOptional, IsEnum, IsDateString, Min } from 'class-validator';
import { ShipmentStatus } from '@prisma/client';

export class CreateShipmentDto {
  @IsString()
  trackingCode: string;

  @IsString()
  destination: string;

  @IsNumber()
  @Min(0)
  weightKg: number;

  @IsDateString()
  shipDate: string;

  @IsString()
  orderId: string;

  @IsOptional()
  @IsEnum(ShipmentStatus)
  status?: ShipmentStatus;
}
