import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { Constants } from '../shared/constants/Constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = Constants.TRAWEB_API_BASE_URL + 'users/';

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + id);
  }

}
