import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { Schema } from 'src/app/shared/schema/schema';
import { SchemaFormColumn } from 'src/app/shared/schema/schema-form-column';
import { SchemaForm } from 'src/app/shared/schema/schema-form';
import { PropertyType } from 'src/app/utils/enums/property-type';
import { assingSchema } from 'src/app/shared/schema/helper/schema-helper';
import { BaseComponent } from 'src/app/utils/components/base.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends BaseComponent implements OnInit {

  @Input() user: User;
  searchUser: User[] = [];

  userNameColumn: Schema;
  passwordColumn: Schema;
  confirmPasswordColumn: Schema;

  columns: SchemaFormColumn[] = [];
  searchForm: SchemaForm;
  saveForm: SchemaForm;

  constructor() {
    super();
  }

  ngOnInit() {
    this.SetCommonSchemas();
    this.ConfigureSearchForm();
    this.setSchemaSystem();
  }

  SetCommonSchemas() {
    this.userNameColumn = new Schema('Login', 'userName', PropertyType.Text, [], { required: true });
    this.passwordColumn = new Schema('Senha', 'password', PropertyType.Password, [], { required: true });
    this.confirmPasswordColumn = new Schema('Confirmar senha', 'confirmPassword', PropertyType.Password, [], { required: true });
  }

  ConfigureSearchForm() {
    this.searchForm = {
      Rows : [
        {
          Columns: [
            this.userNameColumn,
            this.passwordColumn,
            this.confirmPasswordColumn
          ]
        }
      ]
    };
  }

  setSchemaSystem() {
    if (this.searchForm && this.searchForm.Rows && this.searchForm.Rows.length > 0) {
      const findConfirmPassword = this.searchForm.Rows[0].Columns.find(x => x.PropertyName === 'confirmPassword');

      if (findConfirmPassword) {
        this.subscription.add(findConfirmPassword.OnValueChange.subscribe(value => {
          if (value !== this.user.password) {
            this.confirmPasswordColumn.ShowErrorMessage = true;
            this.confirmPasswordColumn.MessageValidation = 'As senhas precisam estar iguais.';
          } else {
            this.confirmPasswordColumn.ShowErrorMessage = false;
            this.confirmPasswordColumn.MessageValidation = '';
          }
        }));
      }
    }
  }
}
