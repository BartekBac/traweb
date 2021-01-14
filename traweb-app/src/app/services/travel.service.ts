import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/internal/operators';
import { TravelDto } from '../models/dtos/TravelDto';
import { TravelPositionDto } from '../models/dtos/TravelPositionDto';
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

  addTravel(travel: TravelDto): Observable<Travel> {
    return this.http.post<TravelDto>(this.baseUrl, travel)
    .pipe(
      map(response => Functions.getCamelCaseJSON(response)),
      tap(response => {
        console.log(response);
      }),
      catchError(error => {
        console.error(error);
        return throwError(Functions.getErrorMessage(error));
      })
    );
  }

  addTravelPosition(position: TravelPositionDto, travelId: number): Observable<TravelPosition> {
    return this.http.post<TravelPositionDto>(this.baseUrl + travelId + '/positions/', position)
    .pipe(
      map(response => Functions.getCamelCaseJSON(response)),
      tap(response => {
        console.log(response);
      }),
      catchError(error => {
        console.error(error);
        return throwError(Functions.getErrorMessage(error));
      })
    );
  }
}
