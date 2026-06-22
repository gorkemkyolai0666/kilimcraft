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
import { WeaversService } from './weavers.service';
import { CreateWeaverDto } from './dto/create-weaver.dto';
import { UpdateWeaverDto } from './dto/update-weaver.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('weavers')
@UseGuards(JwtAuthGuard)
export class WeaversController {
  constructor(private readonly weaversService: WeaversService) {}

  @Get()
  findAll() {
    return this.weaversService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weaversService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateWeaverDto) {
    return this.weaversService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateWeaverDto) {
    return this.weaversService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weaversService.remove(id);
  }
}
