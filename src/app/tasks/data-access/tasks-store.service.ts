import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, filter, map, pipe } from 'rxjs';
import { TasksService } from './tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksStoreService {
  // tasks$ = new Subject()
  private readonly _tasks = new BehaviorSubject<any>('')
  readonly $tasks: Observable<Task[]> = this._tasks.asObservable()
  // readonly upcomingEvents$ = this.events$.pipe(map(res=> res.filter(event => new Date(event.time).getTime()  > new Date().getTime())))
  readonly todaysTasks$: Observable<Task[]> = this.$tasks.pipe(map(res=>res.filter((task: Task) => new Date(task?.date).toISOString().split('T')[0] ===  new Date().toISOString().split('T')[0])))
  // onShowPlayBtn: BehaviorSubject<any> = new BehaviorSubject({val: true});
  onShowPlayBtn: BehaviorSubject<boolean> = new BehaviorSubject(true);
  onShowPauseBtn: BehaviorSubject<any> = new BehaviorSubject({});
  onPlayPomodoroOnNav: Subject<boolean> = new Subject();
  playOnInit_: BehaviorSubject<boolean> = new BehaviorSubject(false)
  showModal: BehaviorSubject<boolean> = new BehaviorSubject(false)
  selectedTask: any;
  selectedIndex: any;
  successfullyDeleted: any;
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
      this.tasks.push(res)
      console.log(res)
      this.router.navigate(['tasks','all'])
    })
  }
  updateTasks(taskId:any, data: {timeLeft:any, pomodoros:any, totalCycles:any, singleCycle:any, isCompleteCycle:any}, taskIndex?:any){
    console.log('task ', data)
    console.log(this.tasks)
    if(this.successfullyDeleted = taskId){ // Do not update after navigation if task has been deleted
      return // Something weird happening at ngOnDestroy while pausing pomodoro
    }
    if(data?.singleCycle === 4){
      data.isCompleteCycle = true
    }
    // if((data?.totalCycles % 4) !== 0){
    //   data.isCompleteCycle = false
    // }
    return this.tasksService.updateTasks(taskId, data).subscribe(res=>{
      console.log(res)
    this.updateUI(taskId, res, taskIndex)
      // if((res?.pomodoros%4 )=== 0)
      this.getTaskById(taskId)

    })
  }
  // updateUI(taskId:any, data: {timeLeft:any, pomodoros:any, totalCycles:any, isCompleteCycle:any, singleCycle: any}, taskIndex?:any){
  updateUI(taskId:any, data:any, taskIndex?:any){
    this.tasks = this.tasks.map((element:any, index:any) => {
      console.log('taskIndex: ' + taskIndex,  'index: ' + element._id)
      data.pomodoros = Math.trunc(data?.totalCycles/4)
      // data.isCompleteCycle = true
        if(element._id === data?._id) {

          // element.timeLeft = data?.timeLeft
          // element.pomodoros = data?.pomodoros
          // element.totalCycles = data?.totalCycles
          // element.singleCycle = data?.singleCycle
          // if(data?.singleCycle === 4){
          //   console.log('isCompleteCycle')
          //   element.isCompleteCycle = true
          // }
          element = data
          console.log("Elem: ", element, ' - ', 'data: ', data)
          // if((data.totalCycles % 4) !== 0){
          //   element.isCompleteCycle = false
          // }
          if(element.isCompleteCycle){
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

  deleteTask(id: string){
    this.tasksService.deleteTask(id).subscribe(res=> {
      this.successfullyDeleted = id
      console.log("Successfully deleted ", id)
      console.log(res)
      this.tasks = this.tasks.filter((task:any) => task._id !== id)
      console.log(this.tasks)
      this.router.navigate(['tasks', 'all'])
    })
  }
  deleteAllTasks(){
    this.tasksService.deleteAllTasks().subscribe(res=>{
      console.log("All Tasks Deleted ",res)
    })
  }
}
