import { NgModule } from '@angular/core';
import { RegistersComponent } from './registers.component';
import { CommonModule } from '@angular/common';
import { RegistersRoutingModule } from './registers-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PlansComponent } from './plans/plans.component';
import { DiseaseComponent } from './disease/disease.component';
import { PeopleComponent } from './people/people.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AngularMaterialModule,
    RegistersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    RegistersComponent,
    PlansComponent,
    DiseaseComponent,
    PeopleComponent,
  ],
  entryComponents: [
  ]
})
export class RegistersModule { }
