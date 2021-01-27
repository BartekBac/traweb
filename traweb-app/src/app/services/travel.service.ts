import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';
import { TravelPositionType } from '../enums/TravelPositionType';
import { TravelPosition } from '../models/TravelPosition';
import { TravelDto } from '../models/dtos/TravelDto';
import { Travel } from '../models/Travel';
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
    /*return this.http.get<Travel>(this.baseUrl + 'current')
      .pipe(
        map(res => Functions.getCamelCaseJSON(res)),
        catchError(error => {
          console.log(error);
          return throwError(Functions.getErrorMessage(error));
        })
    );
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
    });*/
    const travels: Travel[] = [];
    /*travels.push({
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
    });*/
    return travels;
  }
  addTravel(travel: TravelDto): Observable<Travel> {
    return this.http.post<TravelDto>(this.baseUrl, travel)
    .pipe(
      map(response => Functions.getCamelCaseJSON(response)),
      catchError(error => {
        console.error(error);
        return throwError(Functions.getErrorMessage(error));
      })
    );
  }

  // TODO: przy responsie pobrawić pobieranie string arrayów

  updateTravel(travel: Travel): Observable<Travel> {
    return this.http.put<TravelDto>(this.baseUrl + travel.id + '/', travel)
    .pipe(
      map(response => Functions.getCamelCaseJSON(response)),
      catchError(error => {
        console.error(error);
        return throwError(Functions.getErrorMessage(error));
      })
    );
  }

  getTravel(travelId: number): Observable<Travel> {
    return this.http.get<Travel>(this.baseUrl + travelId + '/')
    .pipe(
      map(response => Functions.getCamelCaseJSON(response)),
      catchError(error => {
        console.error(error);
        return throwError(Functions.getErrorMessage(error));
      })
    );
  }
}
