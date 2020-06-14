import { Component, OnInit, Input, DoCheck, ViewChild } from '@angular/core';
import { PropertyType } from 'src/app/utils/enums/property-type';
import { isSchemaValid, getParentObjectAndPropertyName } from '../../schema/helper/schema-helper';
import { Schema } from '../../schema/schema';
import { SchemaIcon } from '../../schema/schema-icon';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit, DoCheck {

  @Input() schema: Schema;
  @Input() object: any;

  @ViewChild('elmRef', { static: false }) elmenteRef: any;

  //#region Properties

  element: any;
  propertyName: string;
  idSelected: any;

  TEXT_TYPE = PropertyType.Text;
  TEXT_TYPE_MASK = PropertyType.Mask;
  NONE_TYPE = PropertyType.None;
  NUMBER_TYPE = PropertyType.Number;
  DATE_TYPE = PropertyType.Date;
  CHECKBOX_TYPE = PropertyType.Checkbox;
  SELECT_TYPE = PropertyType.Select;
  MULTISELECT_TYPE = PropertyType.MultiSelect;
  INPUT_MENU = PropertyType.InputMenu;
  INPUT_PASSWORD = PropertyType.Password;

  //#endregion

  constructor() { }

  ngOnInit() {
  }

  ngDoCheck() {
    this.SetElementRef();
    this.setElement();
  }

  SetElementRef() {
    this.schema.ElementRef = this.elmenteRef;
  }

  GetOptionSelected(option) {
    this.idSelected = option.id;
    this.schema.OnValueSelected.emit(option.id);
  }

  setElement() {
    const result = getParentObjectAndPropertyName(this.schema, this.object);

    if (result.parent && result.parent !== this.element) {
      this.element = result.parent;
      this.propertyName = result.propertyName;
    }
  }

  get isValid(): boolean {
    return isSchemaValid(this.schema, this.object);
  }

  //#region Events

  onModelChange(value: any) {
    this.schema.OnValueChange.emit(value);
  }

  //#endregion
}
