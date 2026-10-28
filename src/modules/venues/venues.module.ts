import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenuesController } from './venues.controller.js';
import { VenuesService } from './venues.service.js';
import { Venue, type Venue as VenueEntity } from './entities/venue.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Venue])],
  controllers: [VenuesController],
  providers: [VenuesService],
  exports: [TypeOrmModule],
})
export class VenuesModule {}
