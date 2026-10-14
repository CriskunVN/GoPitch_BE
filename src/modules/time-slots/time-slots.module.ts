import { Module } from '@nestjs/common';
import { TimeSlotsService } from './time-slots.service.js';
import { TimeSlotsController } from './time-slots.controller.js';
import { TimeSlot } from './entities/time-slot.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TimeSlot])],
  controllers: [TimeSlotsController],
  providers: [TimeSlotsService],
})
export class TimeSlotsModule {}
