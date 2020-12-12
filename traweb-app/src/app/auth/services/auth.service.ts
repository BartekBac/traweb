import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/internal/operators';
import { User } from 'src/app/models/User';
import { Constants } from 'src/app/shared/constants/Constants';
import { Functions } from 'src/app/shared/constants/Functions';
import { LoginResponse } from '../models/LoginResponse';
import { UserLogin } from '../models/UserLogin';
import { UserRegister } from '../models/UserRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = Constants.TRAWEB_API_BASE_URL;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  register(userRegister: UserRegister): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'users/', userRegister)
    .pipe(
      tap(response => {
        setTimeout(() => this.router.navigate(['/login']), 3000);
      }),
      catchError(error => {
        console.log(error);
        return throwError(Functions.getErrorMessage(error));
      })
    );
  }

  login(userLogin: UserLogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.baseUrl + 'auth/token/login', userLogin)
    .pipe(
      map(response => Functions.getCamelCaseJSON(response)),
      tap(response => {
        localStorage.setItem(Constants.LOCAL_STORAGE_AUTH_TOKEN, response.authToken);
      }),
      catchError(error => {
        console.log(error);
        return throwError(Functions.getErrorMessage(error));
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post<LoginResponse>(this.baseUrl + 'auth/token/logout', null)
    .pipe(
      tap(response => {
        localStorage.removeItem(Constants.LOCAL_STORAGE_AUTH_TOKEN);
        this.router.navigate(['/login']);
      }),
      catchError(error => {
        console.log(error);
        return throwError(Functions.getErrorMessage(error));
      })
    );
  }
}
