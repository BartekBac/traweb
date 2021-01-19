import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';
import { TravelPositionType } from '../enums/TravelPositionType';
import { Travel } from '../models/Travel';
import { TravelPosition } from '../models/TravelPosition';
import { Constants } from '../shared/constants/Constants';
import { Functions } from '../shared/constants/Functions';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  private baseUrl = Constants.TRAWEB_API_BASE_URL + 'travels/';

  constructor(private http: HttpClient) { }

  getCurrentUserTravels(): Travel[] {
    // TODO
    /* return this.http.get<Travel>(this.baseUrl + 'current')
      .pipe(
        map(res => Functions.getCamelCaseJSON(res)),
        catchError(error => {
          console.log(error);
          return throwError(Functions.getErrorMessage(error));
        })
    ); */
    const travelPositions: TravelPosition[] = [];
    travelPositions.push({
      coordinates: {lat: 48, lng: 18},
      name: 'punkt',
      type: TravelPositionType.AccommodationPlace,
      rating: 3,
      description: 'opis',
      mainImage: '',
      pictures: ['sdsd', 'sdsd'],
    });
    travelPositions.push({
      coordinates: {lat: 48, lng: 18},
      name: 'punkt2',
      type: TravelPositionType.AccommodationPlace,
      rating: 3,
      description: 'opis',
      mainImage: '',
      pictures: ['sdsd', 'sdsd'],
    });
    travelPositions.push({
      coordinates: {lat: 48, lng: 18},
      name: 'punkt3',
      type: TravelPositionType.AccommodationPlace,
      rating: 3,
      description: 'opis',
      mainImage: '',
      pictures: ['sdsd', 'sdsd'],
    });
    const travels: Travel[] = [];
    travels.push({
      name: 'podroz',
      beginDate: new Date(),
      endDate: new Date(),
      travelPositions: (travelPositions),
      opinions: [],
      countries: [],
      cities: [],
    });
    travels.push({
      name: 'podroz2',
      beginDate: new Date(),
      endDate: new Date(),
      travelPositions: (travelPositions),
      opinions: [],
      countries: [],
      cities: [],
    });
    travels.push({
      name: 'podroz3',
      beginDate: new Date(),
      endDate: new Date(),
      travelPositions: (travelPositions),
      opinions: [],
      countries: [],
      cities: [],
    });
    travels.push({
      name: 'podroz4',
      beginDate: new Date(),
      endDate: new Date(),
      travelPositions: (travelPositions),
      opinions: [],
      countries: [],
      cities: [],
    });
    return travels;
  }
}
