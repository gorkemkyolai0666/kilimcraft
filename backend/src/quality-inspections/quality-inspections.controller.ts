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
import { QualityInspectionsService } from './quality-inspections.service';
import { CreateQualityInspectionDto } from './dto/create-quality-inspection.dto';
import { UpdateQualityInspectionDto } from './dto/update-quality-inspection.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('quality-inspections')
@UseGuards(JwtAuthGuard)
export class QualityInspectionsController {
  constructor(private readonly qualityInspectionsService: QualityInspectionsService) {}

  @Get()
  findAll() {
    return this.qualityInspectionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.qualityInspectionsService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateQualityInspectionDto) {
    return this.qualityInspectionsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateQualityInspectionDto) {
    return this.qualityInspectionsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.qualityInspectionsService.remove(id);
  }
}
