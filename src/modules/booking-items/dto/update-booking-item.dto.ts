import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingItemDto } from './create-booking-item.dto.js';

export class UpdateBookingItemDto extends PartialType(CreateBookingItemDto) {}
