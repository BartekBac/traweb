import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Functions } from '../shared/constants/Functions';

@Injectable()
export class BodyInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        // convert request body to snake_case if posted
        if (request.body !== null) {
          request = request.clone({body: Functions.getSnakeCaseJSON(request.body)});
        }
        return next.handle(request);
  }
}
