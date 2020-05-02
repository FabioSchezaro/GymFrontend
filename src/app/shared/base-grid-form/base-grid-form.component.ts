import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SchemaFormColumn } from '../schema/schema-form-column';
import { getParentObjectAndPropertyName } from '../schema/helper/schema-helper';

@Component({
  selector: 'app-base-grid-form',
  templateUrl: './base-grid-form.component.html',
  styleUrls: ['./base-grid-form.component.scss']
})
export class BaseGridFormComponent implements OnInit {

  @Input() object: any[];
  @Input() columns: SchemaFormColumn[];
  @Input() title: string;

  @Output() action: EventEmitter<any> = new EventEmitter<any>();

  displayedColumns: string[] = [];

  actions = 'actions';

  constructor() { }

  ngOnInit() {
    this.columns.forEach(column => {
      this.displayedColumns.push(column.PropertyName);
    });

    this.displayedColumns.push(this.actions);
  }

  getColumnInfo(column: SchemaFormColumn, element: any): string {
    const result = getParentObjectAndPropertyName(column, element);
    let value = result.parent[result.propertyName];

    if (column.Values && column.Values.length > 0) {
      const values = column.Values.filter(x => x.Description !== '' && x.Value !== '');
      const find = values.find(x => x.Value === value);

      if (find) {
        value = find.Description;
      }
    }
    return value;
  }

  returnValue(element: any, type: string) {
    const obj = {
      element,
      type
    };

    this.action.emit(obj);
  }
}
