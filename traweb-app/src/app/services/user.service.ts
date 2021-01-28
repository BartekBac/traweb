import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';
import { User } from '../models/User';
import { Constants } from '../shared/constants/Constants';
import { Functions } from '../shared/constants/Functions';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = Constants.TRAWEB_API_BASE_URL + 'users/';

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + id);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'current')
      .pipe(
        map(res => Functions.getCamelCaseJSON(res)),
        catchError(error => {
          console.log(error);
          return throwError(Functions.getErrorMessage(error));
        })
    );
  }

  getCurrentUserSnake(): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'current');
  }

  updateCurrentUser(user: User): Observable<User> {
    return this.http.put<User>(this.baseUrl + user.id + '/', user)
      .pipe(
        map(res => Functions.getCamelCaseJSON(res)),
        catchError(error => {
          console.log(error);
          return throwError(Functions.getErrorMessage(error));
        })
    );
  }
}
