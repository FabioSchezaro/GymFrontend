import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/utils/authenticate/auth-guard';
import { NgModule } from '@angular/core';
import { PlansComponent } from './plans/plans.component';
import { DiseaseComponent } from './disease/disease.component';
import { FullPeopleComponent } from './full-people/full-people.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'register',
    },
    children: [
      {
        path: 'plans',
        component: PlansComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'cadastro',
        }
      },
      {
        path: 'disease',
        component: DiseaseComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'cadastro',
        }
      },
      {
        path: 'people',
        component: FullPeopleComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'cadastro',
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistersRoutingModule { }
