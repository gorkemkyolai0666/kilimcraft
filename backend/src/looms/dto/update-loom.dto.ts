import { PartialType } from '@nestjs/mapped-types';
import { CreateLoomDto } from './create-loom.dto';

export class UpdateLoomDto extends PartialType(CreateLoomDto) {}
