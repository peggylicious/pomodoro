import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TasksStoreService } from '../data-access/tasks-store.service';

@Injectable({
  providedIn: 'root'
})
export class TasksResolver implements Resolve<boolean> {
  constructor(private tasksStoreService: TasksStoreService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.tasksStoreService.getAllTasks()
    return this.tasksStoreService.$tasks
  }
}
