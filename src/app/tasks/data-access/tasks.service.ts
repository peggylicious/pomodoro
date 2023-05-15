import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  baseUrl: string = "http://localhost:3000/task/"
  constructor( private http: HttpClient) { }

  getAllTask(){
    return this.http.get(`${this.baseUrl}all`)
  }

  createTask(data:any){
    return this.http.post(`${this.baseUrl}create`, data)
  }
  // getPostLocalStorage(){

  // }

  // createTaskLocalStorage(data){

  // }
}
