import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class TaskContainerComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
