import { Component, OnInit, Input } from '@angular/core';
import { Schema } from 'src/app/shared/schema/schema';
import { SchemaFormColumn } from 'src/app/shared/schema/schema-form-column';
import { SchemaForm } from 'src/app/shared/schema/schema-form';
import { ISchemaFormButton } from 'src/app/shared/schema/schema-form-button';
import { Address } from 'src/app/models/address';
import { PropertyType } from 'src/app/utils/enums/property-type';
import { BaseComponent } from 'src/app/utils/components/base.component';
import { Masks } from 'src/app/utils/masks/masks';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent extends BaseComponent implements OnInit {

  @Input() address: Address;
  searchAddress: Address[] = [];

  cepColumn: Schema;
  neighBorhoodColumn: Schema;
  streetColumn: Schema;
  numberColumn: Schema;
  complementColumn: Schema;

  columns: SchemaFormColumn[] = [];
  searchForm: SchemaForm;
  saveForm: SchemaForm;

  listButtons: Array<ISchemaFormButton> = new Array<ISchemaFormButton>();
  saveAddressButton: ISchemaFormButton;

  cepMask: any;

  constructor() {
    super();
  }

  ngOnInit() {
    this.SetCepMask();
    this.SetCommonSchemas();
    this.ConfigureSearchForm();
  }

  SetCepMask() {
    this.cepMask = Masks.CepMask();
  }

  SetCommonSchemas() {
    this.cepColumn = new Schema('CEP', 'cep', PropertyType.Mask, [], { mask: this.cepMask });
    this.neighBorhoodColumn = new Schema('Bairro', 'neighBorhood', PropertyType.Text);
    this.streetColumn = new Schema('Rua', 'street', PropertyType.Text);
    this.numberColumn = new Schema('Número', 'number', PropertyType.Number);
    this.complementColumn = new Schema('Complemento', 'complement', PropertyType.Text);
  }

  ConfigureSearchForm() {
    this.searchForm = {
      Rows : [
        {
          Columns: [
            this.cepColumn,
            this.neighBorhoodColumn,
          ]
        },
        {
          Columns: [
            this.streetColumn,
            this.numberColumn,
          ]
        },
        {
          Columns: [
            this.complementColumn,
          ]
        }
      ]
    };
  }
}
