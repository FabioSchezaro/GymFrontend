import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './components/default/default.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {
    path: 'home',
    component: DefaultComponent,
    data: {
      title: 'Home',
      action: '',
      controller: ''
    }
    // ,
    // canActivate: [AuthGuard],
    // children: [
    //   {
    //     path: 'register',
    //     loadChildren: './registers/registers.module#RegistersModule'
    //   }
    // ]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
