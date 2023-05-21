import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlayerComponent } from '../../ui/player/player.component';
import { TasksStoreService } from '../../data-access/tasks-store.service';
import { Observable, Subject, map, of, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-task-focus-timer',
  templateUrl: './task-focus-timer.page.html',
  styleUrls: ['./task-focus-timer.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, PlayerComponent]
})
export class TaskFocusTimerPage implements OnInit {
  task:any;
  taskResolved:any = this.tasksStoreService.$tasks
  timeRemaining$!:Observable<number>;
  timeR: Subject<any> = new Subject();
  allotedTime: number = 25 * 60 *1000;
  timeRemaining:any = 300;
  pauseTime: number = 300; // Start time
  selectedTask:any;
  selectedIndex = undefined;
   constructor(private router: Router, private route: ActivatedRoute, private tasksStoreService: TasksStoreService, @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {

    this.route.data.subscribe((res1) => {
      console.log(res1)
      console.log(res1['taskxx'])
      this.route.params.subscribe(res=>{
        this.getTaskById(res['id'])
      })
    })
    // console.log(this.route.snapshot.params['id'])
    // console.log(this.tasksStoreService.getTaskById(this.route.snapshot.params['id']))
  }
  getTaskById(id:string){
    console.log(this.tasksStoreService.getTaskById(id))
    // this.selectedTask = this.tasksStoreService?.selectedTask
    // setTimeout(()=>{
      this.selectedTask = this.tasksStoreService?.selectedTask
      console.log("selected task ",this.selectedTask)
    // }, 5000)
    // console.log("selected task ",this.selectedTask)
  }

  playPomodoro(playTime:number, task?:any){
    console.log(task)
    this.selectedTask = this.tasksStoreService?.selectedTask
    // this.selectedTask = task.task;
    this.selectedIndex = this.selectedTask[0]._id
    // this.isPlay = true
    if(this.selectedTask[0].timeLeft === 0){
      playTime = 300
    }
    if(this.selectedTask[0].timeLeft > 0){
      playTime = this.selectedTask[0].timeLeft
    }
    console.log("Play ", this.pauseTime)
    this.timeRemaining$ = timer(1, 1000).pipe( // 5mins = 300, 25mins = 15540
      map(n => {
        console.log(n)
        // this.pauseTime = playTime - n;
        // let newVal = (playTime - n) * 1000
        if((playTime - n) === -1){
          this.pauseTime = 0;
          this.timeR.next('completed')
          this.selectedTask[0].isComplete = true
          this.selectedTask[0].timeLeft = 0
          this.selectedTask[0].pomodoros +=1
          this.tasksStoreService.updateTasks(this.selectedTask[0]._id, this.selectedTask[0],   this.selectedIndex)
        }
        this.pauseTime = playTime - n;
        return (playTime - n) * 1000
      }),
      takeUntil(this.timeR),
    );
    this.timeRemaining$.subscribe(x=> x)
  }
  pausePomodoro(){
    console.log("Pause,", this.pauseTime)
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
    this.pauseTime = 300
  }
}
