import { DatePipe } from '@angular/common';
import { Coordinates } from 'src/app/models/Coordinates';

export class Functions {

  public static unboundOneLevelArray(str: string): Array<any> {
    str = str.substring(1, str.length - 1);
    return str.split(',');
  }

  public static boundOneLevelArrayToString(array: Array<any>): string {
    return '[' + array.toString() + ']';
  }

  public static transformDate(date: string | number | Date): string {
    const datePipe = new DatePipe('en-US');
    try {
      return datePipe.transform(date, 'YYYY-MM-dd') ?? '';
    } catch {
      if (date) {
        return date.toString();
      } else {
        return '';
      }
    }
  }

  public static getErrorMessage(error: any): string {
    try {
      return Object.values(error.error).toString();
    } catch {
      return error;
    }
  }

  public static isLocationSet(location: Coordinates): boolean {
    return location.lat !== 0 || location.lng !== 0;
  }
}
