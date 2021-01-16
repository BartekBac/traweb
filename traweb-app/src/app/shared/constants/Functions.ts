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

  private static convertJsonKeys(json: any, convert: (str: string) => string, isNested = false): any {
    let rawJson = '{';
    Object.keys(json).forEach((key) => {
      if (!Array.isArray(json)) {
        // if array ommit indexes
        rawJson += `"${convert(key)}": `;
      }
      if (this.isJson(json[key])){
        // nested objects
        rawJson += `${this.convertJsonKeys(json[key], convert, true)}, `;
      } else {
        // simple property
        rawJson += `"${json[key]}", `;
      }
    });
    if (rawJson.length > 1) {
      rawJson = rawJson.slice(0, -2);
    }
    rawJson += '}';
    if (isNested) {
      if (Array.isArray(json)) {
        rawJson = rawJson.replace(/{/, '[');
        rawJson = rawJson.replace(/}$/, ']');
      }
      return rawJson;
    } else {
      return JSON.parse(rawJson);
    }
  }

  public static getCamelCaseJSON(json: any): any {
    return this.convertJsonKeys(json, Functions.toCamelCase);
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
