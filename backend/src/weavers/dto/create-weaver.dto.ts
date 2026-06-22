import { IsString, IsOptional, IsEnum } from 'class-validator';
import { SkillLevel, WeaverStatus } from '@prisma/client';

export class CreateWeaverDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(SkillLevel)
  skillLevel?: SkillLevel;

  @IsString()
  phone: string;

  @IsString()
  workshopId: string;

  @IsOptional()
  @IsEnum(WeaverStatus)
  status?: WeaverStatus;
}
