import { PropertyType } from 'src/app/utils/enums/property-type';
import { EventEmitter } from '@angular/core';
import { SchemaFormColumn } from './schema-form-column';
import { SchemaConfiguration } from './configuration/schema-configuration';
import { ObjectValue } from '../models/object-value';

export class Schema extends SchemaFormColumn {

    constructor(
        description: string,
        propertyName: string,
        type: PropertyType,
        values: ObjectValue[] = [],
        configuration: Partial<SchemaConfiguration> = {}) {

        super(description, propertyName, values);

        this.Type = type;
        this.Disabled = configuration.disabled;
        this.Required = configuration.required;
        this.Attributes = configuration.attributes;
        this.Mask = configuration.mask;
        this.AdditionalText = configuration.additionalText;
        this.MessageValidation = !configuration.messageValidation ?  'Campo obrigatório' : configuration.messageValidation;
    }

    Type: PropertyType;
    Attributes: any;
    Disabled = false;
    Required = false;
    Mask: string;
    AdditionalText: string;

    MessageValidation: string;
    OnValueChange: EventEmitter<any> = new EventEmitter<any>();
    ElementRef: any;
}
