import { SchemaIcon } from '../schema-icon';

export class SchemaConfiguration {
  attributes: any;
  disabled = false;
  required = false;
  mask: string;
  messageValidation: string;
  additionalText: string;
  iconSufix: SchemaIcon;
  isLoading: boolean;
  showErrorMessage: boolean;
}
