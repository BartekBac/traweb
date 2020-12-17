import { TravelPositionType } from "../enums/TravelPositionType";

export class TravelPosition {
  lat: number;
  lng: number;
  name: string;
  type: TravelPositionType;
  description?: string;
  overallRating?: number;
  mainImage?: string;
  isFree?: boolean;
  expensivityRating?: string;
  petFriendly?: boolean;
}
