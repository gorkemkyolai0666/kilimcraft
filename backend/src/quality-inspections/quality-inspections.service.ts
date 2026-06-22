import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQualityInspectionDto } from './dto/create-quality-inspection.dto';
import { UpdateQualityInspectionDto } from './dto/update-quality-inspection.dto';

@Injectable()
export class QualityInspectionsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.qualityInspection.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.qualityInspection.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Kalite kontrol kaydı bulunamadı');
    return item;
  }

  create(dto: CreateQualityInspectionDto) {
    return this.prisma.qualityInspection.create({
      data: {

        inspectionDate: new Date(dto.inspectionDate),
        score: dto.score,
        defectCount: dto.defectCount,
        notes: dto.notes || '',
        orderId: dto.orderId,
        result: dto.result,

      },
    });
  }

  async update(id: string, dto: UpdateQualityInspectionDto) {
    await this.findOne(id);
    return this.prisma.qualityInspection.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.qualityInspection.delete({ where: { id } });
  }
}
