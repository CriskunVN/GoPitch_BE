import { Column, Entity, JoinColumn, ManyToOne, type Relation } from 'typeorm';
import { BookingItemStatus } from '../../../common/enum/bookingItems.enum.js';
import { Booking } from '../../bookings/entities/booking.entity.js';
import { TimeSlot } from '../../time-slots/entities/time-slot.entity.js';
import { BaseEntity } from '../../../common/entities/base.entity.js';

@Entity('booking_items')
export class BookingItem extends BaseEntity {
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'date' })
  match_date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  b2b_price: number;

  @Column({ type: 'enum', enum: BookingItemStatus })
  status: BookingItemStatus;

  @Column({ type: 'varchar', length: 255 })
  check_in_code: string;

  @ManyToOne(() => Booking, (booking) => booking.bookingItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'booking_id' })
  booking: Relation<Booking>;

  @ManyToOne(() => TimeSlot, (timeSlot) => timeSlot.bookingItems, {
    onDelete: 'CASCADE',
  })
  timeSlot: TimeSlot;
}
