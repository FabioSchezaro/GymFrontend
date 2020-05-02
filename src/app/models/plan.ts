import { Guid } from './shared/guid';

export class Plan extends Guid {
  description: string;
  value: number;
}
