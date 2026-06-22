import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkshopDto } from './dto/create-workshop.dto';
import { UpdateWorkshopDto } from './dto/update-workshop.dto';

@Injectable()
export class WorkshopsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.workshop.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.workshop.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Atölye bulunamadı');
    return item;
  }

  create(dto: CreateWorkshopDto) {
    return this.prisma.workshop.create({
      data: {

        name: dto.name,
        city: dto.city,
        address: dto.address,
        foundedYear: dto.foundedYear,
        status: dto.status || 'active',

      },
    });
  }

  async update(id: string, dto: UpdateWorkshopDto) {
    await this.findOne(id);
    return this.prisma.workshop.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.workshop.delete({ where: { id } });
  }
}
