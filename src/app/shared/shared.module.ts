import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFormComponent } from './base-form/input-form/input-form.component';
import { AngularMaterialModule } from '../angular-material.module';
import { FormsModule } from '@angular/forms';
import { BaseFormComponent } from './base-form/base-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BaseGridFormComponent } from './base-grid-form/base-grid-form.component';

@NgModule({
  declarations: [
    InputFormComponent,
    BaseFormComponent,
    BaseGridFormComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
  ],
  exports: [
    BaseFormComponent,
    BaseGridFormComponent
  ]
})
export class SharedModule { }
