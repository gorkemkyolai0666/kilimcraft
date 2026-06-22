import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats() {
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const [
      workshops,
      weavers,
      looms,
      patterns,
      yarnBatches,
      orders,
      productionRuns,
      inspections,
      shipments,
    ] = await Promise.all([
      this.prisma.workshop.findMany(),
      this.prisma.weaver.findMany({ where: { status: 'active' } }),
      this.prisma.loom.findMany(),
      this.prisma.pattern.findMany(),
      this.prisma.yarnBatch.findMany(),
      this.prisma.weavingOrder.findMany({ orderBy: { deadline: 'asc' } }),
      this.prisma.productionRun.findMany({
        where: { runDate: { gte: monthStart } },
        orderBy: { runDate: 'desc' },
      }),
      this.prisma.qualityInspection.findMany({ orderBy: { inspectionDate: 'desc' }, take: 10 }),
      this.prisma.shipment.findMany({ orderBy: { shipDate: 'desc' }, take: 5 }),
    ]);

    const activeWorkshops = workshops.filter((w) => w.status === 'active').length;
    const masterWeavers = weavers.filter((w) => w.skillLevel === 'master').length;
    const activeLooms = looms.filter((l) => l.status === 'active').length;
    const loomsInMaintenance = looms.filter((l) => l.status === 'maintenance').length;
    const yarnStockKg = yarnBatches.reduce((sum, b) => sum + b.weightKg, 0);
    const pendingOrders = orders.filter((o) => o.status === 'pending').length;
    const inProgressOrders = orders.filter((o) => o.status === 'in_progress').length;
    const monthCmCompleted = productionRuns.reduce((sum, r) => sum + r.cmCompleted, 0);
    const avgQualityScore =
      inspections.length > 0
        ? inspections.reduce((sum, i) => sum + i.score, 0) / inspections.length
        : 0;
    const pendingShipments = shipments.filter((s) => s.status === 'pending').length;
    const failedInspections = inspections.filter((i) => i.result === 'fail' || i.result === 'review').length;

    return {
      totalWorkshops: workshops.length,
      activeWorkshops,
      totalWeavers: weavers.length,
      masterWeavers,
      totalLooms: looms.length,
      activeLooms,
      loomsInMaintenance,
      totalPatterns: patterns.length,
      yarnStockKg: Math.round(yarnStockKg * 10) / 10,
      pendingOrders,
      inProgressOrders,
      monthCmCompleted: Math.round(monthCmCompleted * 10) / 10,
      avgQualityScore: Math.round(avgQualityScore * 10) / 10,
      pendingShipments,
      failedInspections,
      recentProductionRuns: productionRuns.slice(0, 5),
      recentOrders: orders.slice(0, 5),
      recentInspections: inspections.slice(0, 5),
    };
  }
}
