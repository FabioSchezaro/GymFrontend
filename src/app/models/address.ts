import { Guid } from './shared/guid';
import { GuidService } from '../utils/services/guid.service';

export class Address extends Guid {
  idPeople: string;
  cep: string;
  neighBorhood: string;
  street: string;
  number: number;
  complement?: string;
}
