import { IsString, IsNumber, Min } from 'class-validator';

export class CreatePatternDto {
  @IsString()
  name: string;

  @IsString()
  region: string;

  @IsString()
  motifType: string;

  @IsString()
  colorPalette: string;

  @IsNumber()
  @Min(0)
  knotDensity: number;

  @IsNumber()
  @Min(0)
  widthCm: number;

  @IsNumber()
  @Min(0)
  lengthCm: number;
}
