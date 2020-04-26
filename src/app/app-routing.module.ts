import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './components/default/default.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './utils/authenticate/auth-guard';

const routes: Routes = [
  { path: '', component: DefaultComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }

  // {
  //   path: '',
  //   component: DefaultComponent,
  //   data: {
  //     title: 'Home',
  //     action: '',
  //     controller: ''
  //   },
  //   canActivate: [AuthGuard],
  //   // children: [
  //   //   {
  //   //     path: 'register',
  //   //     loadChildren: './registers/registers.module#RegistersModule'
  //   //   }
  //   // ]
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   data: {
  //     title: 'Login'
  //   }
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
