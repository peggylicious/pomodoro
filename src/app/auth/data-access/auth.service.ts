import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:3000/'
  constructor(private http: HttpClient) { }

  registerUser(data:unknown){
    return this.http.post(`${this.baseUrl}user/signup`, data)
  }
  loginUser(data:unknown){
    return this.http.post(`${this.baseUrl}user/login`, data)
  }
}
