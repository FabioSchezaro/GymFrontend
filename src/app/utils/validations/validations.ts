import { Validation } from 'src/app/models/shared/validation';
import { User } from 'src/app/models/user';

export class Validations {
  static LoginValidation(user: User): string {
    let validation = '';

    validation = GetUserNameErrorMessage(user);

    if (!validation) {
      validation = GetPasswordErrorMessage(user);
    }

    return validation;
  }
}

export function GetUserNameErrorMessage(user: User) {
  return !user.UserName ? 'Por favor, informe o login.' : '';
}

export function GetPasswordErrorMessage(user: User) {
  return !user.Password ? 'Por favor, informe a senha.' : '';
}
