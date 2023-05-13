import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  modalOpen:Subject<boolean> = new Subject()
  modalOpen$ = this.modalOpen.asObservable()
  constructor() { }

  showLoader(){
    this.modalOpen.next(true)
  }
  hideLoader(){
    this.modalOpen.next(false)
  }

  // public get modalOpen_() : any {
  //   return this.modalOpen.next(true)
  // }


  // public set modalOpen_(v : string) {
  //   this.modalOpen.next(false)

  // }


}
