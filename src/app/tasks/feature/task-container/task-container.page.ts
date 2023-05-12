import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.page.html',
  styleUrls: ['./task-container.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TaskContainerPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
