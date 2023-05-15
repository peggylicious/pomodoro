import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksStoreService } from '../../data-access/tasks-store.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TaskListPage implements OnInit {
  taskResolved:any = this.tasksStoreService.$tasks

  constructor(private router: Router, private route: ActivatedRoute, private tasksStoreService: TasksStoreService) { }
  ngOnInit() {
    this.route.data.subscribe((res) => {
      // do something with your resolved data ...
      // this.taskResolved = res
      console.log(res)
      console.log(res['taskxx'])
    })
  }
  open(){
    this.router.navigateByUrl('/tasks/add')
  }
}
