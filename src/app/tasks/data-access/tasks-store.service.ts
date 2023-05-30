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

  // onShowPlayBtn: BehaviorSubject<any> = new BehaviorSubject({val: true});
  onShowPlayBtn: BehaviorSubject<boolean> = new BehaviorSubject(true);
  onShowPauseBtn: BehaviorSubject<any> = new BehaviorSubject({});
  onPlayPomodoroOnNav: Subject<boolean> = new Subject();
  playOnInit_: BehaviorSubject<boolean> = new BehaviorSubject(false)
  showModal: BehaviorSubject<boolean> = new BehaviorSubject(false)
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
  updateTasks(taskId:any, data: {timeLeft:any, pomodoros:any, totalCycles:any, singleCycle:any, isComplete:any}, taskIndex?:any){
    console.log('task ', data)
    console.log(this.tasks)
    if(data?.singleCycle === 4){
      data.isComplete = true
    }
    // if((data?.totalCycles % 4) !== 0){
    //   data.isComplete = false
    // }
    return this.tasksService.updateTasks(taskId, data).subscribe(res=>{
      console.log(res)
    this.updateUI(taskId, res, taskIndex)
      // if((res?.pomodoros%4 )=== 0)
      this.getTaskById(taskId)

    })
  }
  // updateUI(taskId:any, data: {timeLeft:any, pomodoros:any, totalCycles:any, isComplete:any, singleCycle: any}, taskIndex?:any){
  updateUI(taskId:any, data:any, taskIndex?:any){
    this.tasks = this.tasks.map((element:any, index:any) => {
      console.log('taskIndex: ' + taskIndex,  'index: ' + element._id)
      data.pomodoros = Math.trunc(data?.totalCycles/4)
      // data.isComplete = true
        if(element._id === data?._id) {

          // element.timeLeft = data?.timeLeft
          // element.pomodoros = data?.pomodoros
          // element.totalCycles = data?.totalCycles
          // element.singleCycle = data?.singleCycle
          // if(data?.singleCycle === 4){
          //   console.log('isComplete')
          //   element.isComplete = true
          // }
          element = data
          console.log("Elem: ", element, ' - ', 'data: ', data)
          // if((data.totalCycles % 4) !== 0){
          //   element.isComplete = false
          // }
          if(element.isComplete){
            this.showModal.next(true)
          }
        }
        return element
      });
  }
  // showPlayBtn(val:boolean, index: any){
  showPlayBtn(val:boolean){
    // this.onShowPlayBtn.next({val, index})
    this.onShowPlayBtn.next(val)
  }
  showPauseBtn(val:boolean, index:any){
    this.onShowPauseBtn.next({val, index})
  }
  playPomodoro(val:boolean){
    this.onPlayPomodoroOnNav.next(val)
  }
  playOnInit(val:boolean){
    return this.playOnInit_.next(val)
  }
  deleteAllTasks(){
    this.tasksService.deleteAllTasks().subscribe(res=>{
      console.log("All Tasks Deleted ",res)
    })
  }
}
