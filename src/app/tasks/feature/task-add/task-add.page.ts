import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TasksService } from '../../data-access/tasks.service';
import { TasksStoreService } from '../../data-access/tasks-store.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.page.html',
  styleUrls: ['./task-add.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class TaskAddPage implements OnInit {
  taskForm = this.fb.group({
    title: [''],
    description: ['']
  })
  constructor( private fb: FormBuilder, private tasksStoreService: TasksStoreService) { }

  ngOnInit() {
  }
  submitTasks(){
    console.log(this.taskForm.value)
    this.tasksStoreService.createTask(this.taskForm.value)
  }
}
