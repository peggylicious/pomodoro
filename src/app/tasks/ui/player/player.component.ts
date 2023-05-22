import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TasksStoreService } from '../../data-access/tasks-store.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class PlayerComponent  implements OnInit {

  @Input() selectedTask: any;
  @Output() onPlayPomodoro = new EventEmitter()
  @Output() onPausePomodoro = new EventEmitter()
  @Output() onStopPomodoro = new EventEmitter()

  showPlayBtn$ = this.tasksStoreService.onShowPlayBtn

  constructor(private tasksStoreService: TasksStoreService) { }
  ngOnInit() {}
  play(){
    this.onPlayPomodoro.emit()
  }
  pause(){
    this.onPausePomodoro.emit()
  }
  stop(){
    this.onStopPomodoro.emit()
  }
}
