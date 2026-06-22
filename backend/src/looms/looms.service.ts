import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLoomDto } from './dto/create-loom.dto';
import { UpdateLoomDto } from './dto/update-loom.dto';

@Injectable()
export class LoomsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.loom.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.loom.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Tezgah bulunamadı');
    return item;
  }

  create(dto: CreateLoomDto) {
    return this.prisma.loom.create({
      data: {

        code: dto.code,
        widthCm: dto.widthCm,
        loomType: dto.loomType,
        status: dto.status || 'active',
        workshopId: dto.workshopId,

      },
    });
  }

  async update(id: string, dto: UpdateLoomDto) {
    await this.findOne(id);
    return this.prisma.loom.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.loom.delete({ where: { id } });
  }
}
