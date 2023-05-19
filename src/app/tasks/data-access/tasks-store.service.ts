import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TasksService } from './tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TasksStoreService {
  // tasks$ = new Subject()
  private readonly _tasks = new BehaviorSubject<any>('')
  readonly $tasks = this._tasks.asObservable()
  onShowPlayBtn: BehaviorSubject<any> = new BehaviorSubject({val: true});
  onShowPauseBtn: BehaviorSubject<any> = new BehaviorSubject({});

  get tasks() : any {
    return  this._tasks.getValue()
  }

  set tasks(v : any) {
    this._tasks.next(v)
  }

  constructor(private tasksService: TasksService, private router: Router, private route: ActivatedRoute) { }

  getAllTasks(){
    this.tasksService.getAllTask()
    .subscribe(tasks => {
      this.tasks = tasks
      console.log(tasks)
    })
  }
  populateTasks(){
    return this.tasksService.getAllTask()
  }
  createTask(data:any){
    this.tasksService.createTask(data).subscribe(res=> {
      this.tasks.push(data)
      console.log(res)
      this.router.navigate(['tasks','all'])
    })
  }
  updateTasks(taskId:any, data: {}){
    console.log('taskId ' + taskId)
    return this.tasksService.updateTasks(taskId, data)
  }
  showPlayBtn(val:boolean, index: any){
    this.onShowPlayBtn.next({val, index})
  }
  showPauseBtn(val:boolean, index:any){
    this.onShowPauseBtn.next({val, index})
  }
}
