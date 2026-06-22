import { PartialType } from '@nestjs/mapped-types';
import { CreateProductionRunDto } from './create-production-run.dto';

export class UpdateProductionRunDto extends PartialType(CreateProductionRunDto) {}
