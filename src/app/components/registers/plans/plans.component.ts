import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/models/plan';
import { Schema } from 'src/app/shared/schema/schema';
import { PropertyType } from 'src/app/utils/enums/property-type';
import { SchemaFormColumn } from 'src/app/shared/schema/schema-form-column';
import { SchemaForm } from 'src/app/shared/schema/schema-form';
import { assingSchema } from 'src/app/shared/schema/helper/schema-helper';
import { ISchemaFormButton } from 'src/app/shared/schema/schema-form-button';
import { PlanService } from 'src/app/services/plan.service';
import { Validations } from 'src/app/utils/validations/validations';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/utils/components/base.component';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent extends BaseComponent implements OnInit {

  plan: Plan;
  searchPlans: Plan[] = [];

  descriptionColumn: Schema;
  valueColumn: Schema;

  columns: SchemaFormColumn[] = [];
  searchForm: SchemaForm;
  saveForm: SchemaForm;

  listButtons: Array<ISchemaFormButton> = new Array<ISchemaFormButton>();
  savePlanButton: ISchemaFormButton;

  constructor(private planService: PlanService, private alertService: ToastrService) {
    super();
    this.subscriptions = new Array<Subscription>();

    this.subscriptions.push(
      this.planService.saveSuccess$.subscribe(success => {
        this.alertService.success(success.message);
        this.LoadPlans();
        this.CleanFields();
        this.SetFocus();
      })
    );
    this.subscriptions.push(
      this.planService.saveError$.subscribe(error => {
        this.alertService.success(error.message);
      })
    );

    this.subscriptions.push(
      this.planService.updateSuccess$.subscribe(success => {
        this.alertService.success(success.message);
        this.LoadPlans();
        this.CleanFields();
        this.SetFocus();
      })
    );
    this.subscriptions.push(
      this.planService.updateError$.subscribe(error => {
        this.alertService.success(error.message);
      })
    );

    this.subscriptions.push(
      this.planService.deleteSuccess$.subscribe(success => {
        this.alertService.success(success.message);
        this.LoadPlans();
      })
    );
    this.subscriptions.push(
      this.planService.deleteError$.subscribe(error => {
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
    this.plan = new Plan();
  }

  SetCommonSchemas() {
    this.descriptionColumn = new Schema('Descrição', 'description', PropertyType.Text, [], { required: true });
    this.valueColumn = new Schema('Valor', 'value', PropertyType.Number, [], { required: true });
  }

  ConfigureColumns() {
    this.columns = [
      this.descriptionColumn,
      this.valueColumn
    ];
  }

  ConfigureSearchForm() {
    this.searchForm = {
      Rows : [
        {
          Columns: [
            this.descriptionColumn,
            this.valueColumn,
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
            assingSchema({Required: true}, this.valueColumn)
          ]
        }
      ]
    };
  }

  ConfigureButton() {
    this.savePlanButton = {
      Description: 'Salvar',
      Disabled: false,
      Color: 'primary',
      Type: 'submit',
      Click: () => {
        this.SavePlan();
      }
    };
    this.listButtons.push(this.savePlanButton);
  }

  SavePlan() {
    if (this.plan.id) {
      this.planService.update(this.plan);
    } else {
      const validation = Validations.PlanValidation(this.plan);
      if (!validation) {
        this.planService.register(this.plan);
      }
    }
  }

  LoadPlans() {
    this.planService.getAll().subscribe(result => {
      this.searchPlans = result;
    });
  }

  EditPlan(plan: Plan) {
    this.plan = plan;
    this.searchPlans = this.searchPlans.filter(x => x.id !== plan.id);
  }

  DeletePlan(plan: Plan) {
    this.planService.delete(plan);
  }

  GetAction(event: any) {
    if (event.type === 'edit') {
      this.EditPlan(event.element);
    } else {
      this.DeletePlan(event.element);
    }
  }

  CleanFields() {
    this.plan.description = '';
    this.plan.value = null;
    this.plan.id = '';
  }

  SetFocus() {
    this.descriptionColumn.ElementRef.nativeElement.focus();
  }
}
