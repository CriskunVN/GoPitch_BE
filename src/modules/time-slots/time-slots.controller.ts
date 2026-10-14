import { Controller } from '@nestjs/common';
import { TimeSlotsService } from './time-slots.service.js';

@Controller('time-slots')
export class TimeSlotsController {
  constructor(private readonly timeSlotsService: TimeSlotsService) {}
}
