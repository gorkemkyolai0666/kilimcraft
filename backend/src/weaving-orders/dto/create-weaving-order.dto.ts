import { IsString, IsNumber, IsOptional, IsEnum, IsDateString, Min } from 'class-validator';
import { WeavingOrderStatus } from '@prisma/client';

export class CreateWeavingOrderDto {
  @IsString()
  orderCode: string;

  @IsString()
  clientName: string;

  @IsString()
  patternId: string;

  @IsString()
  loomId: string;

  @IsNumber()
  @Min(0)
  widthCm: number;

  @IsNumber()
  @Min(0)
  lengthCm: number;

  @IsOptional()
  @IsEnum(WeavingOrderStatus)
  status?: WeavingOrderStatus;

  @IsDateString()
  deadline: string;
}
