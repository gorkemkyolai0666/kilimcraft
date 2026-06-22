import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { WeavingOrdersService } from './weaving-orders.service';
import { CreateWeavingOrderDto } from './dto/create-weaving-order.dto';
import { UpdateWeavingOrderDto } from './dto/update-weaving-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('weaving-orders')
@UseGuards(JwtAuthGuard)
export class WeavingOrdersController {
  constructor(private readonly weavingOrdersService: WeavingOrdersService) {}

  @Get()
  findAll() {
    return this.weavingOrdersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weavingOrdersService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateWeavingOrderDto) {
    return this.weavingOrdersService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateWeavingOrderDto) {
    return this.weavingOrdersService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weavingOrdersService.remove(id);
  }
}
