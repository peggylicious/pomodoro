import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from 'src/app/interfaces/task.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  // baseUrl: string = "http://localhost:3000/task/"
  // baseUrl = 'http://192.168.0.162:3000/task/'
  baseUrl = 'https://pomodoro-dev.onrender.com/task/'

  constructor( private http: HttpClient) { }

  getAllTask(): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.baseUrl}all`)
  }

  createTask(data:any): Observable<Task>{
    return this.http.post<Task>(`${this.baseUrl}create`, data)
  }
  updateTasks(taskId:any, data: any): Observable<Task>{
    console.log('Updating...')
    return this.http.put<Task>(`${this.baseUrl}update/${taskId}`, data)
  }
  deleteTask(id: string){
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`)
  }
  deleteAllTasks(){
    return this.http.delete(`${this.baseUrl}delete/all`)
  }
  // getPostLocalStorage(){

  // }

  // createTaskLocalStorage(data){

  // }
}
