import { Module } from '@nestjs/common';
import { WeavingOrdersController } from './weaving-orders.controller';
import { WeavingOrdersService } from './weaving-orders.service';

@Module({
  controllers: [WeavingOrdersController],
  providers: [WeavingOrdersService],
})
export class WeavingOrdersModule {}
