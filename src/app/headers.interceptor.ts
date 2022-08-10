import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const apiKey = "sk.9683282.a9e5417b0b61f6c61cfbfb9bd1b5466d";
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return next.handle(request);
  }
}
