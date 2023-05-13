import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSuccess } from 'src/app/interfaces/user.interface.';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:3000/'
  constructor(private http: HttpClient) { }

  registerUser(data:unknown){
    return this.http.post(`${this.baseUrl}user/signup`, data)
  }
  loginUser(data:any): Observable<UserSuccess>{
    return this.http.post<UserSuccess>(`${this.baseUrl}user/login`, data)
  }
}
