import { Component, OnInit } from '@angular/core';
import { Disease } from 'src/app/models/disease';
import { Schema } from 'src/app/shared/schema/schema';
import { SchemaFormColumn } from 'src/app/shared/schema/schema-form-column';
import { SchemaForm } from 'src/app/shared/schema/schema-form';
import { ISchemaFormButton } from 'src/app/shared/schema/schema-form-button';
import { Subscription } from 'rxjs';
import { DiseaseService } from 'src/app/services/disease.service';
import { ToastrService } from 'ngx-toastr';
import { PropertyType } from 'src/app/utils/enums/property-type';
import { assingSchema } from 'src/app/shared/schema/helper/schema-helper';
import { Validations } from 'src/app/utils/validations/validations';
import { BaseComponent } from 'src/app/utils/components/base.component';

@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.scss']
})
export class DiseaseComponent extends BaseComponent implements OnInit {

  disease: Disease;
  searchDiseases: Disease[] = [];

  descriptionColumn: Schema;

  columns: SchemaFormColumn[] = [];
  searchForm: SchemaForm;
  saveForm: SchemaForm;

  listButtons: Array<ISchemaFormButton> = new Array<ISchemaFormButton>();
  saveDiseaseButton: ISchemaFormButton;

  constructor(private diseaseService: DiseaseService, private alertService: ToastrService) {
    super();
    this.subscriptions = new Array<Subscription>();

    this.subscriptions.push(
      this.diseaseService.saveSuccess$.subscribe(success => {
        this.alertService.success(success.message);
        this.LoadPlans();
        this.CleanFields();
        this.SetFocus();
      })
    );
    this.subscriptions.push(
      this.diseaseService.saveError$.subscribe(error => {
        this.alertService.success(error.message);
      })
    );

    this.subscriptions.push(
      this.diseaseService.updateSuccess$.subscribe(success => {
        this.alertService.success(success.message);
        this.LoadPlans();
        this.CleanFields();
        this.SetFocus();
      })
    );
    this.subscriptions.push(
      this.diseaseService.updateError$.subscribe(error => {
        this.alertService.success(error.message);
      })
    );

    this.subscriptions.push(
      this.diseaseService.deleteSuccess$.subscribe(success => {
        this.alertService.success(success.message);
        this.LoadPlans();
      })
    );
    this.subscriptions.push(
      this.diseaseService.deleteError$.subscribe(error => {
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
    this.LoadPlans();
  }

  SetPlanClass() {
    this.disease = new Disease();
  }

  SetCommonSchemas() {
    this.descriptionColumn = new Schema('Descrição', 'description', PropertyType.Text, [], { required: true });
  }

  ConfigureColumns() {
    this.columns = [
      this.descriptionColumn,
    ];
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

  ConfigureSaveForm() {
    this.saveForm = {
      Rows : [
        {
          Columns: [
            assingSchema({Required: true}, this.descriptionColumn),
          ]
        }
      ]
    };
  }

  ConfigureButton() {
    this.saveDiseaseButton = {
      Description: 'Salvar',
      Disabled: false,
      Color: 'primary',
      Type: 'submit',
      Click: () => {
        this.SaveDisease();
      }
    };
    this.listButtons.push(this.saveDiseaseButton);
  }

  SaveDisease() {
    if (this.disease.id) {
      this.diseaseService.update(this.disease);
    } else {
      const validation = Validations.DiseaseValidation(this.disease);
      if (!validation) {
        this.diseaseService.register(this.disease);
      }
    }
  }

  LoadPlans() {
    this.diseaseService.getAll().subscribe(result => {
      this.searchDiseases = result;
    });
  }

  EditPlan(disease: Disease) {
    this.disease = disease;
    this.searchDiseases = this.searchDiseases.filter(x => x.id !== disease.id);
  }

  DeleteDisease(disease: Disease) {
    this.diseaseService.delete(disease);
  }

  GetAction(event: any) {
    if (event.type === 'edit') {
      this.EditPlan(event.element);
    } else {
      this.DeleteDisease(event.element);
    }
  }

  CleanFields() {
    this.disease.description = '';
    this.disease.id = '';
  }

  SetFocus() {
    this.descriptionColumn.ElementRef.nativeElement.focus();
  }
}
