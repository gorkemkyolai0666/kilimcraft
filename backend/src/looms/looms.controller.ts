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
import { LoomsService } from './looms.service';
import { CreateLoomDto } from './dto/create-loom.dto';
import { UpdateLoomDto } from './dto/update-loom.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('looms')
@UseGuards(JwtAuthGuard)
export class LoomsController {
  constructor(private readonly loomsService: LoomsService) {}

  @Get()
  findAll() {
    return this.loomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loomsService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateLoomDto) {
    return this.loomsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLoomDto) {
    return this.loomsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loomsService.remove(id);
  }
}
