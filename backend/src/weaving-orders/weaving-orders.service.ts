import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWeavingOrderDto } from './dto/create-weaving-order.dto';
import { UpdateWeavingOrderDto } from './dto/update-weaving-order.dto';

@Injectable()
export class WeavingOrdersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.weavingOrder.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.weavingOrder.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Dokuma siparişi bulunamadı');
    return item;
  }

  create(dto: CreateWeavingOrderDto) {
    return this.prisma.weavingOrder.create({
      data: {

        orderCode: dto.orderCode,
        clientName: dto.clientName,
        patternId: dto.patternId,
        loomId: dto.loomId,
        widthCm: dto.widthCm,
        lengthCm: dto.lengthCm,
        status: dto.status || 'pending',
        deadline: new Date(dto.deadline),

      },
    });
  }

  async update(id: string, dto: UpdateWeavingOrderDto) {
    await this.findOne(id);
    return this.prisma.weavingOrder.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.weavingOrder.delete({ where: { id } });
  }
}
