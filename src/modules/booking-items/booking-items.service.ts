import { Injectable } from '@nestjs/common';
import { CreateBookingItemDto } from './dto/create-booking-item.dto.js';
import { UpdateBookingItemDto } from './dto/update-booking-item.dto.js';

@Injectable()
export class BookingItemsService {
  create(createBookingItemDto: CreateBookingItemDto) {
    return 'This action adds a new bookingItem';
  }

  findAll() {
    return `This action returns all bookingItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookingItem`;
  }

  update(id: number, updateBookingItemDto: UpdateBookingItemDto) {
    return `This action updates a #${id} bookingItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookingItem`;
  }
}
