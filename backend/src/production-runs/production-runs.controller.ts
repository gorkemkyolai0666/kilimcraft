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
import { ProductionRunsService } from './production-runs.service';
import { CreateProductionRunDto } from './dto/create-production-run.dto';
import { UpdateProductionRunDto } from './dto/update-production-run.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('production-runs')
@UseGuards(JwtAuthGuard)
export class ProductionRunsController {
  constructor(private readonly productionRunsService: ProductionRunsService) {}

  @Get()
  findAll() {
    return this.productionRunsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productionRunsService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateProductionRunDto) {
    return this.productionRunsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductionRunDto) {
    return this.productionRunsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productionRunsService.remove(id);
  }
}
