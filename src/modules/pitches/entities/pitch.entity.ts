import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  type Relation,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity.js';
import { Venue } from '../../venues/entities/venue.entity.js';
import { TimeSlot } from '../../time-slots/entities/time-slot.entity.js';
import { RecurringSchedule } from '../../recurring-schedules/entities/recurring-schedules.entity.js';
import { PitchStatus } from '../../../common/enum/pitchs.enum.js';

@Entity('pitches')
export class Pitch extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  pitch_name: string;

  @Column({ type: 'varchar', length: 255 })
  surface_type: string;

  @Column({ type: 'enum', enum: PitchStatus })
  status: PitchStatus;

  // Quan hệ với Venue (qua owner của venue)
  @ManyToOne(() => Venue, (venue) => venue.pitches, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'venue_id' })
  venue: Relation<Venue>;

  @OneToMany(() => TimeSlot, (timeSlot) => timeSlot.pitch)
  timeSlots: TimeSlot[];
}
