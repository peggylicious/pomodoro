import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../data-access/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  count = 0;
  constructor( private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.showLoader()
    this.count++
    console.log(this.count, request)
    console.log('intercepted')
    return next.handle(request).pipe(
      finalize(()=>{
        this.count--
        if(this.count === 0){
          this.loadingService.hideLoader()
        }
      })
    )
  }
}
