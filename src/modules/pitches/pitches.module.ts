import { Module } from '@nestjs/common';
import { PitchesService } from './pitches.service.js';
import { PitchesController } from './pitches.controller.js';
import { Pitch } from './entities/pitch.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Pitch])],
  controllers: [PitchesController],
  providers: [PitchesService],
})
export class PitchesModule {}
