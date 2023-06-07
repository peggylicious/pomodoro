import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Task } from 'src/app/interfaces/task.interface';
import { TasksStoreService } from 'src/app/tasks/data-access/tasks-store.service';

@Component({
  selector: 'app-circular-progress',
  templateUrl: './circular-progress.component.html',
  styleUrls: ['./circular-progress.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class CircularProgressComponent  implements OnInit {
  todaysTasksComplete$:Observable<Task[]> = this.tasksStoreService.todaysTasksComplete$
  todaysTasks$1:Observable<Task[]> = this.tasksStoreService.todaysTasks$

  constructor(private tasksStoreService: TasksStoreService) { }

  ngOnInit() {}

}
