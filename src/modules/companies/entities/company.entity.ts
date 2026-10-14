import { Entity, Column, OneToMany, OneToOne, type Relation } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity.js';
import { RecurringSchedule } from '../../recurring-schedules/entities/recurring-schedules.entity.js';
import { Booking } from '../../bookings/entities/booking.entity.js';
import { User } from '../../users/entities/user.entity.js';

@Entity('companies')
export class Company extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  invoice_email: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  address: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToOne(() => User, (user) => user.company)
  representative: Relation<User>;

  @OneToMany(() => Booking, (booking) => booking.company)
  bookings: Booking[];

  @OneToMany(
    () => RecurringSchedule,
    (recurringSchedule) => recurringSchedule.company,
  )
  recurringSchedules: RecurringSchedule[];
}
