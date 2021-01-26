import { TravelPositionDto } from "./TravelPositionDto";

export interface TravelDto {
  user: number;
  name: string;
  beginDate: string;
  endDate: string;
  countryCodes: string[];
  cities: string[];
  positions: TravelPositionDto[];
}
