import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../shared/constants/Constants';
import { Functions } from '../shared/constants/Functions';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        // add authorization header with token if available
        const authToken = localStorage.getItem(Constants.LOCAL_STORAGE_AUTH_TOKEN);
        if (authToken && request.url.includes(Constants.TRAWEB_API_BASE_URL)) {
          let headers = request.headers;
          headers = headers.append('Authorization', `Token ${authToken}`);
          headers = headers.append('Accept', 'application/json');
          headers = headers.append('Content-Type', 'application/json');
          request = request.clone({headers});
        }
        return next.handle(request);
  }
}
