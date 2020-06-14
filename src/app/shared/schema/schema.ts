import { PropertyType } from 'src/app/utils/enums/property-type';
import { EventEmitter } from '@angular/core';
import { SchemaFormColumn } from './schema-form-column';
import { SchemaConfiguration } from './configuration/schema-configuration';
import { ObjectValue } from '../models/object-value';
import { SchemaIcon } from './schema-icon';

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
        this.IsLoading = configuration.isLoading;
        this.ShowErrorMessage = configuration.showErrorMessage;
        this.IconSufix = configuration.iconSufix;
        this.MessageValidation = !configuration.messageValidation ? 'Campo obrigatório' : configuration.messageValidation;
    }

    Type: PropertyType;
    Attributes: any;
    Disabled = false;
    Required = false;
    Mask: string;
    IconSufix: SchemaIcon;
    AdditionalText: string;
    ShowErrorMessage = false;
    IsLoading: boolean;

    MessageValidation: string;
    OnValueChange: EventEmitter<any> = new EventEmitter<any>();
    OnValueSelected: EventEmitter<any> = new EventEmitter<any>();
    ElementRef: any;
}
