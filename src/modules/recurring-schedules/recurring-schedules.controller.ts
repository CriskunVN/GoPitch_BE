import { Controller } from '@nestjs/common';
import { RecurringSchedulesService } from './recurring-schedules.service.js';

@Controller('recurring-schedules')
export class RecurringSchedulesController {
  constructor(private readonly recurringSchedulesService: RecurringSchedulesService) {}
}
