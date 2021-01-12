import { City } from "./City";
import { Country } from "./Country";
import { Opinion } from "./Opinion";
import { TravelPosition } from "./TravelPosition";

export class Travel {
  name: string;
  beginDate?: string;
  endDate?: string;
  positions?: TravelPosition[] | string;
  opinions?: Opinion[];
  countryCodes?: string[];
  cities?: string[];
}
