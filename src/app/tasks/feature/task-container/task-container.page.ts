import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TasksStoreService } from '../../data-access/tasks-store.service';
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/shared/feature/footer/footer.component';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.page.html',
  styleUrls: ['./task-container.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, FooterComponent]
})
export class TaskContainerPage implements OnInit {

  constructor(private tasksStoreService: TasksStoreService) { }

  ngOnInit() {
    // this.tasksStoreService.getAllTasks()
  }

}
