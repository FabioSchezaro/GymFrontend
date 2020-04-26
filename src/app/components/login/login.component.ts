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

  loading = false;

  user: User;

  userNameColumn: Schema;
  passwordColumn: Schema;

  columns: SchemaFormColumn[] = [];
  searchForm: SchemaForm;
  saveForm: SchemaForm;

  loginButton: ISchemaFormButton;
  listButtons: Array<ISchemaFormButton> = new Array<ISchemaFormButton>();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private alertService: ToastrService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.configureButton();
    this.setUserClass();
    this.setCommonSchemas();
    this.configureColumns();
    this.configureSearchForm();
    this.configureSaveForm();
  }

  configureButton() {
    this.loginButton = {
      Description: 'Login',
      Disabled: false,
      Color: 'primary',
      Click: () => {
        this.Login();
      }
    };
    this.listButtons.push(this.loginButton);
  }

  setUserClass() {
    this.user = new User();
  }

  setCommonSchemas() {
    this.userNameColumn = new Schema('Nome', 'userName', PropertyType.Text, [], { required: true, messageValidation: 'Informe o login' });
    this.passwordColumn = new Schema(
      'Senha', 'password', PropertyType.Password, [], { required: true, messageValidation: 'Informe a senha.' }
    );
  }

  configureColumns() {
    this.columns = [
      new SchemaFormColumn('Código', 'Id'),
      this.userNameColumn,
      this.passwordColumn
    ];
  }
  configureSearchForm() {
    this.searchForm = {
      Rows : [
        {
          Columns: [
            this.userNameColumn
          ]
        },
        {
          Columns: [
            this.passwordColumn
          ]
        }
      ],
    };
  }

  configureSaveForm() {

    this.saveForm = {
      Rows : [
        {
          Columns: [
            assingSchema({Required: true}, this.userNameColumn)
          ]
        },
        {
          Columns: [
            assingSchema({Required: true}, this.passwordColumn)
          ]
        }
      ]
    };
  }

  Login() {
    const validation = Validations.LoginValidation(this.user);
    if (!validation) {
      this.authenticationService.login(this.user).pipe(first()).subscribe(data => {
        this.router.navigate(['']);
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
    }
  }
}
