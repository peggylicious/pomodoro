import { Component, Inject, Input, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksStoreService } from '../../data-access/tasks-store.service';
import { PlayerComponent } from '../../ui/player/player.component';
import { Observable, Subject, Subscription, interval, map, of, takeUntil, takeWhile, timer } from 'rxjs';
import { TaskComponent } from '../../ui/task/task.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, PlayerComponent, TaskComponent]
})
export class TaskListPage implements OnInit, OnDestroy {
  taskResolved:any = this.tasksStoreService.$tasks
  timeRemaining$!:Observable<number>;
  timeR: Subject<any> = new Subject();
  allotedTime: number = 25 * 60 *1000;
  timeRemaining:any = 300;
  pauseTime: number = 300; // Start time
  selectedTask:any;
  selectedIndex = undefined;
  // hidePlayButton: boolean = false;
  // isPlay: boolean = true;
  constructor(private router: Router, private route: ActivatedRoute, private tasksStoreService: TasksStoreService, @Inject(LOCALE_ID) private locale: string) { }
  ngOnInit() {
    this.route.data.subscribe((res) => {
      console.log(res)
      console.log(res['taskxx'])
    })

  }
  open(){
    this.router.navigateByUrl('/tasks/add')
  }

  playPomodoro(playTime:number, task?:any){
    // console.log(task)
    // this.selectedTask = task.task;
    // this.selectedIndex = task.index
    // this.isPlay = true
    // console.log("Play ", this.pauseTime)
    // this.timeRemaining$ = timer(0, 1000).pipe( // 5mins = 300, 25mins = 15540
    // map(n => {
    //   console.log(n)
    //   if((playTime - n) === 1){
    //     this.pauseTime = 0;
    //     this.timeR.next('completed')
    //   }
    //   this.pauseTime = playTime - n-1;
    //   return (playTime - n) * 1000
    // }),
    // takeUntil(this.timeR),
  // );
  }
  pausePomodoro(){
    console.log("Pause,", this.pauseTime)
    this.timeR.next(this.pauseTime)
    // this.isPlay = true
    this.tasksStoreService.updateTasks(this.selectedTask._id, {timeLeft: this.pauseTime, pomodoros: this.selectedTask.pomodoros})
    // .subscribe(res=>{
    //   console.log(res)
    // this.tasksStoreService.showPlayBtn(true, this.selectedIndex)
    // // this.isPlay = true
    //   // console.log(this.tasksStoreService.showPlayBtn.getValue())
    // })
    console.log("index: ", this.selectedTask.index,)

  }
  stopPomodoro(){
    console.log("Stop")
    this.timeRemaining$ = of(0)
    this.timeR.next(0)
    this.pauseTime = 300
  }
  ngOnDestroy(): void {
    this.timeR.next(this.pauseTime)
  }
}
