import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';
import { Travel } from '../models/Travel';
import { Constants } from '../shared/constants/Constants';
import { Functions } from '../shared/constants/Functions';
import { TravelCreateDTO, TravelCreateMapper } from '../shared/mappers/TravelCreateMapper';
import { TravelMapper, TravelDTO } from '../shared/mappers/TravelMapper';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  private baseUrl = Constants.TRAWEB_API_BASE_URL + 'travels/';

  constructor(private http: HttpClient) { }

  addTravel(travel: Travel): Observable<Travel> {
    return this.http.post<TravelDTO>(this.baseUrl, TravelCreateMapper.getSnakeCase(travel))
    .pipe(
      map(response => TravelMapper.getCamelCase(response)),
      catchError(error => {
        console.error(error);
        return throwError(Functions.getErrorMessage(error));
      })
    );
  }

  updateTravel(travel: Travel): Observable<Travel> {
    return this.http.put<TravelDTO>(this.baseUrl + travel.id + '/', TravelMapper.getSnakeCase(travel))
    .pipe(
      map(response => TravelMapper.getCamelCase(response)),
      catchError(error => {
        console.error(error);
        return throwError(Functions.getErrorMessage(error));
      })
    );
  }

  getTravel(travelId: number): Observable<Travel> {
    return this.http.get<TravelDTO>(this.baseUrl + travelId + '/')
    .pipe(
      map(response => TravelMapper.getCamelCase(response)),
      catchError(error => {
        console.error(error);
        return throwError(Functions.getErrorMessage(error));
      })
    );
  }

  getTravels(): Observable<Travel[]> {
    return this.http.get<TravelDTO[]>(this.baseUrl)
    .pipe(
      map(response => response.map(travelRaw => TravelMapper.getCamelCase(travelRaw))),
      catchError(error => {
        console.error(error);
        return throwError(Functions.getErrorMessage(error));
      })
    );
  }
}
