import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './components/default/default.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './utils/authenticate/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    data: {
      title: 'Home',
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'register',
        loadChildren: './components/registers/registers.module#RegistersModule'
      },
    ]

  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login',
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
