import { Controller } from '@nestjs/common';
import { PitchesService } from './pitches.service.js';

@Controller('pitches')
export class PitchesController {
  constructor(private readonly pitchesService: PitchesService) {}
}
