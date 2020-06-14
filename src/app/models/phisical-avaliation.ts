import { Guid } from './shared/guid';
import { GuidService } from '../utils/services/guid.service';

export class PhisicalAvaliation extends Guid {
  idPeople: string;
  weight: number;
  reight: number;
  fatPercent: number;
}
