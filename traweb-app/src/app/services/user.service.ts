import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/internal/operators';
import { User } from '../models/User';
import { Constants } from '../shared/constants/Constants';
import { Functions } from '../shared/constants/Functions';
import { UserMapper, UserDTO } from '../shared/mappers/UserMapper';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private baseUrl = Constants.TRAWEB_API_BASE_URL + 'users/';

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User> {
    return this.http.get<UserDTO>(this.baseUrl + id)
    .pipe(
      map(res => UserMapper.getCamelCase(res)),
      catchError(error => {
        console.log(error);
        return throwError(Functions.getErrorMessage(error));
      })
   );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<UserDTO[]>(this.baseUrl)
    .pipe(
      map(res => res.map(userRaw => UserMapper.getCamelCase(userRaw))),
      catchError(error => {
        console.log(error);
        return throwError(Functions.getErrorMessage(error));
      })
   );
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<UserDTO>(this.baseUrl + 'current')
      .pipe(
        map(res => UserMapper.getCamelCase(res)),
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
    return this.http.put<UserDTO>(this.baseUrl + user.id + '/', user)
      .pipe(
        map(res => UserMapper.getCamelCase(res)),
        catchError(error => {
          console.log(error);
          return throwError(Functions.getErrorMessage(error));
        })
    );
  }
}
