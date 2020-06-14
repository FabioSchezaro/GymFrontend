import { Guid } from './shared/guid';
import { GuidService } from '../utils/services/guid.service';
import { DueDay } from './due-day';

export class Plan extends Guid {

  constructor() {
    super(GuidService.GetGuid());
  }

  description: string;
  value: number;
  dueDay: DueDay = new DueDay();
}
