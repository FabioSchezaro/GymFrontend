import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default/default.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { AngularMaterialModule } from '../angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { SidenavComponent } from './default/sidenav/sidenav.component';
import { ToolbarComponent } from './default/sidenav/toolbar/toolbar.component';
import { UserComponent } from './default/sidenav/toolbar/user/user.component';
import { LogoutComponent } from './default/sidenav/toolbar/logout/logout.component';
import { MenuComponent } from './default/sidenav/menu/menu.component';
import { RegistersModule } from './registers/registers.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DefaultComponent,
    LoginComponent,
    ToolbarComponent,
    UserComponent,
    LogoutComponent,
    SidenavComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AngularMaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    RegistersModule,
    RouterModule,
    SharedModule
  ]
})
export class ComponentsModule { }
