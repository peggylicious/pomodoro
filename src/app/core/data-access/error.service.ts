import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  getClientMessage(error: Error): string {
    if (!navigator.onLine) {
      return 'No Internet Connection';
    }
    return error.message ? error.message : error.toString();
  }

  getClientStack(error: Error): string | undefined {
    return error.stack;
  }

  getServerMessage(error: HttpErrorResponse): string {
    if(error.status === 401){
      let err = new Error("Wrong credentials")
      return err.message
    }
    if(error.status === 500){
      let err = new Error("Server is down")
      return err.message
    }
    return 'error.message;'
  }

  getServerStack(error: HttpErrorResponse): string {
    // handle stack trace
    return 'stack';
  }
}
