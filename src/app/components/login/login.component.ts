import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Validations } from 'src/app/utils/validations/validations';
import { Validation } from 'src/app/models/shared/validation';
import { Scheduler } from 'rxjs';
import { Schema } from 'src/app/shared/schema/schema';
import { PropertyType } from 'src/app/utils/enums/property-type';
import { SchemaFormColumn } from 'src/app/shared/schema/schema-form-column';
import { SchemaForm } from 'src/app/shared/schema/schema-form';
import { assingSchema } from 'src/app/shared/schema/helper/schema-helper';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ISchemaFormButton } from 'src/app/shared/schema/schema-form-button';
import { GuidService } from 'src/app/utils/services/guid.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User;

  userNameColumn: Schema;
  passwordColumn: Schema;

  columns: SchemaFormColumn[] = [];
  searchForm: SchemaForm;
  saveForm: SchemaForm;

  loginButton: ISchemaFormButton;
  listButtons: Array<ISchemaFormButton> = new Array<ISchemaFormButton>();

  constructor(private userService: UserService) { }

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
    this.userNameColumn = new Schema('Nome', 'UserName', PropertyType.Text, [], { required: true, messageValidation: 'Informe o login' });
    this.passwordColumn = new Schema('Senha', 'Password', PropertyType.Text, [], { required: true, messageValidation: 'Informe a senha.' });
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
      this.userService.Authenticate(this.user).subscribe(result => {
        console.log(result);
      }, error => {
        console.log(error.error.message);
      });
    }
  }
}
