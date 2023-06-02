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

  selectedDate:any;
  currentTime: any = new Date();
  taskCategories = [
    {title: 'programming', color: '#00A9F1'},
    {title: 'reading', color: '#FF5726'},
    {title: 'music', color: '#FFC02D'},
    {title: 'exercise', color: '#8BC255'},
    {title: 'meditation', color: '#F54336'},
    {title: 'maintenance', color: '#1F222A'},
    {title: 'relax', color: '#CDDC4C'},
    {title: 'others', color: '#1F222A'},
  ]
  taskForm = this.fb.group({
    created_by: localStorage.getItem('userId'),
    title: [''],
    description: [''],
    date: [],
    status: [''],
    pomodoros: [0],
    totalCycles: [0],
    singleCycle: [0],
    category: [''],
    isCompleteCycle: false,
    selectedPomodoros: [0],
    isCompletePomodoros: false
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // this.taskForm.value.date = this.currentTime
    this.changeDate(new Date())
  }
  submit(){
    this.taskForm.value.date = this.selectedDate
    console.log(this.taskForm)
    this.onSubmitTask.emit(this.taskForm)
  }
  changeDate(d:any){
    console.log(this.taskForm)
    console.log(d)
    this.selectedDate = d
  }
}
