import { Component, OnInit, Input } from '@angular/core';
import { PhisicalAvaliation } from 'src/app/models/phisical-avaliation';
import { Schema } from 'src/app/shared/schema/schema';
import { SchemaFormColumn } from 'src/app/shared/schema/schema-form-column';
import { SchemaForm } from 'src/app/shared/schema/schema-form';
import { PropertyType } from 'src/app/utils/enums/property-type';
import { BaseComponent } from 'src/app/utils/components/base.component';

@Component({
  selector: 'app-phisical-avaliation',
  templateUrl: './phisical-avaliation.component.html',
  styleUrls: ['./phisical-avaliation.component.scss']
})
export class PhisicalAvaliationComponent extends BaseComponent implements OnInit {

  @Input() phisicalAvaliation: PhisicalAvaliation;
  searchPhisicalAvaliation: PhisicalAvaliation[] = [];

  weightColumn: Schema;
  reightColumn: Schema;
  fatPercentColumn: Schema;

  columns: SchemaFormColumn[] = [];
  searchForm: SchemaForm;

  constructor() {
    super();
  }

  ngOnInit() {
    this.SetCommonSchemas();
    this.ConfigureSearchForm();
  }

  SetCommonSchemas() {
    this.weightColumn = new Schema('Peso', 'weight', PropertyType.Number, [], { required: true });
    this.reightColumn = new Schema('Altura', 'reight', PropertyType.Number, [], { required: true });
    this.fatPercentColumn = new Schema('Percentual de gordura', 'fatPercent', PropertyType.Number, [], { required: true });
  }

  ConfigureSearchForm() {
    this.searchForm = {
      Rows : [
        {
          Columns: [
            this.weightColumn,
            this.reightColumn,
            this.fatPercentColumn
          ]
        }
      ]
    };
  }
}
