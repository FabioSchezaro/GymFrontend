import { Guid } from './shared/guid';
import { GuidService } from '../utils/services/guid.service';

export class User extends Guid {

  constructor(idPeople?: string) {
    super(GuidService.GetGuid());
    this.idPeople = idPeople;
  }

  idPeople: string;
  userName: string;
  password: string;
  confirmPassword: string;
  token: string;
}
