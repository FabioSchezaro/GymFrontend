import { Guid } from './shared/guid';

export class User extends Guid {
  idPeople: string;
  userName: string;
  password: string;
  token: string;
}
