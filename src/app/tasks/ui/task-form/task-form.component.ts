import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class TaskFormComponent  implements OnInit {
  @Input() formType:string = '';
  @Output() onSubmitTask:EventEmitter<FormGroup> = new EventEmitter();
  taskCategories = [
    {title: 'programming', color: '#00A9F1'},
    {title: 'reading', color: '#FF5726'},
    {title: 'music', color: '#FFC02D'},
    {title: 'exercise', color: '#8BC255'},
    {title: 'meditation', color: '#F54336'},
    {title: 'others', color: '#607D8A'},
  ]
  taskForm = this.fb.group({
    created_by: localStorage.getItem('userId'),
    title: [''],
    description: [''],
    status: [''],
    pomodoros: [0],
    totalCycles: [0],
    singleCycle: [0],
    category: [''],
    isComplete: false
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit() {}
  submit(){
    this.onSubmitTask.emit(this.taskForm)
  }
}
