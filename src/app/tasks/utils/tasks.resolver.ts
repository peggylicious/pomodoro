import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TasksStoreService } from '../data-access/tasks-store.service';
import { TasksService } from '../data-access/tasks.service';

@Injectable({
  providedIn: 'root'
})
export class TasksResolver implements Resolve<boolean> {
  constructor(private tasksStoreService: TasksStoreService, private tasksService: TasksService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    // Cache storage should be used here with a condiction. Checking if cache is populated with tassssssssks
    console.log("From resolver")
    // return this.tasksStoreService.populateTasks()
    // return this.tasksService.getAllTask()
    // .subscribe(tasks => {
    //   console.log(tasks)
    //   return  tasks
    // })
  }
}
