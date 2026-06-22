import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWeaverDto } from './dto/create-weaver.dto';
import { UpdateWeaverDto } from './dto/update-weaver.dto';

@Injectable()
export class WeaversService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.weaver.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.weaver.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Dokumacı bulunamadı');
    return item;
  }

  create(dto: CreateWeaverDto) {
    return this.prisma.weaver.create({
      data: {

        name: dto.name,
        skillLevel: dto.skillLevel || 'apprentice',
        phone: dto.phone,
        workshopId: dto.workshopId,
        status: dto.status || 'active',

      },
    });
  }

  async update(id: string, dto: UpdateWeaverDto) {
    await this.findOne(id);
    return this.prisma.weaver.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.weaver.delete({ where: { id } });
  }
}
