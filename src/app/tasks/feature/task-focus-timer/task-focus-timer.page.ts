import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { PlayerComponent } from '../../ui/player/player.component';
import { TasksStoreService } from '../../data-access/tasks-store.service';
import { Observable, Subject, filter, map, of, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-task-focus-timer',
  templateUrl: './task-focus-timer.page.html',
  styleUrls: ['./task-focus-timer.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, PlayerComponent]
})
export class TaskFocusTimerPage implements OnInit, OnDestroy {
  task:any;
  taskResolved:any = this.tasksStoreService.$tasks
  timeRemaining$!:Observable<number>;
  timeR: Subject<any> = new Subject();
  // allotedTime: number = 25 * 60 *1000;
  timeRemaining:any = 20;
  pauseTime: number = 20; // Start time
  selectedTask:any;
  selectedIndex = undefined;
  displayTime:boolean = true;
  tempDate: DatePipe = new DatePipe('en-US')
   constructor(private router: Router, private route: ActivatedRoute, private tasksStoreService: TasksStoreService, @Inject(LOCALE_ID) private locale: string) {
    // this.tempDate.transform(new Date(), 'dd MMMM')
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // this.previousUrl = this.currentUrl;
        // this.currentUrl = event.url;
        console.log("Navigation ended")
      };
    });
   }

  ngOnInit() {

    this.route.data.subscribe((res1) => {
      this.route.params.subscribe(res=>{
        this.getTaskById(res['id'])
      })
    })

    if(this.tasksStoreService.playOnInit_.getValue()){
      this.playPomodoro(this.selectedTask?.[0]?.timeLeft, this.selectedTask[0])
    }

  }

  getTaskById(id:string){
    console.log(this.tasksStoreService.getTaskById(id))
    this.selectedTask = this.tasksStoreService?.selectedTask
    console.log("selected task ",this.selectedTask)
    if(this.selectedTask?.[0]?.timeLeft === 0){
      this.displayTime = true
      console.log("isTrue")
     }else{
      this.displayTime = false
      console.log("isFalse")
     }
  }

  playPomodoro(playTime:number, task?:any){
    this.displayTime = false
    console.log(task)
    this.tasksStoreService.showPlayBtn(false)
    this.selectedTask = this.tasksStoreService?.selectedTask
    // this.selectedTask = task.task;
    this.selectedIndex = this.selectedTask[0]._id
    // this.isPlay = true
    if(this.selectedTask[0].timeLeft === 0){
      playTime = 20
    }
    if(this.selectedTask[0].timeLeft > 0){
      playTime = this.selectedTask[0].timeLeft
    }
    // console.log("Play ", this.pauseTime)
    this.timeRemaining$ = timer(0, 1000).pipe( // 5mins = 20, 25mins = 15540
      map(n => {
        console.log(n)
        if((playTime - n) === -1){
          this.pauseTime = 0;
          this.timeR.next('completed')
          this.selectedTask[0].isComplete = true
          this.selectedTask[0].timeLeft = 0
          this.selectedTask[0].pomodoros +=1
          this.tasksStoreService.updateTasks(this.selectedTask[0]._id, this.selectedTask[0],   this.selectedIndex)
          this.tasksStoreService.showPlayBtn(true)
        }
        this.pauseTime = playTime - n;
        return (playTime - n) * 1000
      }),
      takeUntil(this.timeR),
    );
    // this.timeRemaining$.subscribe(x=> x)
  }
  pausePomodoro(){
    console.log("Pause,", this.pauseTime)
    this.tasksStoreService.showPlayBtn(true)
    this.selectedTask[0].isComplete = false
    this.timeR.next(this.pauseTime)
    this.selectedTask[0].timeLeft = this.pauseTime
    this.tasksStoreService.updateTasks(this.selectedTask[0]._id, this.selectedTask[0],   this.selectedIndex)
    // this.tasksStoreService.updateTasks(this.selectedTask[0]._id, {timeLeft: this.pauseTime},   this.selectedIndex)
    console.log("index: ", this.selectedTask[0].index,)

  }
  stopPomodoro(){
    console.log("Stop")
    this.timeRemaining$ = of(0)
    this.timeR.next(0)
    this.pauseTime = 20
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.pausePomodoro()
  }
}
