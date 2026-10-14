import { Column, Entity, JoinColumn, OneToOne, type Relation } from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity.js';
import { BaseEntity } from '../../../common/entities/base.entity.js';

@Entity('invoices')
export class Invoice extends BaseEntity {
  @Column({ type: 'uuid' })
  booking_id: string;

  @Column({ type: 'varchar', length: 255 })
  e_invoice_no: string;

  @Column({ type: 'varchar', length: 255 })
  lookup_code: string;

  @Column({ type: 'varchar', length: 500 })
  pdf_url: string;

  @Column({ type: 'varchar', length: 500 })
  xml_url: string;

  @OneToOne(() => Booking, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'booking_id' })
  booking: Relation<Booking>;
}
