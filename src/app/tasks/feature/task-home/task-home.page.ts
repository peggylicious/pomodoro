import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksStoreService } from '../../data-access/tasks-store.service';
import { CircularProgressComponent } from 'src/app/shared/feature/circular-progress/circular-progress.component';
import { Observable } from 'rxjs';
import { Task } from 'src/app/interfaces/task.interface';
import { TaskComponent } from '../../ui/task/task.component';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.page.html',
  styleUrls: ['./task-home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TaskComponent, CircularProgressComponent]
})
export class TaskHomePage implements OnInit {
  todaysTasks$1:Observable<Task[]> = this.tasksStoreService.todaysTasks$
  todaysTasks: Task[] = [];
  constructor(private router: Router, private route: ActivatedRoute, private tasksStoreService: TasksStoreService) {}

  ngOnInit() {
    this.route.data.subscribe((res) => { // Update route after navigation to get latest change
      console.log(res)
      console.log(res['todaysTasks'])
      this.todaysTasks = res['todaysTasks']
    })
    // this.tasksStoreService.todaysTasks$.subscribe(res=>{
    //   console.log(res)
    // })
  }

}
