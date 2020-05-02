import { Component, OnInit } from '@angular/core';
import { People } from 'src/app/models/people';
import { Schema } from 'src/app/shared/schema/schema';
import { SchemaFormColumn } from 'src/app/shared/schema/schema-form-column';
import { SchemaForm } from 'src/app/shared/schema/schema-form';
import { ISchemaFormButton } from 'src/app/shared/schema/schema-form-button';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PropertyType } from 'src/app/utils/enums/property-type';
import { assingSchema } from 'src/app/shared/schema/helper/schema-helper';
import { Validations } from 'src/app/utils/validations/validations';
import { PeopleService } from 'src/app/services/people.service';
import { BaseComponent } from 'src/app/utils/components/base.component';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent extends BaseComponent implements OnInit {

  people: People;
  searchPeoples: People[] = [];

  nameColumn: Schema;
  emailColumn: Schema;
  cpfColumn: Schema;
  roleColumn: Schema;

  columns: SchemaFormColumn[] = [];
  searchForm: SchemaForm;
  saveForm: SchemaForm;

  listButtons: Array<ISchemaFormButton> = new Array<ISchemaFormButton>();
  savePeopleButton: ISchemaFormButton;

  constructor(private peopleService: PeopleService, private alertService: ToastrService) {

    super();

    this.subscriptions = new Array<Subscription>();

    this.subscriptions.push(
      this.peopleService.saveSuccess$.subscribe(success => {
        this.alertService.success(success.message);
        this.LoadPeoples();
        this.CleanFields();
        this.SetFocus();
      })
    );
    this.subscriptions.push(
      this.peopleService.saveError$.subscribe(error => {
        this.alertService.success(error.message);
      })
    );

    this.subscriptions.push(
      this.peopleService.updateSuccess$.subscribe(success => {
        this.alertService.success(success.message);
        this.LoadPeoples();
        this.CleanFields();
        this.SetFocus();
      })
    );
    this.subscriptions.push(
      this.peopleService.updateError$.subscribe(error => {
        this.alertService.success(error.message);
      })
    );

    this.subscriptions.push(
      this.peopleService.deleteSuccess$.subscribe(success => {
        this.alertService.success(success.message);
        this.LoadPeoples();
      })
    );
    this.subscriptions.push(
      this.peopleService.deleteError$.subscribe(error => {
        this.alertService.success(error.message);
      })
    );
  }

  ngOnInit() {
    this.SetPlanClass();
    this.SetCommonSchemas();
    this.ConfigureColumns();
    this.ConfigureSearchForm();
    this.ConfigureSaveForm();
    this.ConfigureButton();
    this.LoadPeoples();
  }

  SetPlanClass() {
    this.people = new People();
  }

  SetCommonSchemas() {
    this.nameColumn = new Schema('Nome', 'name', PropertyType.Text, [], { required: true });
    this.emailColumn = new Schema('Email', 'email', PropertyType.Text, [], { required: true });
    this.cpfColumn = new Schema('CPF', 'cpf', PropertyType.Text, [], { required: true });
    this.roleColumn = new Schema('Tipo', 'role', PropertyType.Select, [], { required: true });

    // this.LoadRoles();
  }

  LoadRoles() {
    // this.subscription.add(
    //   this.providerService.getAll().subscribe(result => {
    //     result.forEach(x => this.providerColumn.Values.push(new ObjectValue(`${x.Name} (${x.ProviderTypeName})`, x.Id)));
    //   })
    // );
  }

  ConfigureColumns() {
    this.columns = [
      this.nameColumn,
      this.emailColumn,
      this.cpfColumn,
      this.roleColumn
    ];
  }

  ConfigureSearchForm() {
    this.searchForm = {
      Rows : [
        {
          Columns: [
            this.nameColumn,
            this.emailColumn,
          ]
        },
        {
          Columns: [
            this.cpfColumn,
            this.roleColumn,
          ]
        }
      ]
    };
  }

  ConfigureSaveForm() {
    this.saveForm = {
      Rows : [
        {
          Columns: [
            assingSchema({Required: true}, this.nameColumn),
            assingSchema({Required: true}, this.emailColumn)
          ]
        },
        {
          Columns: [
            assingSchema({Required: true}, this.cpfColumn),
            assingSchema({Required: true}, this.roleColumn)
          ]
        }
      ]
    };
  }

  ConfigureButton() {
    this.savePeopleButton = {
      Description: 'Salvar',
      Disabled: false,
      Color: 'primary',
      Type: 'submit',
      Click: () => {
        this.SavePeople();
      }
    };
    this.listButtons.push(this.savePeopleButton);
  }

  SavePeople() {
    if (this.people.id) {
      this.peopleService.update(this.people);
    } else {
      const validation = Validations.PeopleValidation(this.people);
      if (!validation) {
        this.peopleService.register(this.people);
      }
    }
  }

  LoadPeoples() {
    this.peopleService.getAll().subscribe(result => {
      this.searchPeoples = result;
    });
  }

  EditPeople(people: People) {
    this.people = people;
    this.searchPeoples = this.searchPeoples.filter(x => x.id !== people.id);
  }

  DeletePeople(people: People) {
    this.peopleService.delete(people);
  }

  GetAction(event: any) {
    if (event.type === 'edit') {
      this.EditPeople(event.element);
    } else {
      this.DeletePeople(event.element);
    }
  }

  CleanFields() {
    this.people.id = '';
    this.people.name = '';
    this.people.email = '';
    this.people.cpf = '';
    this.people.idRole = '';
  }

  SetFocus() {
    this.nameColumn.ElementRef.nativeElement.focus();
  }
}
