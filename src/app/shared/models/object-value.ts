export class ObjectValue {
  constructor(description: string, value: any) {
    this.Value = value;
    this.Description = description;
  }

  Value: any;
  Description: string;
}
