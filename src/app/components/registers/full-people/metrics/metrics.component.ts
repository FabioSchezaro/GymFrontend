import { Component, OnInit, Input } from '@angular/core';
import { Metrics } from 'src/app/models/metrics';
import { Schema } from 'src/app/shared/schema/schema';
import { SchemaFormColumn } from 'src/app/shared/schema/schema-form-column';
import { SchemaForm } from 'src/app/shared/schema/schema-form';
import { PropertyType } from 'src/app/utils/enums/property-type';
import { assingSchema } from 'src/app/shared/schema/helper/schema-helper';
import { BaseComponent } from 'src/app/utils/components/base.component';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent extends BaseComponent implements OnInit {

  @Input() metrics: Metrics;
  searchMetrics: Metrics[] = [];

  bicepsColumn: Schema;
  breastplateColumn: Schema;
  hipColumn: Schema;
  abdomenColumn: Schema;
  thighsColumn: Schema;
  calfColumn: Schema;

  columns: SchemaFormColumn[] = [];
  searchForm: SchemaForm;
  saveForm: SchemaForm;

  constructor() {
    super();
  }

  ngOnInit() {
    this.SetCommonSchemas();
    this.ConfigureSearchForm();
  }

  SetCommonSchemas() {
    this.bicepsColumn = new Schema('Biceps', 'biceps', PropertyType.Number, [], { required: true });
    this.breastplateColumn = new Schema('Peitoral', 'breastplate', PropertyType.Number, [], { required: true });
    this.hipColumn = new Schema('Quadril', 'hip', PropertyType.Number, [], { required: true });
    this.abdomenColumn = new Schema('Abdomen', 'abdomen', PropertyType.Number, [], { required: true });
    this.thighsColumn = new Schema('Coxa', 'thighs', PropertyType.Number, [], { required: true });
    this.calfColumn = new Schema('Panturrilha', 'calf', PropertyType.Number, [], { required: true });
  }

  ConfigureSearchForm() {
    this.searchForm = {
      Rows : [
        {
          Columns: [
            this.bicepsColumn,
            this.breastplateColumn,
            this.hipColumn
          ]
        },
        {
          Columns: [
            this.abdomenColumn,
            this.thighsColumn,
            this.calfColumn
          ]
        }
      ]
    };
  }
}
