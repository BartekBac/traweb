import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/internal/operators';
import { Travel } from '../models/Travel';
import { Constants } from '../shared/constants/Constants';
import { Functions } from '../shared/constants/Functions';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  private baseUrl = Constants.TRAWEB_API_BASE_URL + 'travels/';

  constructor(private http: HttpClient) { }

  addTravel(travel: Travel): Observable<Travel> {
    return this.http.post<Travel>(this.baseUrl, travel)
    .pipe(
      tap(response => {
        console.log(response)
      }),
      catchError(error => {
        console.error(error);
        return throwError(Functions.getErrorMessage(error));
      })
    );
  }
}
