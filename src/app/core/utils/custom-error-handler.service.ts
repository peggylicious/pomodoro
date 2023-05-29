import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { NotificationService } from '../data-access/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../data-access/error.service';

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandlerService implements ErrorHandler{


  constructor(private injector: Injector) { }

  handleError(error: unknown) {
    console.log("Error handler activated", error)
    const notifier = this.injector.get(NotificationService);
    const errorService = this.injector.get(ErrorService)

    let message;
    if (error instanceof HttpErrorResponse) {
      // Server Error
      message = errorService.getServerMessage(error);
      // stackTrace = errorService.getServerStack(error);
      notifier.presentToast('top', message);
    }else {
      // Client Error
      message = errorService.getClientMessage(error as Error);
      // stackTrace = errorService.getClientStack(error);
      notifier.presentToast('top', message);

    }

    console.error(error);
  }

}
