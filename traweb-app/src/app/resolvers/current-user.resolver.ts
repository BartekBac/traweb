import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserResolver implements Resolve<User> {

  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.userService.getCurrentUser();
  }
}
