import { Component, OnInit, Input } from '@angular/core';
import { Plan } from 'src/app/models/plan';
import { Schema } from 'src/app/shared/schema/schema';
import { SchemaFormColumn } from 'src/app/shared/schema/schema-form-column';
import { SchemaForm } from 'src/app/shared/schema/schema-form';
import { PropertyType } from 'src/app/utils/enums/property-type';
import { assingSchema } from 'src/app/shared/schema/helper/schema-helper';
import { BaseComponent } from 'src/app/utils/components/base.component';
import { PlanService } from 'src/app/services/plan.service';
import { ObjectValue } from 'src/app/shared/models/object-value';
import { Client } from 'src/app/models/client';
import { DueDayService } from 'src/app/services/due-day.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent extends BaseComponent implements OnInit {

  @Input() client: Client;

  searchPlan: Plan[] = [];

  descriptionColumn: Schema;
  valueColumn: Schema;
  dueDayColumn: Schema;

  columns: SchemaFormColumn[] = [];
  searchForm: SchemaForm;
  saveForm: SchemaForm;

  constructor(
    private planService: PlanService,
    private dueDayService: DueDayService) {
    super();
  }

  ngOnInit() {
    this.SetCommonSchemas();
    this.ConfigureSearchForm();
    this.setSchemaSystem();
  }

  SetCommonSchemas() {
    this.descriptionColumn = new Schema('Plano', 'idPlan', PropertyType.Select, [], { required: true });
    this.valueColumn = new Schema('Valor R$', 'value', PropertyType.Number, [], { disabled: true });
    this.dueDayColumn = new Schema('Dia de vencimento', 'idDueDay', PropertyType.Select);

    this.LoadPlans();
    this.LoadDueDay();
  }

  LoadPlans() {
    this.subscription.add(
      this.planService.getAll().subscribe(result => {
        result.forEach(x => this.descriptionColumn.Values.push(new ObjectValue(`${x.description}`, x.id)));
        result.forEach(x => this.valueColumn.Values.push(new ObjectValue(`${x.value}`, x.id)));
      })
    );
  }

  LoadDueDay() {
    this.subscription.add(
      this.dueDayService.getAll().subscribe(result => {
        result.forEach(x => this.dueDayColumn.Values.push(new ObjectValue(`${x.day}`, x.id)));
      })
    );
  }

  setSchemaSystem() {
    if (this.searchForm && this.searchForm.Rows && this.searchForm.Rows.length > 0) {
      const findPlan = this.searchForm.Rows[0].Columns.find(x => x.PropertyName === 'idPlan');

      if (findPlan) {
        this.subscription.add(findPlan.OnValueChange.subscribe(value => {
          this.SetPlanValue(value);
        }));
      }
    }
  }

  SetPlanValue(value: string) {
    this.client.value = Number(this.valueColumn.Values.find(x => x.Value === value).Description);
  }

  ConfigureSearchForm() {
    this.searchForm = {
      Rows : [
        {
          Columns: [
            this.descriptionColumn,
            this.valueColumn,
            this.dueDayColumn
          ]
        }
      ]
    };
  }
}
