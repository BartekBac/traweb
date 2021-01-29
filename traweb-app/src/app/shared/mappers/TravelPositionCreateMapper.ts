import { Coordinates } from 'src/app/models/Coordinates';
import { TravelPosition } from 'src/app/models/TravelPosition';
import { Functions } from '../constants/Functions';

export interface TravelPositionCreateDTO {
  coordinates: Coordinates;
  name: string;
  type: number;
  rating: number;
  description: string;
  main_image: string;
  pictures: string;
  city: string;
  country_code: string;
}

export class TravelPositionCreateMapper {

  public static getSnakeCase(position: TravelPosition): TravelPositionCreateDTO {
    const positionCreate: TravelPositionCreateDTO = {
      name: position.name,
      coordinates: position.coordinates,
      type: position.type,
      rating: position.rating,
      description: position.description ?? '',
      main_image: position.mainImage ?? '',
      pictures: position.pictures ?
        Functions.boundOneLevelArrayToString(position.pictures) : '[]',
      city: position.city ?? '',
      country_code: position.countryCode ?? ''
    };
    return positionCreate;
  }
}
