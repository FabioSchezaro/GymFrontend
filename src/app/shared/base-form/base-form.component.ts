import { Component, OnInit, Input } from '@angular/core';
import { SchemaForm } from '../schema/schema-form';
import { InputFormComponent } from './input-form/input-form.component';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ISchemaFormButton } from '../schema/schema-form-button';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss']
})
export class BaseFormComponent implements OnInit {

  @Input() title: string;
  @Input() titleIsImage: boolean;
  @Input() schemaForm: SchemaForm;
  @Input() object: any;
  @Input() wrapperContent = true;

  constructor() { }

  ngOnInit() {
  }

}
