import { TravelPositionType } from '../enums/TravelPositionType';
import { Coordinates } from './Coordinates';

export class TravelPosition {
  coordinates: Coordinates;
  name: string;
  type: TravelPositionType;
  rating: number;
  description?: string;
  mainImage?: string;
  pictures?: string[];
}
