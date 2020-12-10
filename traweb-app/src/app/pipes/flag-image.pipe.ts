import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flagImage'
})
export class FlagImagePipe implements PipeTransform {

  private readonly IMAGE_API_BASE_URL = 'https://www.countryflags.io/';

  /**
   * @param value country code by alpha-2
   * @param style available values: flat | shiny, default: flat
   * @param size available values: 16 | 24 | 32 | 48 | 64, default: 16
   * @returns URL for PNG image with a flag of selected country from remote service
   */
  transform(value: string, style?: string, size?: string): string {
    const urlStyle = style ?? 'flat';
    const urlSize = size ?? '16';
    return this.IMAGE_API_BASE_URL + value + '/' + urlStyle + '/' + urlSize + '.png';
  }

}
