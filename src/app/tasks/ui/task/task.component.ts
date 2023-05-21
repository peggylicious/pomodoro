import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TasksStoreService } from '../../data-access/tasks-store.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class TaskComponent  implements OnInit {
  @Output() onPlay: EventEmitter<any> = new EventEmitter();
  @Output() onPause: EventEmitter<any> = new EventEmitter();

  @Input() taskResolved:any[] | null = [];
  @Input() task: any;
  @Input() index: any;

  selectedIndex = undefined;
  showPlay:Observable<any> = this.tasksStoreService.onShowPlayBtn.asObservable()
  showPause:Observable<any> = this.tasksStoreService.onShowPauseBtn.asObservable()

  constructor(private tasksStoreService: TasksStoreService) { }



  ngOnInit() {
    this.tasksStoreService.showPlayBtn(true, undefined)
    console.log("index: ", this.index, "selectedIndex: ", this.selectedIndex)
    this.tasksStoreService.onShowPlayBtn.subscribe(res=> console.log(res))
  }
  playPomodoro(task:any, index: any){
    this.selectedIndex = index;
    this.onPlay.emit({task, index})
    this.tasksStoreService.showPauseBtn(true, this.selectedIndex)
    this.tasksStoreService.showPlayBtn(false, this.selectedIndex)
    console.log( "index: ", index, "selectedIndex: ", this.selectedIndex)
  }
  pausePomodoro(task:any, index: any){
    this.selectedIndex = index
    this.onPause.emit(task)
    this.tasksStoreService.showPlayBtn(true, this.selectedIndex)
    this.tasksStoreService.showPauseBtn(false, this.selectedIndex)

  }

  // If user presses play, display pause button by indext
}
