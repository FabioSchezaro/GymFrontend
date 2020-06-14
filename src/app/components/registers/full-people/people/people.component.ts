import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { People } from 'src/app/models/people';
import { Schema } from 'src/app/shared/schema/schema';
import { SchemaFormColumn } from 'src/app/shared/schema/schema-form-column';
import { SchemaForm } from 'src/app/shared/schema/schema-form';
import { ISchemaFormButton } from 'src/app/shared/schema/schema-form-button';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PropertyType } from 'src/app/utils/enums/property-type';
import { PeopleService } from 'src/app/services/people.service';
import { BaseComponent } from 'src/app/utils/components/base.component';
import { ObjectValue } from 'src/app/shared/models/object-value';
import { RoleService } from 'src/app/services/role.service';
import { Masks } from 'src/app/utils/masks/masks';
import { distinctUntilChanged, debounceTime, finalize } from 'rxjs/operators';
import { SchemaIcon } from 'src/app/shared/schema/schema-icon';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent extends BaseComponent implements OnInit {

  @Input() people: People;

  searchPeoples: People[] = [];

  nameColumn: Schema;
  emailColumn: Schema;
  cpfColumn: Schema;
  telephoneColumn: Schema;
  cellphoneColumn: Schema;
  roleColumn: Schema;

  searchIcon: SchemaIcon;

  columns: SchemaFormColumn[] = [];
  searchForm: SchemaForm;
  saveForm: SchemaForm;

  listButtons: Array<ISchemaFormButton> = new Array<ISchemaFormButton>();
  savePeopleButton: ISchemaFormButton;

  teste: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  cpfMask: any;
  telMask: any;
  celMask: any;

  peopleChanged: Subject<string> = new Subject<string>();

  @Output() emitRole: EventEmitter<string> = new EventEmitter<string>();
  @Output() emitIdPeople: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private peopleService: PeopleService,
    private alertService: ToastrService,
    private roleService: RoleService) {

    super();

    this.peopleChanged.pipe(debounceTime(500), distinctUntilChanged()).subscribe(model => {
      this.LoadPeoples(model);
    });
  }

  ngOnInit() {
    this.SetMasks();
    this.SetCommonSchemas();
    this.ConfigureSearchForm();
    this.setSchemaSystem();
    this.SetFocus();
  }

  SetMasks() {
    this.cpfMask = Masks.CpfMask();
    this.telMask = Masks.TelMask();
    this.celMask = Masks.CelMask();
  }

  SetCommonSchemas() {
    this.nameColumn = new Schema('Nome', 'name', PropertyType.InputMenu, [], { required: true });
    this.cpfColumn = new Schema('CPF', 'cpf', PropertyType.Mask, [], { required: true, mask: this.cpfMask });
    this.telephoneColumn = new Schema('Telefone fixo', 'telephone', PropertyType.Mask, [], { mask: this.telMask });
    this.cellphoneColumn = new Schema('Celular', 'cellphone', PropertyType.Mask, [], { required: true, mask: this.celMask });
    this.emailColumn = new Schema('Email', 'email', PropertyType.Text, [], { required: true });
    this.roleColumn = new Schema('Tipo', 'idRole', PropertyType.Select, [], { required: true });

    this.LoadRoles();
  }

  LoadPeoples(value: string) {
    this.nameColumn.Values = [];
    this.nameColumn.IsLoading = true;
    this.subscription.add(
      this.peopleService.GetActivePeopleByName(value)
        .pipe(finalize(() => {
          this.nameColumn.IsLoading = false;
          this.GetValueSelected();
        }),
    ).subscribe(data => {
      if (data) {
        data.forEach(x => this.nameColumn.Values.push(new ObjectValue(`${x.name}`, x.id)));
      } else {
        this.nameColumn.Values = [];
      }
    }));
  }

  GetValueSelected() {
    if (this.searchForm && this.searchForm.Rows && this.searchForm.Rows.length > 0) {
      const findName = this.searchForm.Rows[0].Columns.find(x => x.PropertyName === 'name');

      if (findName) {
        this.subscription.add(findName.OnValueSelected.subscribe(value => {
          if (value) {
            this.emitIdPeople.emit(value);
          } else {
            this.emitIdPeople.emit(null);
          }
        }));
      }
    }
  }

  GetPeopleId(value) {
    this.emitIdPeople.emit(value);
  }

  LoadRoles() {
    this.subscription.add(
      this.roleService.getAll().subscribe(result => {
        result.forEach(x => this.roleColumn.Values.push(new ObjectValue(`${x.description}`, x.id)));
      })
    );
  }

  setSchemaSystem() {
    if (this.searchForm && this.searchForm.Rows && this.searchForm.Rows.length > 0) {
      const findName = this.searchForm.Rows[0].Columns.find(x => x.PropertyName === 'name');
      const findRole = this.searchForm.Rows[1].Columns.find(x => x.PropertyName === 'idRole');

      if (findName) {
        this.subscription.add(findName.OnValueChange.subscribe(value => {
          if (value) {
            this.nameColumn.IsLoading = true;
            this.peopleChanged.next(value);
          } else {
            this.nameColumn.Values = [];
          }
        }));
      }

      if (findRole) {
        this.subscription.add(findRole.OnValueChange.subscribe(value => {
          if (value) {
            this.emitRole.emit(value);
          }
        }));
      }
    }
  }

  ConfigureSearchForm() {
    this.searchForm = {
      Rows : [
        {
          Columns: [
            this.nameColumn,
            this.cpfColumn,
            this.emailColumn,
          ]
        },
        {
          Columns: [
            this.telephoneColumn,
            this.cellphoneColumn,
            this.roleColumn,
          ]
        }
      ]
    };
  }

  SetFocus() {
    if (this.nameColumn.ElementRef) {
      this.nameColumn.ElementRef.nativeElement.focus();
    }
  }
}
