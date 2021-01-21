import { DatePipe } from '@angular/common';
import moment from 'moment';
import { Coordinates } from 'src/app/models/Coordinates';

export class Functions {

  public static toCamelCase(str: string): string {
    return str.replace(/([-_][a-z])/ig, (s) => {
      return s.toUpperCase()
        .replace('-', '')
        .replace('_', '');
    });
  }

  public static toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }

  private static isJson(item: any): boolean {
    item = typeof item !== 'string' ? JSON.stringify(item) : item;
    try {
      if (!item.includes('{')){
        return false;
      } else {
        item = JSON.parse(item);
      }
    } catch (e) {
        return false;
    }

    return (typeof item === 'object' && item !== null);
  }

  private static isDate(date: any): boolean {
    return moment(date, 'DD-MM-YYYY', true).isValid();
  }

  private static unboundOneLevelArray(str: string): any {
    str = `${str}`.replace(/\[/, '["');
    str = `${str}`.replace(/,/g, '","');
    str = `${str}`.replace(/\]$/, '"]');
    str = str === '[""]' ? '[]' : str;
    return str;
  }

  private static isBoundedOneLevelArray(str: string): boolean {
    return str.startsWith('[') && str.endsWith(']')
  }

  private static convertJsonKeys(json: any, convert: (str: string) => string, isRequest = true, isNested = false): any {
    let rawJson = '';
    const isJsonArray = Array.isArray(json);

    Object.keys(json).forEach((key) => {
      if (!isJsonArray) {
      // if whole JSON is not array bound property name
        rawJson += `"${convert(key)}": `;
        // if array ommit indexes
      }

      if (Array.isArray(json[key])) {
      // if single value is array
        if (this.isJson(json[key])) {
          // if array of nested objects
          rawJson += `${this.convertJsonKeys(json[key], convert, isRequest, true)}, `;
        } else {
          // if array of simple property
          if (isRequest) {
            // when request, bound one-level array to string
            rawJson += `"[${json[key]}]", `;
          } else {
            rawJson += `[${json[key]}], `;
          }
        }
      } else {
      // if single value is property
        if (this.isJson(json[key])) {
          // if property is nested object
          rawJson += `${this.convertJsonKeys(json[key], convert, isRequest, true)}, `;
        } else {
          // if property is simple property
          if (!isNaN(Number(`${json[key]}`)) && `${json[key]}`.length > 0) {
            // simple number property
            rawJson += `${json[key]}, `;
          } else if (this.isDate(json[key])) {
            // simple date property
            if (isRequest && !isNaN(Date.parse(json[key]))) {
              // when request and bad format (first save) transform to django date format
              const datePipe = new DatePipe('en-US');
              rawJson += `"${datePipe.transform(`${json[key]}`, 'YYYY-MM-dd')}", `;
            } else {
              // when response pass as string or already transformed
              rawJson += `"${json[key]}", `;
            }
          } else {
            // any other property (string|empty|etc)
            if (!isRequest && this.isBoundedOneLevelArray(`${json[key]}`)) {
              // when response check if string is bounded one-level array
              rawJson += `${this.unboundOneLevelArray(json[key])}, `;
            } else {
              // any other treat as string property
              rawJson += `"${json[key]}", `;
            }
          }
        }
      }
    });

    if (rawJson.length > 1) {
      rawJson = rawJson.slice(0, -2);
    }

    if (isJsonArray) {
      rawJson = '[' + rawJson + ']';
    } else {
      rawJson = '{' + rawJson + '}';
    }

    if (isNested) {
      return rawJson;
    } else {
      return JSON.parse(rawJson);
    }
  }

  public static getCamelCaseJSON(json: any): any {
    return this.convertJsonKeys(json, Functions.toCamelCase, false);
  }

  public static getSnakeCaseJSON(json: any): any {
    return this.convertJsonKeys(json, Functions.toSnakeCase);
  }

  public static getErrorMessage(error: any): string {
    return Object.values(error.error).toString();
  }

  public static isLocationSet(location: Coordinates): boolean {
    return location.lat !== 0 || location.lng !== 0;
  }
}
