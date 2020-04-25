import { Guid } from './shared/guid';

export class User extends Guid {
  IdPeople: string;
  UserName: string;
  Password: string;
}
