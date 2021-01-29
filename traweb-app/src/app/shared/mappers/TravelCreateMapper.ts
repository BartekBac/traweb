import { Travel } from 'src/app/models/Travel';
import { User } from 'src/app/models/User';
import { Functions } from '../constants/Functions';
import { OpinionDTO } from './OpinionMapper';
import { TravelPositionCreateDTO, TravelPositionCreateMapper } from './TravelPositionCreateMapper';

export interface TravelCreateDTO {
  user: number;
  name: string;
  begin_date: string;
  end_date: string;
  country_codes: string;
  cities: string;
  positions: TravelPositionCreateDTO[];
  opinions: OpinionDTO[];
}

export class TravelCreateMapper {

  public static getSnakeCase(travel: Travel): TravelCreateDTO {
    const travelCreate: TravelCreateDTO = {
      name: travel.name,
      user: Number.isNaN(travel.user) ? (travel.user as User).id : (travel.user as number),
      begin_date: Functions.transformDate(travel.beginDate ?? ''),
      end_date: Functions.transformDate(travel.endDate ?? ''),
      cities: travel.cities ?
        Functions.boundOneLevelArrayToString(travel.cities) : '[]',
      country_codes: travel.countryCodes ?
        Functions.boundOneLevelArrayToString(travel.countryCodes) : '[]',
      positions: travel.positions?.map<TravelPositionCreateDTO>(position => TravelPositionCreateMapper.getSnakeCase(position)) ?? [],
      opinions: []
    };
    return travelCreate;
  }
}
