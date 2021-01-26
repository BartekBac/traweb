import { TravelPositionType } from "../enums/TravelPositionType";
import { Coordinates } from "./Coordinates";

export class TravelPosition {
  id: number;
  name: string;
  coordinates: Coordinates;
  type: TravelPositionType;
  rating: number;
  description?: string;
  mainImage?: string;
  pictures?: string[];
  city?: string;
  countryCode?: string;
}
