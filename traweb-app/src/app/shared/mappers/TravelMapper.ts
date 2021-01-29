import { Travel } from 'src/app/models/Travel';
import { User } from 'src/app/models/User';
import { Functions } from '../constants/Functions';
import { UserMapper, UserDTO } from './UserMapper';
import { TravelPositionMapper, TravelPositionDTO } from './TravelPositionMapper';
import { OpinionMapper, OpinionDTO } from './OpinionMapper';
import { DatePipe } from '@angular/common';

export interface TravelDTO {
  id: number;
  user: number | UserDTO;
  name: string;
  begin_date: string;
  end_date: string;
  country_codes: string;
  cities: string;
  positions: TravelPositionDTO[];
  opinions: OpinionDTO[];
}

export class TravelMapper {

  public static getCamelCase(travelRaw: TravelDTO): Travel {
    const travel: Travel = {
      id: travelRaw.id,
      user: Number.isNaN(travelRaw.user) ? UserMapper.getCamelCase((travelRaw.user as UserDTO)) : (travelRaw.user as number),
      name: travelRaw.name,
      beginDate: travelRaw.begin_date,
      endDate: travelRaw.end_date,
      countryCodes: Functions.unboundOneLevelArray(travelRaw.country_codes),
      cities: Functions.unboundOneLevelArray(travelRaw.cities),
      positions: travelRaw.positions.map(positionRaw => TravelPositionMapper.getCamelCase(positionRaw)),
      opinions: travelRaw.opinions.map(opinionRaw => OpinionMapper.getCamelCase(opinionRaw))
    };
    return travel;
  }

  public static getSnakeCase(travel: Travel): TravelDTO {
    const travelRaw: TravelDTO = {
      id: travel.id,
      user: Number.isNaN(travel.user) ? UserMapper.getSnakeCase((travel.user as User)) : (travel.user as number),
      name: travel.name,
      begin_date: Functions.transformDate(travel.beginDate ?? ''),
      end_date: Functions.transformDate(travel.endDate ?? ''),
      country_codes: travel.countryCodes ?
        Functions.boundOneLevelArrayToString(travel.countryCodes) : '[]',
      cities:  travel.cities ?
        Functions.boundOneLevelArrayToString(travel.cities) : '[]',
      positions: travel.positions?.map(position => TravelPositionMapper.getSnakeCase(position)) ?? [],
      opinions: travel.opinions?.map(opinion => OpinionMapper.getSnakeCase(opinion)) ?? []
    };
    return travelRaw;
  }
}
