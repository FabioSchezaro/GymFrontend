import { SchemaFormColumn } from '../schema-form-column';
import { SchemaForm } from '../schema-form';
import { Schema } from '../schema';
import { newInstanceToObject } from '../../helpers/data/data-helper';

export function getParentObjectAndPropertyName(property: SchemaFormColumn, obj: any): {parent: any, propertyName: string} {
  const {PropertyName} = property;
  const hasDot = PropertyName.includes('.');
  let name = PropertyName;
  let parent = obj;

  if (hasDot) {
    const properties = PropertyName.split('.');

    if (properties.length > 1) {
      properties.forEach((prop, index) => {
        if (index !== properties.length - 1) {
          verifyPropertyValue(parent, prop);
          parent = parent[prop];
        } else {
          if (!parent.hasOwnProperty(property)) {
              parent[prop] = null;
            }
          name = prop;
        }
      });
    }
  } else if (!parent.hasOwnProperty(name)) {
    parent[name] = null;
  }

  return { parent, propertyName: name };
}

function verifyPropertyValue(parent: any, property: string) {
  const isEmpty = parent[property] == null;
  if (isEmpty) {
    parent[property] = {};
  }
}

export function isFormValid(form: SchemaForm, object: any): boolean {
  let isValid = true;
  if (form && form.Rows) {

    const schemas: Schema[] = getAllSchemas(form);

    schemas.forEach(schema => {
      if (isValid) {
        isValid = isSchemaValid(schema, object);
      }
    });
  }

  return isValid;
}

export function getAllSchemas(form: SchemaForm) {
  const schemas: Schema[] = [];

  form.Rows.forEach(row => {
      row.Columns.forEach(column => schemas.push(column));
  });

  return schemas;
}

export function isSchemaValid(schema: Schema, object: any) {
  let isValid = true;
  const result = getParentObjectAndPropertyName(schema, object);
  const value = result.parent[result.propertyName];

  if (schema.Required) {
    isValid = value != null && value !== '';
  }

  return isValid;
}

export function assingSchema(target: Partial<Schema>, source: Schema, ignore: string[] = ['Values', 'OnValueChange']): Schema {
  if (target && source) {
    const auxSource = newInstanceToObject(source);
    const aux = newInstanceToObject(target);

    for (const property of Object.keys(auxSource)) {
      let obj = auxSource;

      if (ignore.find(x => x === property)) {
          obj = source;
      }

      aux[property] = obj[property];
    }

    return aux;
  }

  return source;
}
