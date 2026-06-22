import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';

@Injectable()
export class ShipmentsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.shipment.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.shipment.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Sevkiyat bulunamadı');
    return item;
  }

  create(dto: CreateShipmentDto) {
    return this.prisma.shipment.create({
      data: {

        trackingCode: dto.trackingCode,
        destination: dto.destination,
        weightKg: dto.weightKg,
        shipDate: new Date(dto.shipDate),
        orderId: dto.orderId,
        status: dto.status || 'pending',

      },
    });
  }

  async update(id: string, dto: UpdateShipmentDto) {
    await this.findOne(id);
    return this.prisma.shipment.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.shipment.delete({ where: { id } });
  }
}
