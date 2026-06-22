import { Module } from '@nestjs/common';
import { LoomsController } from './looms.controller';
import { LoomsService } from './looms.service';

@Module({
  controllers: [LoomsController],
  providers: [LoomsService],
})
export class LoomsModule {}
