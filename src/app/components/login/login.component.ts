import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Validations } from 'src/app/utils/validations/validations';
import { Validation } from 'src/app/models/shared/validation';
import { Scheduler } from 'rxjs';
import { Schema } from 'src/app/shared/schema/schema';
import { PropertyType } from 'src/app/utils/enums/property-type';
import { SchemaFormColumn } from 'src/app/shared/schema/schema-form-column';
import { SchemaForm } from 'src/app/shared/schema/schema-form';
import { assingSchema } from 'src/app/shared/schema/helper/schema-helper';
import { ISchemaFormButton } from 'src/app/shared/schema/schema-form-button';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User;
  pass = 'password';
  icon = 'visibility';
  visible = false;

  userName: string;
  password: string;
  validation: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private alertService: ToastrService
  ) {
    if (this.authenticationService.currentTokenValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.setUserClass();
  }

  visibility(v: boolean) {
    if (v) {
      this.pass = 'text';
      this.icon = 'visibility_off';
    } else {
      this.pass = 'password';
      this.icon = 'visibility';
    }
    this.visible = v;
  }

  setUserClass() {
    this.user = new User();
  }

  Login() {
    this.validation = Validations.LoginValidation(this.user);
    if (!this.validation) {
      this.authenticationService.login(this.user).pipe(first()).subscribe(data => {
        this.router.navigate(['']);
      },
      error => {
        this.alertService.error(error);
      });
    }
  }
}
