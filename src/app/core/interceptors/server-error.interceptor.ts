import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, of, retry, throwError } from 'rxjs';
import { HttpResponse } from '@capacitor/core';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse)=>{
        // if (error.status === 401) {
        //   // refresh token
        // } else {
        //   return throwError(error);
        // }
        return throwError(()=>{
          return error
        })
      })
    )
  }


  // private handleError(err: HttpErrorResponse): Observable<never> {
  //   // just a test ... more could would go here
  //   return throwError(() => err);
  // }
}
