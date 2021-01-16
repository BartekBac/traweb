import { Opinion } from './Opinion';
import { TravelPosition } from './TravelPosition';
import { User } from './User';

export class Travel {
  id: number;
  user?: User | number;
  name: string;
  beginDate?: Date;
  endDate?: Date;
  positions?: TravelPosition[];
  opinions?: Opinion[];
  countryCodes?: string[];
  cities?: string[];
}
