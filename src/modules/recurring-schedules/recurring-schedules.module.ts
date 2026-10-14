import { Module } from '@nestjs/common';
import { RecurringSchedulesService } from './recurring-schedules.service.js';
import { RecurringSchedulesController } from './recurring-schedules.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecurringSchedule } from './entities/recurring-schedules.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([RecurringSchedule])],
  controllers: [RecurringSchedulesController],
  providers: [RecurringSchedulesService],
})
export class RecurringSchedulesModule {}
