import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateYarnBatchDto } from './dto/create-yarn-batch.dto';
import { UpdateYarnBatchDto } from './dto/update-yarn-batch.dto';

@Injectable()
export class YarnBatchesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.yarnBatch.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.yarnBatch.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('İplik partisi bulunamadı');
    return item;
  }

  create(dto: CreateYarnBatchDto) {
    return this.prisma.yarnBatch.create({
      data: {

        batchCode: dto.batchCode,
        fiberType: dto.fiberType,
        color: dto.color,
        weightKg: dto.weightKg,
        supplier: dto.supplier,
        unitCost: dto.unitCost,

      },
    });
  }

  async update(id: string, dto: UpdateYarnBatchDto) {
    await this.findOne(id);
    return this.prisma.yarnBatch.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.yarnBatch.delete({ where: { id } });
  }
}
