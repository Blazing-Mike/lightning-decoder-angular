import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, retry } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UiService } from '../services/ui.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private uiService:UiService ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {
        this.uiService.displayNotyf();
        //implemeting error handling with a ui serverity message
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);

        } else {
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
      }
      // return an observable with a user-facing error message
      return throwError(error);
    }),);
  }
}
