import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingItemsService } from './booking-items.service.js';
import { CreateBookingItemDto } from './dto/create-booking-item.dto.js';
import { UpdateBookingItemDto } from './dto/update-booking-item.dto.js';

@Controller('booking-items')
export class BookingItemsController {
  constructor(private readonly bookingItemsService: BookingItemsService) {}

  @Post()
  create(@Body() createBookingItemDto: CreateBookingItemDto) {
    return this.bookingItemsService.create(createBookingItemDto);
  }

  @Get()
  findAll() {
    return this.bookingItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingItemDto: UpdateBookingItemDto) {
    return this.bookingItemsService.update(+id, updateBookingItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingItemsService.remove(+id);
  }
}
