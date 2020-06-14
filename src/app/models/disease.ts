import { Guid } from './shared/guid';
import { GuidService } from '../utils/services/guid.service';

export class Disease extends Guid {
  description: string;
}
