import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest, concat, filter, map, merge, pipe, tap, withLatestFrom } from 'rxjs';
import { TasksService } from './tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksStoreService {
  // tasks$ = new Subject()
  private readonly _tasks = new BehaviorSubject<any>('')
  // readonly $tasks: Observable<Task[]> = this._tasks.asObservable();
  readonly $tasks = new BehaviorSubject<Task[]>([]);
  readonly newTask$ = new BehaviorSubject<Task[]>([])
  readonly allTasks$: Observable<Task[]> = this.$tasks.pipe(withLatestFrom(this.newTask$), map(([first, second]) => {
    return first.concat(second)
  }))
  readonly todaysTasks$: Observable<Task[]> = this.allTasks$.pipe(map(res=>res.filter((task: Task) => new Date(task?.date).toISOString().split('T')[0] ===  new Date().toISOString().split('T')[0])))

  // readonly upcomingEvents$ = this.events$.pipe(map(res=> res.filter(event => new Date(event.time).getTime()  > new Date().getTime())))
  onShowPlayBtn: BehaviorSubject<boolean> = new BehaviorSubject(true);
  onShowPauseBtn: BehaviorSubject<any> = new BehaviorSubject({});
  onPlayPomodoroOnNav: Subject<boolean> = new Subject();
  playOnInit_: BehaviorSubject<boolean> = new BehaviorSubject(false)
  showModal: BehaviorSubject<boolean> = new BehaviorSubject(false)
  selectedTask: any;
  selectedTask$: Subject<Task[]> = new Subject();
  selectedIndex: any;
  successfullyDeleted: any;
  tasks: Task[] = [];
  // get tasks() : Task[] {
  //   return  this._tasks.getValue()
  // }

  // set tasks(v : Task[]) {
  //   // console.log("veee ", v)
  //   this._tasks.next(v)
  // }

  constructor(private tasksService: TasksService, private router: Router, private route: ActivatedRoute) { }
  getTasks(){
    this.tasksService.getAllTask().subscribe(res=> this.tasks = res)
  }
  getAllTasks(){
    this.tasksService.getAllTask()
    .subscribe(tasks => {
      this.tasks = tasks
      this.$tasks.next(tasks)
      // console.log(tasks)
    })
  }
  getTaskById(id:string){
    console.log(id)
    if(this.tasks.length === 0){
      this.tasksService.getAllTask().subscribe(res=> {
        this.tasks = res
        this.selectedTask = this.tasks.filter((res:any) => id === res._id)
        // let filteredTask = this.tasks.filter((res:any) => id === res._id)
        // this.selectedTask$.next(filteredTask)
        console.log("On refresh ",this.selectedTask)
      })
    }else{
      this.selectedTask = this.tasks.filter((res:any, index:any) => {
        this.selectedIndex = index
        console.log("Selected Index ", id)
        if(id === res._id){
          return res
        }
      })

      // this.selectedTask.next(this.tasks.filter((res:any, index:any) => {
      //   this.selectedIndex = index
      //   console.log("Selected Index ", id)
      //   if(id === res._id){
      //     return res
      //   }
      // }))
      // console.log(this.selectedTask)
    }
  }
  populateTasks():Observable<Task[]>{
    // return this.getAllTasks()
    return this.$tasks
  }
  createTask(data:any){
    this.tasksService.createTask(data).subscribe(res=> {
      console.log(res)
      this.tasks = this.tasks.concat([res])
      this.$tasks.next(this.tasks)
      this.router.navigate(['tasks','all'])
    })
  }
  updateTasks(taskId:any, data: Task, taskIndex?:any){
  // updateTasks(taskId:any, data: {timeLeft:any, pomodoros:any, totalCycles:any, singleCycle:any, isCompleteCycle:any, selectedPomodoros:any}, taskIndex?:any){
    console.log('task ', data)
    console.log(this.tasks)
    if(this.successfullyDeleted === taskId){ // Do not update after navigation if task has been deleted
      return // Something weird happening at ngOnDestroy while pausing pomodoro
    }
    if(data?.singleCycle === 4){
      data.isCompleteCycle = true
      data.pomodoros += 1
    }
    console.log("Selected pomodoros ", data.selectedPomodoros, "pomodoros ", data.pomodoros)
    if(data?.pomodoros === data?.selectedPomodoros){
      data.isCompletePomodoros = true
      console.log(data.isCompletePomodoros)
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
      // console.log('taskIndex: ' + taskIndex,  'index: ' + element._id)
      data.pomodoros = Math.trunc(data?.totalCycles/4)
      if(element._id === data?._id) {
        element = data
        console.log("Elem: ", element, ' - ', 'data: ', data)
        if(element.isCompleteCycle){
          this.showModal.next(true)
        }
      }
      return element
    });
    this.$tasks.next(this.tasks)
  }
  showPlayBtn(val:boolean){
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
      this.$tasks.next(this.tasks)
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
