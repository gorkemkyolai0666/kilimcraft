import { PartialType } from '@nestjs/mapped-types';
import { CreateYarnBatchDto } from './create-yarn-batch.dto';

export class UpdateYarnBatchDto extends PartialType(CreateYarnBatchDto) {}
