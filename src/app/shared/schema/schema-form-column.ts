import { ObjectValue } from '../models/object-value';

export class SchemaFormColumn {
  constructor(description: string, propertyName: string, values: ObjectValue[] = []) {
    this.Description = description;
    this.PropertyName = propertyName;
    this.Values = values;
  }

  Description: string;
  PropertyName: string;
  Values?: ObjectValue[];
}
