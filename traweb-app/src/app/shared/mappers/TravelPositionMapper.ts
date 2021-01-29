import { Coordinates } from 'src/app/models/Coordinates';
import { TravelPosition } from 'src/app/models/TravelPosition';
import { Functions } from '../constants/Functions';

export interface TravelPositionDTO {
  id: number;
  name: string;
  coordinates: Coordinates;
  type: number;
  rating: number;
  description: string;
  main_image: string;
  pictures: string;
  country_code: string;
  city: string;
}

export class TravelPositionMapper {

  public static getCamelCase(positionRaw: TravelPositionDTO): TravelPosition {
    const position: TravelPosition = {
      id: positionRaw.id,
      name: positionRaw.name,
      coordinates: positionRaw.coordinates,
      type: positionRaw.type,
      rating: positionRaw.rating,
      description: positionRaw.description,
      mainImage: positionRaw.main_image,
      pictures: Functions.unboundOneLevelArray(positionRaw.pictures),
      countryCode: positionRaw.country_code,
      city: positionRaw.city
    };
    return position;
  }

  public static getSnakeCase(position: TravelPosition): TravelPositionDTO {
    const positionRaw: TravelPositionDTO = {
      id: position.id,
      name: position.name,
      coordinates: position.coordinates,
      type: position.type,
      rating: position.rating,
      description: position.description ?? '',
      main_image: position.mainImage ?? '',
      pictures: position.pictures ?
        Functions.boundOneLevelArrayToString(position.pictures) : '[]',
      country_code: position.countryCode ?? '',
      city: position.city ?? ''
    };
    return positionRaw;
  }
}
