import { Guid } from './shared/guid';

export class People extends Guid {
  name: string;
  email: string;
  cpf: string;
  idRole: string;
  active: string;
}
