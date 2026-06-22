import { Module } from '@nestjs/common';
import { ProductionRunsController } from './production-runs.controller';
import { ProductionRunsService } from './production-runs.service';

@Module({
  controllers: [ProductionRunsController],
  providers: [ProductionRunsService],
})
export class ProductionRunsModule {}
