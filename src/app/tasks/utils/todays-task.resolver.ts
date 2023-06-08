import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { TasksStoreService } from '../data-access/tasks-store.service';

@Injectable({
  providedIn: 'root'
})
export class TodaysTasksResolver implements Resolve<boolean> {
  constructor(private tasksStoreService: TasksStoreService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    // Cache storage should be used here with a condiction. Checking if cache is populated with tassssssssks
    console.log("From Child resolver")
    // return this.tasksStoreService.$tasks.subscribe(res=>res)
    // return this.tasksStoreService.getAllTasksFromRemote()

  }
}
