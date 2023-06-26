import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  imports: [IonicModule, CommonModule, FormsModule, TaskComponent, CircularProgressComponent, RouterModule]
})
export class TaskHomePage implements OnInit {
  todaysTasks$1:Observable<Task[]> = this.tasksStoreService.getTodaysTasks()
  todaysTasksComplete$:Observable<Task[]> = this.tasksStoreService.getTodaysCompletedTasks()
  todaysTasks: Task[] = [];
  period: string = ''
  username: string|null = localStorage.getItem('username')
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
    this.getTimeOfDay()
  }

  getTimeOfDay(){
    let today = new Date()
    let time = today.getHours()
    console.log(time)
    if(time < 12){
      this.period = 'morning';
      return 'morning'
    }else if (time < 16){
      this.period = 'afternoon'
      return 'afternoon'
    }else{
      this.period = 'evening'
      return 'evening'
    }
  }
}
