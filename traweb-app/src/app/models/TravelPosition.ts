import { TravelPositionType } from "../enums/TravelPositionType";

export class TravelPosition {
  lat: number;
  lng: number;
  name: string;
  type: TravelPositionType;
  rating: number;
  description?: string;
  mainImage?: string;
  pictures?: string[];
}
