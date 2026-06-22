import { PartialType } from '@nestjs/mapped-types';
import { CreateWeavingOrderDto } from './create-weaving-order.dto';

export class UpdateWeavingOrderDto extends PartialType(CreateWeavingOrderDto) {}
