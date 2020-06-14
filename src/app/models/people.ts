import { Guid } from './shared/guid';
import { GuidService } from '../utils/services/guid.service';

export class People extends Guid {

  constructor() {
    super(GuidService.GetGuid());
  }
  name: string;
  email: string;
  cpf: string;
  telephone: string;
  cellphone: string;
  idRole: string;
  active = 1;
}
