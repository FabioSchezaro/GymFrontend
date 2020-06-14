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
import { PeopleComponent } from './full-people/people/people.component';
import { FullPeopleComponent } from './full-people/full-people.component';
import { AddressComponent } from './full-people/address/address.component';
import { PlanComponent } from './full-people/plan/plan.component';
import { PhisicalAvaliationComponent } from './full-people/phisical-avaliation/phisical-avaliation.component';
import { MetricsComponent } from './full-people/metrics/metrics.component';
import { UserComponent } from './full-people/user/user.component';
import { DiseasePeopleComponent } from './full-people/disease/disease-people.component';

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
    FullPeopleComponent,
    AddressComponent,
    PlanComponent,
    PhisicalAvaliationComponent,
    MetricsComponent,
    UserComponent,
    DiseasePeopleComponent,
  ],
  entryComponents: [
  ]
})
export class RegistersModule { }
