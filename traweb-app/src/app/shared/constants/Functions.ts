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

  private static convertJsonKeys(json: any, convert: (str: string) => string): any {
    let rawJson = '{';
    Object.keys(json).forEach((key) => {
      rawJson += `"${convert(key)}": "${json[key]}", `;
    });
    if (rawJson.length > 1) {
      rawJson = rawJson.slice(0, -2);
    }
    rawJson += '}';
    return JSON.parse(rawJson);
  }

  public static getCamelCaseJSON(json: any): any {
    return this.convertJsonKeys(json, Functions.toCamelCase);
    /*let rawJson = '{';
    Object.keys(json).forEach((key) => {
      rawJson += `"${Functions.toCamelCase(key)}": "${json[key]}", `;
    });
    if (rawJson.length > 1) {
      rawJson = rawJson.slice(0, -2);
    }
    rawJson += '}';
    return JSON.parse(rawJson);*/
  }

  public static getSnakeCaseJSON(json: any): any {
    return this.convertJsonKeys(json, Functions.toSnakeCase);
  }

  public static getErrorMessage(error: any): string {
    return Object.values(error.error).toString();
  }

}
