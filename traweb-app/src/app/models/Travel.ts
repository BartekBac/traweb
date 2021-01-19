import { City } from './City';
import { Country } from './Country';
import { Opinion } from './Opinion';
import { TravelPosition } from './TravelPosition';

export class Travel {
  name: string;
  beginDate?: Date;
  endDate?: Date;
  travelPositions?: TravelPosition[];
  opinions?: Opinion[];
  countries?: Country[];
  cities?: City[];
}
