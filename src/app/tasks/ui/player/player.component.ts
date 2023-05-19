import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

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
  constructor() { }

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
