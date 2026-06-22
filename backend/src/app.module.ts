import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { WorkshopsModule } from './workshops/workshops.module';
import { WeaversModule } from './weavers/weavers.module';
import { LoomsModule } from './looms/looms.module';
import { PatternsModule } from './patterns/patterns.module';
import { YarnBatchesModule } from './yarn-batches/yarn-batches.module';
import { WeavingOrdersModule } from './weaving-orders/weaving-orders.module';
import { ProductionRunsModule } from './production-runs/production-runs.module';
import { QualityInspectionsModule } from './quality-inspections/quality-inspections.module';
import { ClientsModule } from './clients/clients.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    HealthModule,
    DashboardModule,
    WorkshopsModule,
    WeaversModule,
    LoomsModule,
    PatternsModule,
    YarnBatchesModule,
    WeavingOrdersModule,
    ProductionRunsModule,
    QualityInspectionsModule,
    ClientsModule,
    ShipmentsModule,
  ],
})
export class AppModule {}
