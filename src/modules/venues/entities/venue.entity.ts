import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  type Relation,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity.js';
import { Pitch } from '../../pitches/entities/pitch.entity.js';
import { User } from '../../users/entities/user.entity.js';

@Entity('venues')
export class Venue extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 500 })
  address: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'varchar', length: 255 })
  legal_representative: string;

  @Column({ type: 'varchar', length: 20 })
  bank_account: string;

  // FK đến User (chủ sân - phải có role = VENUE_OWNER)
  @ManyToOne(() => User, (user) => user.venues, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'owner_id' })
  owner: Relation<User>;

  // Quan hệ với Pitches
  @OneToMany(() => Pitch, (pitch) => pitch.venue)
  pitches: Pitch[];
}
