import { Component, Inject, Input, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
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
  currentRoute: any;
  constructor(private router: Router, private route: ActivatedRoute, private tasksStoreService: TasksStoreService, @Inject(LOCALE_ID) private locale: string) {}
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
  }
  pausePomodoro(){
    this.timeR.next(this.pauseTime)
    this.tasksStoreService.updateTasks(this.selectedTask._id, {timeLeft: this.pauseTime, totalCycles: this.selectedTask.totalCycles, singleCycle: this.selectedTask.singleCycle, pomodoros: this.selectedTask.pomodoros, isComplete: this.selectedTask.pomodoro})
  }
  stopPomodoro(){
    console.log("Stop")
    this.timeRemaining$ = of(0)
    this.timeR.next(0)
    this.pauseTime = 300
  }
  deleteTask(){
    this.tasksStoreService.deleteAllTasks()
  }
  ngOnDestroy(): void {
    this.timeR.next(this.pauseTime)
  }
}
