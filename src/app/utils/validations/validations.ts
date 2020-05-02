import { Validation } from 'src/app/models/shared/validation';
import { User } from 'src/app/models/user';
import { Plan } from 'src/app/models/plan';
import { GuidService } from '../services/guid.service';
import { Disease } from 'src/app/models/disease';
import { People } from 'src/app/models/people';

export class Validations {
  static LoginValidation(user: User): string {
    let validation = '';

    validation = GetUserNameErrorMessage(user);

    if (!validation) {
      validation = GetPasswordErrorMessage(user);
    }

    return validation;
  }

  static PlanValidation(plan: Plan): string {
    let validation = '';

    if (!plan.id) {
      plan.id = GuidService.GetGuid();
    }

    validation = GetPlanDescriptionErrorMessage(plan);

    if (!validation) {
      validation = GetPlanValueErrorMessage(plan);
    }

    return validation;
  }

  static DiseaseValidation(disease: Disease): string {
    let validation = '';

    if (!disease.id) {
      disease.id = GuidService.GetGuid();
    }

    validation = GetDiseaseDescriptionErrorMessage(disease);

    return validation;
  }

  static PeopleValidation(people: People): string {
    let validation = '';

    if (!people.id) {
      people.id = GuidService.GetGuid();
    }

    validation = GetPeopleNameErrorMessage(people);

    if (!validation) {
      validation = GetPeopleEmailErrorMessage(people);
    }

    if (!validation) {
      validation = GetPeopleCpfErrorMessage(people);
    }

    if (!validation) {
      validation = GetPeopleRoleErrorMessage(people);
    }

    return validation;
  }
}

export function GetUserNameErrorMessage(user: User) {
  return !user.userName ? 'Por favor, informe o login.' : '';
}

export function GetPasswordErrorMessage(user: User) {
  return !user.password ? 'Por favor, informe a senha.' : '';
}


export function GetPlanDescriptionErrorMessage(plan: Plan) {
  return !plan.description ? 'Por favor, informe a descrição do plano.' : '';
}

export function GetPlanValueErrorMessage(plan: Plan) {
  return !plan.value ? 'Por favor, informe o valor do plano.' : '';
}

export function GetDiseaseDescriptionErrorMessage(disease: Disease) {
  return !disease.description ? 'Por favor, informe a descrição do plano.' : '';
}

export function GetPeopleNameErrorMessage(people: People) {
  return !people.name ? 'Por favor, informe o nome da pessoa.' : '';
}

export function GetPeopleEmailErrorMessage(people: People) {
  return !people.name ? 'Por favor, informe o e-mail da pessoa.' : '';
}

export function GetPeopleCpfErrorMessage(people: People) {
  return !people.name ? 'Por favor, informe o CPF da pessoa.' : '';
}

export function GetPeopleRoleErrorMessage(people: People) {
  return !people.name ? 'Por favor, informe o tipo da pessoa.' : '';
}
