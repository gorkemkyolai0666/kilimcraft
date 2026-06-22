import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatternDto } from './dto/create-pattern.dto';
import { UpdatePatternDto } from './dto/update-pattern.dto';

@Injectable()
export class PatternsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.pattern.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.pattern.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Desen bulunamadı');
    return item;
  }

  create(dto: CreatePatternDto) {
    return this.prisma.pattern.create({
      data: {

        name: dto.name,
        region: dto.region,
        motifType: dto.motifType,
        colorPalette: dto.colorPalette,
        knotDensity: dto.knotDensity,
        widthCm: dto.widthCm,
        lengthCm: dto.lengthCm,

      },
    });
  }

  async update(id: string, dto: UpdatePatternDto) {
    await this.findOne(id);
    return this.prisma.pattern.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.pattern.delete({ where: { id } });
  }
}
