import { Pipe, PipeTransform } from '@angular/core';
import { TravelPositionType } from '../enums/TravelPositionType';

@Pipe({
  name: 'travelPositionType'
})
export class TravelPositionTypePipe implements PipeTransform {

  /**
   * @param value one of TravelPositionType enum value
   * @param mode available values: icon | name, default: name
   * @returns name or icon specific for provided value depending on mode
   */
  transform(value: number, mode?: string): string {
    const selectedMode = mode ?? 'name';
    if (value === 0) {
      console.log('value === 0');
    }
    switch(value) {
      case 0: console.log('switch 0'); break;
      default: console.log('switch default');
    }

    if (selectedMode === 'name') {
      switch (value) {
        case TravelPositionType.AccommodationPlace:
        case TravelPositionType.AccommodationPlace.valueOf(): return 'Accommodation Place';
        case TravelPositionType.DiningPlace:
        case TravelPositionType.DiningPlace.valueOf(): return 'Dining Place';
        case TravelPositionType.TouristAttraction:
        case TravelPositionType.TouristAttraction.valueOf(): return 'Tourist Attraction';
        default: return 'xd';
      }
    } else {
      switch (value) {
        case TravelPositionType.AccommodationPlace:
        case TravelPositionType.AccommodationPlace.valueOf(): return 'hotel';
        case TravelPositionType.DiningPlace:
        case TravelPositionType.DiningPlace.valueOf(): return 'restaurant';
        case TravelPositionType.TouristAttraction:
        case TravelPositionType.TouristAttraction.valueOf(): return 'local_see';
        default: return 'icnxd';
      }
    }
  }

}
