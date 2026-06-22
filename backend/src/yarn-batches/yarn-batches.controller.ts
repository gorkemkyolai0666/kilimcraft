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
import { YarnBatchesService } from './yarn-batches.service';
import { CreateYarnBatchDto } from './dto/create-yarn-batch.dto';
import { UpdateYarnBatchDto } from './dto/update-yarn-batch.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('yarn-batches')
@UseGuards(JwtAuthGuard)
export class YarnBatchesController {
  constructor(private readonly yarnBatchesService: YarnBatchesService) {}

  @Get()
  findAll() {
    return this.yarnBatchesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.yarnBatchesService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateYarnBatchDto) {
    return this.yarnBatchesService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateYarnBatchDto) {
    return this.yarnBatchesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.yarnBatchesService.remove(id);
  }
}
