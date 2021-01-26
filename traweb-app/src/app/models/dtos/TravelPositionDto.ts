import { Coordinates } from '../Coordinates';

export interface TravelPositionDto {
  coordinates: Coordinates;
  name: string;
  type: number;
  rating: number;
  description: string;
  mainImage: string;
  pictures: string[];
  city: string;
  countryCode: string;
}
