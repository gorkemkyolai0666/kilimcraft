import { PartialType } from '@nestjs/mapped-types';
import { CreateWeaverDto } from './create-weaver.dto';

export class UpdateWeaverDto extends PartialType(CreateWeaverDto) {}
