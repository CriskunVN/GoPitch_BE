import { Module } from '@nestjs/common';
import { BookingItemsService } from './booking-items.service.js';
import { BookingItemsController } from './booking-items.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingItem } from './entities/booking-item.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([BookingItem])],
  controllers: [BookingItemsController],
  providers: [BookingItemsService],
})
export class BookingItemsModule {}
