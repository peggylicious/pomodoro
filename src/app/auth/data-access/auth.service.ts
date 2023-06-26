import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSuccess } from 'src/app/interfaces/user.interface.';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // baseUrl = 'http://192.168.0.162:3000/'
  // baseUrl: string = "http://localhost:3000/"
  baseUrl = 'https://pomodoro-dev.onrender.com/'
  constructor(private http: HttpClient) { }

  registerUser(data:unknown){
    return this.http.post(`${this.baseUrl}user/signup`, data)
  }
  loginUser(data:any): Observable<UserSuccess>{
    return this.http.post<UserSuccess>(`${this.baseUrl}user/login`, data)
  }
  //
}
