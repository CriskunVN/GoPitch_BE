import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity.js';
import { Pitch } from '../../pitches/entities/pitch.entity.js';
import { BookingItem } from '../../booking-items/entities/booking-item.entity.js';
import { RecurringSchedule } from '../../recurring-schedules/entities/recurring-schedules.entity.js';

@Entity('time_slots')
export class TimeSlot extends BaseEntity {
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  b2b_price: number;

  @Column({ type: 'time' })
  start_time: Date;

  @Column({ type: 'time' })
  end_time: Date;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @ManyToOne(() => Pitch, (pitch) => pitch.timeSlots, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pitch_id' })
  pitch: Pitch;

  @OneToMany(() => BookingItem, (bookingItem) => bookingItem.timeSlot, {
    cascade: true,
  })
  bookingItems: BookingItem[];

  @OneToMany(
    () => RecurringSchedule,
    (recurringSchedule) => recurringSchedule.timeSlot,
  )
  recurringSchedules: RecurringSchedule[];
}
