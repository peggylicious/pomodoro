import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  baseUrl: string = "http://localhost:3000/"
  constructor( private http: HttpClient) { }

  getPost(){
    return this.http.get(`${this.baseUrl}posts`)
  }
}
