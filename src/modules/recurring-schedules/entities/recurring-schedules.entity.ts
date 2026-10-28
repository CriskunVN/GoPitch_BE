import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity.js';
import { Company } from '../../companies/entities/company.entity.js';
import { Pitch } from '../../pitches/entities/pitch.entity.js';
import { TimeSlot } from '../../time-slots/entities/time-slot.entity.js';

@Entity('recurring_schedules')
export class RecurringSchedule extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  schedule_name: string;

  @Column({ type: 'varchar', length: 255 })
  schedule_description: string;

  @Column({ type: 'varchar', length: 50 })
  day_of_week: string;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @ManyToOne(() => Company, (Company) => Company.recurringSchedules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => TimeSlot, (TimeSlot) => TimeSlot.recurringSchedules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'time_slot_id' })
  timeSlot: TimeSlot;
}
