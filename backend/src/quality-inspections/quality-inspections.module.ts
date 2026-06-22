import { Module } from '@nestjs/common';
import { QualityInspectionsController } from './quality-inspections.controller';
import { QualityInspectionsService } from './quality-inspections.service';

@Module({
  controllers: [QualityInspectionsController],
  providers: [QualityInspectionsService],
})
export class QualityInspectionsModule {}
