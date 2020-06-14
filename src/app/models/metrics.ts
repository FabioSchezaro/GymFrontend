import { Guid } from './shared/guid';
import { GuidService } from '../utils/services/guid.service';

export class Metrics extends Guid {
  idPeople: string;
  biceps: number;
  breastplate: number;
  hip: number;
  abdomen: number;
  thighs: number;
  calf: number;
}
