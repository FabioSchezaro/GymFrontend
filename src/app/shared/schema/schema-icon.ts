import { EventEmitter } from '@angular/core';

export class SchemaIcon {
  constructor(name: string, clickable: boolean = false) {
    this.Name = name;
    this.Clickable = clickable;
    this.OnClick = new EventEmitter<MouseEvent>();
  }

  Name: string;
  Clickable: boolean;
  OnClick: EventEmitter<MouseEvent>;
  ELementRef: any;
}
