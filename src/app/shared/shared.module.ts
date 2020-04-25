import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFormComponent } from './base-form/input-form/input-form.component';
import { AngularMaterialModule } from '../angular-material.module';
import { FormsModule } from '@angular/forms';
import { BaseFormComponent } from './base-form/base-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [InputFormComponent, BaseFormComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule
  ],
  exports: [BaseFormComponent]
})
export class SharedModule { }
