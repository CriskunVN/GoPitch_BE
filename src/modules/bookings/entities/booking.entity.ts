import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  type Relation,
} from 'typeorm';
import {
  BookingStatus,
  BookingType,
} from '../../../common/enum/booking.enum.js';
import { Company } from '../../companies/entities/company.entity.js';
import { BaseEntity } from '../../../common/entities/base.entity.js';
import { Invoice } from '../../invoices/entities/invoice.entity.js';
import { BookingItem } from '../../booking-items/entities/booking-item.entity.js';
import { Venue } from '../../venues/entities/venue.entity.js';

@Entity('bookings')
export class Booking extends BaseEntity {
  @Column({ type: 'enum', enum: BookingType })
  booking_type: BookingType;

  @Column({ type: 'enum', enum: BookingStatus })
  status: BookingStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_amount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  vat_amount: number;

  @ManyToOne(() => Company, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: Relation<Company>;

  @ManyToOne(() => Venue, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'venue_id' })
  venue: Relation<Venue>;

  @OneToMany(() => BookingItem, (bookingItem) => bookingItem.booking, {
    cascade: true,
  })
  bookingItems: Relation<BookingItem[]>;

  @OneToOne(() => Invoice, (invoice) => invoice.booking)
  invoice: Relation<Invoice>;
}
