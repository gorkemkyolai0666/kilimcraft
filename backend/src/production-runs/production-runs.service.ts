import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductionRunDto } from './dto/create-production-run.dto';
import { UpdateProductionRunDto } from './dto/update-production-run.dto';

@Injectable()
export class ProductionRunsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.productionRun.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.productionRun.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Üretim kaydı bulunamadı');
    return item;
  }

  create(dto: CreateProductionRunDto) {
    return this.prisma.productionRun.create({
      data: {

        runDate: new Date(dto.runDate),
        hoursWorked: dto.hoursWorked,
        cmCompleted: dto.cmCompleted,
        orderId: dto.orderId,
        weaverId: dto.weaverId,
        status: dto.status || 'in_progress',

      },
    });
  }

  async update(id: string, dto: UpdateProductionRunDto) {
    await this.findOne(id);
    return this.prisma.productionRun.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.productionRun.delete({ where: { id } });
  }
}
