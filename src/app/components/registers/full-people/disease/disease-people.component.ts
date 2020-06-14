import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Disease } from 'src/app/models/disease';
import { Schema } from 'src/app/shared/schema/schema';
import { SchemaFormColumn } from 'src/app/shared/schema/schema-form-column';
import { SchemaForm } from 'src/app/shared/schema/schema-form';
import { PropertyType } from 'src/app/utils/enums/property-type';
import { assingSchema } from 'src/app/shared/schema/helper/schema-helper';
import { BaseComponent } from 'src/app/utils/components/base.component';
import { DiseaseService } from 'src/app/services/disease.service';
import { ISchemaFormButton } from 'src/app/shared/schema/schema-form-button';
import { ObjectValue } from 'src/app/shared/models/object-value';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-disease-people',
  templateUrl: './disease-people.component.html',
  styleUrls: ['./disease-people.component.scss']
})
export class DiseasePeopleComponent extends BaseComponent implements OnInit {

  @Input() peopleDisease: Array<Disease>;

  disease: Disease;
  diseaseId: string;

  descriptionColumn: Schema;

  columns: SchemaFormColumn[] = [];
  searchForm: SchemaForm;
  saveForm: SchemaForm;

  listButtons: Array<ISchemaFormButton> = new Array<ISchemaFormButton>();
  insertDiseaseButton: ISchemaFormButton;

  @Output() diseaseOut: EventEmitter<Array<Disease>> = new EventEmitter<Array<Disease>>();

  constructor(private diseaseService: DiseaseService, private alert: ToastrService) {
    super();
  }

  ngOnInit() {
    this.SetDiseaseClass();
    this.SetCommonSchemas();
    this.ConfigureColumns();
    this.ConfigureSearchForm();
    this.ConfigureButton();
    this.setSchemaSystem();
  }

  SetDiseaseClass() {
    this.disease = new Disease();
  }

  ConfigureColumns() {
    this.columns = [
      this.descriptionColumn,
    ];
  }

  SetCommonSchemas() {
    this.descriptionColumn = new Schema('Doenças', 'description', PropertyType.Select, [], { required: true });

    this.LoadDisease();
  }

  LoadDisease() {
    this.subscription.add(
      this.diseaseService.getAll().subscribe(result => {
        result.forEach(x => this.descriptionColumn.Values.push(new ObjectValue(`${x.description}`, x.id)));
      })
    );
  }

  setSchemaSystem() {
    if (this.searchForm && this.searchForm.Rows && this.searchForm.Rows.length > 0) {
      const findDisease = this.searchForm.Rows[0].Columns.find(x => x.PropertyName === 'description');

      if (findDisease) {
        this.subscription.add(findDisease.OnValueChange.subscribe(value => {
          this.diseaseId = value;
        }));
      }
    }
  }

  ConfigureSearchForm() {
    this.searchForm = {
      Rows : [
        {
          Columns: [
            this.descriptionColumn,
          ]
        }
      ]
    };
  }

  ConfigureButton() {
    this.insertDiseaseButton = {
      Description: 'Inserir',
      Disabled: false,
      Color: 'primary',
      Type: 'button',
      Click: () => {
        this.InsertDisease();
      }
    };
    this.listButtons.push(this.insertDiseaseButton);
  }

  InsertDisease() {
    if (this.diseaseId) {
      if (!this.peopleDisease.find(x => x.id === this.diseaseId)) {
        this.diseaseService.getById(this.diseaseId).subscribe(result => {
          this.peopleDisease.push(result);
          this.peopleDisease = [...this.peopleDisease];
          this.diseaseOut.emit(this.peopleDisease);
        });
      } else {
        this.alert.info('Doença já inserida');
      }
    }
  }

  GetAction(event: any) {
    if (event.type === 'delete') {
      this.RemoveDisease(event.element);
    }
  }

  RemoveDisease(d: Disease) {
    const filtered = this.peopleDisease.filter(x => x.id !== d.id);
    this.peopleDisease = [...filtered];
    this.diseaseOut.emit(this.peopleDisease);
  }
}
