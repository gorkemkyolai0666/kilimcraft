import { Module } from '@nestjs/common';
import { YarnBatchesController } from './yarn-batches.controller';
import { YarnBatchesService } from './yarn-batches.service';

@Module({
  controllers: [YarnBatchesController],
  providers: [YarnBatchesService],
})
export class YarnBatchesModule {}
