import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest, concat, filter, map, merge, pipe, tap, withLatestFrom } from 'rxjs';
import { TasksService } from './tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/interfaces/task.interface';
import { ModalController } from '@ionic/angular';
import { DeleteModalComponent } from 'src/app/shared/feature/delete-modal/delete-modal.component';
import { CelebrationsComponent } from '../ui/celebrations/celebrations.component';

@Injectable({
  providedIn: 'root'
})
export class TasksStoreService {
  // tasks$ = new Subject()
  private readonly _tasks = new BehaviorSubject<any>('')
  // readonly $tasks: Observable<Task[]> = this._tasks.asObservable();
  private $tasks = new BehaviorSubject<Task[]>([]);
  private newTask$ = new BehaviorSubject<Task[]>([])
  // private allTasks$: Observable<Task[]> = this.$tasks.pipe(withLatestFrom(this.newTask$), map(([first, second]) => {
  //   return first.concat(second)
  // }))
  // // private todaysTasks$: Observable<Task[]> = this.allTasks$.pipe(map(res=>res.filter((task: Task) => new Date(task?.date).toISOString().split('T')[0] ===  new Date().toISOString().split('T')[0])))
  // private todaysTasksComplete$: Observable<Task[]> = this.todaysTasks$.pipe(map(res=>res.filter((task: Task) => task.isCompletePomodoros)))

  // readonly upcomingEvents$ = this.events$.pipe(map(res=> res.filter(event => new Date(event.time).getTime()  > new Date().getTime())))
  onShowPlayBtn: BehaviorSubject<boolean> = new BehaviorSubject(true);
  onShowPauseBtn: BehaviorSubject<any> = new BehaviorSubject({});
  onPlayPomodoroOnNav: Subject<boolean> = new Subject();
  playOnInit_: BehaviorSubject<boolean> = new BehaviorSubject(false)
  showModal: BehaviorSubject<boolean> = new BehaviorSubject(false)
  selectedTask: any;
  selectedTask$ = new BehaviorSubject<Task[]>([])
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

  constructor(private tasksService: TasksService, private router: Router, private route: ActivatedRoute, private modalCtrl: ModalController) { }

  getTasks(){
    this.tasksService.getAllTask().subscribe(res=> this.tasks = res)
  }
  getTimeOffset(){
    let today:any = new Date()
    let timeOset = today.getTimezoneOffset() * 60 * 1000
    let localTime:any = today-timeOset
    localTime = new Date(localTime)
    let isoTime = localTime.toISOString()
    // console.log(isoTime)
    return isoTime
  }
  getAllTasksFromRemote(): Observable<Task[]>{
    return this.tasksService.getAllTask().pipe(map(tasks => {
      this.tasks = tasks
      this.$tasks.next(tasks)
      return tasks
    }))
    // .subscribe(tasks => {
    //   this.tasks = tasks
    //   this.$tasks.next(tasks)
    //   // console.log(tasks)
    // })
  }
  getAllTasks(): Observable<Task[]>{
    return this.$tasks.pipe(withLatestFrom(this.newTask$), map(([first, second]) => {
      return first.concat(second)
    }))
  }
  getTodaysTasks(): Observable<Task[]>{
    return this.getAllTasks().pipe(map(res=>res.filter((task: Task) => new Date(task?.date).toISOString().split('T')[0] ===  this.getTimeOffset().split('T')[0])))
  }
  getTodaysCompletedTasks():  Observable<Task[]>{
    return this.getTodaysTasks().pipe(map(res=>res.filter((task: Task) => task.isCompletePomodoros)))
  }
  getSelectedTaskbyId(id: string){
    console.log("outside map")

   return  this.getAllTasks().pipe(map(res => {
    console.log("in map")
      return res.filter(task => task._id === id)
    }))
  }
  getTaskById(id:string){
    // console.log(id)
    if(this.tasks.length === 0){
      return this.tasksService.getAllTask().subscribe(res=> {
        this.tasks = res
        this.selectedTask = this.tasks.filter((res:any) => id === res._id)
        console.log("On refresh ",this.selectedTask)
        // this.selectedTask$.next(res)
      return this.selectedTask

      })
    }else{
      return this.selectedTask = this.tasks.filter((res:any, index:any) => {
        this.selectedIndex = index
        // console.log("Selected Index ", id)
        if(id === res._id){
          // this.selectedTask$.next(res)
          return res
        }
      })
    }
  }

  populateTasks():Observable<Task[]>{
    // return this.getAllTasksFromRemote()
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
  updateTasks(taskId:any, data: Task, taskIndex?:any, action?: string){
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
    return this.tasksService.updateTasks(taskId, data).subscribe(res=>{
      this.playOnInit_.next(false)
      console.log(res)
      this.updateUI(taskId, res, taskIndex, action)
      this.getTaskById(taskId)
    })
  }

  // updateUI(taskId:any, data: {timeLeft:any, pomodoros:any, totalCycles:any, isCompleteCycle:any, singleCycle: any}, taskIndex?:any){
  updateUI(taskId:any, data:any, taskIndex?:any, action?: string){
    this.tasks = this.tasks.map((element:any, index:any) => {
      data.pomodoros = Math.trunc(data?.totalCycles/4)
      if(element._id === data?._id) {
        element = data
        // console.log("Elem: ", element, ' - ', 'data: ', data)
        if(element.isCompleteCycle && action !== 'delete'){
          this.showModal.next(true)
          this.openCelebrationsModal(this.selectedTask)
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

  // openDeleteModal(){
    async openModal(task: Task[]) {
      console.log(task)
      const modal = await this.modalCtrl.create({
        component: DeleteModalComponent,
        componentProps: {selectedTask: task},
        id: 'delete'
      });
      modal.present();

      const { data, role } = await modal.onWillDismiss();
      console.log(data)
      if (role === 'confirm') {
        console.log("confirm delete")
        this.deleteTask(task[0]._id)
        // this.message = `Hello, ${data}!`;
      }
    }
  // }

  async openCelebrationsModal(task: Task[]) {
    console.log(task)
    const modal = await this.modalCtrl.create({
      component: CelebrationsComponent,
      componentProps: {selectedTask: task},
      id: 'celebrations'
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    console.log(data)
    if (role === 'confirm') {
      console.log("confirm delete")
      // this.deleteTask(task[0]._id)
      // this.message = `Hello, ${data}!`;
    }
  }
}
