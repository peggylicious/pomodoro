import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TasksService } from './tasks.service';

@Injectable({
  providedIn: 'root'
})
export class TasksStoreService {
  // tasks$ = new Subject()
  private readonly _tasks = new BehaviorSubject<any>('')
  readonly $tasks = this._tasks.asObservable()

  get tasks() : any {
    return  this._tasks.getValue()
  }

  set tasks(v : any) {
    this._tasks.next(v)
  }

  constructor(private tasksService: TasksService) { }

  getAllTasks(){
    this.tasksService.getPost().subscribe(tasks => {
      this._tasks.next(tasks)
      console.log(tasks)
    })
  }

}
