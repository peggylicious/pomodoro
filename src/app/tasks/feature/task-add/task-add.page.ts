import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, FormGroup, ReactiveFormsModule, FormControl, FormGroupDirective } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TasksService } from '../../data-access/tasks.service';
import { TasksStoreService } from '../../data-access/tasks-store.service';
import { TaskFormComponent } from '../../ui/task-form/task-form.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.page.html',
  styleUrls: ['./task-add.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, TaskFormComponent]
})
export class TaskAddPage implements OnInit {
  formType: string = 'Create Task';

  constructor( private fb: FormBuilder, private tasksStoreService: TasksStoreService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.data.subscribe((res) => {
    //   console.log(res)
    //   console.log(res['taskxx'])
    // })
  }
  submitTasks(formData:any){
    console.log(formData)
    this.tasksStoreService.createTask(formData.value)
  }
}
