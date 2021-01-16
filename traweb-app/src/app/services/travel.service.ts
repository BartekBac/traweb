import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';
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
    return this.http.put<TravelDto>(this.baseUrl + travel.id, travel)
    .pipe(
      map(response => Functions.getCamelCaseJSON(response)),
      catchError(error => {
        console.error(error);
        return throwError(Functions.getErrorMessage(error));
      })
    );
  }
}
