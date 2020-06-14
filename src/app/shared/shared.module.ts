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
import { IconFormComponent } from './base-form/icon-form/icon-form.component';
import { TextMaskModule } from 'angular2-text-mask';
import { YesNoDialogComponent } from './dialog/yes-no-dialog/yes-no-dialog.component';

@NgModule({
  declarations: [
    InputFormComponent,
    BaseFormComponent,
    BaseGridFormComponent,
    IconFormComponent,
    YesNoDialogComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    TextMaskModule
  ],
  exports: [
    BaseFormComponent,
    BaseGridFormComponent,
    YesNoDialogComponent
  ]
})
export class SharedModule { }
