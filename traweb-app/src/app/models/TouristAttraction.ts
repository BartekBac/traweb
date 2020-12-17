import { TravelPosition } from "./TravelPosition";

export class TouristAttraction extends TravelPosition {
  ageRestriction?: number;
  averageSpendTime?: number;
  attractionRating?: number;
  pictures?: string[];
}
