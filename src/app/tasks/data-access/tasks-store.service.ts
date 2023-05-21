import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, filter, map, pipe } from 'rxjs';
import { TasksService } from './tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TasksStoreService {
  // tasks$ = new Subject()
  private readonly _tasks = new BehaviorSubject<any>('')
  readonly $tasks = this._tasks.asObservable()
  // readonly upcomingEvents$ = this.events$.pipe(map(res=> res.filter(event => new Date(event.time).getTime()  > new Date().getTime())))

  onShowPlayBtn: BehaviorSubject<any> = new BehaviorSubject({val: true});
  onShowPauseBtn: BehaviorSubject<any> = new BehaviorSubject({});
  selectedTask: any;
  selectedIndex: any;
  get tasks() : any {
    return  this._tasks.getValue()
  }

  set tasks(v : any) {
    this._tasks.next(v)
  }

  constructor(private tasksService: TasksService, private router: Router, private route: ActivatedRoute) { }
  getTasks(){
    this.tasksService.getAllTask().subscribe(res=> this.tasks = res)
  }
  getAllTasks(){
    this.tasksService.getAllTask()
    .subscribe(tasks => {
      this.tasks = tasks
      console.log(tasks)
    })
  }
  getTaskById(id:string){
    console.log(id)
    if(this.tasks.length === 0){
      this.tasksService.getAllTask().subscribe(res=> {
        this.tasks = res
        this.selectedTask = this.tasks.filter((res:any) => id === res._id)
        console.log(this.selectedTask)
      })
    }else{
      this.selectedTask = this.tasks.filter((res:any, index:any) => {
        this.selectedIndex = index
        console.log("Selected Index ", this.selectedIndex)
        if(id === res._id){
          return res
        }
      })
      console.log(this.selectedTask)
    }
  }
  populateTasks(){
    return this.getAllTasks()
  }
  createTask(data:any){
    this.tasksService.createTask(data).subscribe(res=> {
      this.tasks.push(data)
      console.log(res)
      this.router.navigate(['tasks','all'])
    })
  }
  updateTasks(taskId:any, data: {timeLeft:any, pomodoros:any}, taskIndex?:any){
    console.log('taskId ' + taskId)
    this.tasks = this.tasks.map((element:any, index:any) => {
    console.log('taskIndex: ' + taskIndex,  'index: ' + element._id)
      if(element._id === taskIndex) {

        element.timeLeft = data?.timeLeft
        element.pomodoros = data?.pomodoros
      }
      return element
    });
    console.log(this.tasks)
    return this.tasksService.updateTasks(taskId, data).subscribe(res=>{
      console.log(res)
      this.getTaskById(taskId)

    })
  }
  showPlayBtn(val:boolean, index: any){
    this.onShowPlayBtn.next({val, index})
  }
  showPauseBtn(val:boolean, index:any){
    this.onShowPauseBtn.next({val, index})
  }
}
