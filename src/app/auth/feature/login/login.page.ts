import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../data-access/auth.service';
import { AuthFormComponent } from '../../ui/auth-form/auth-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, AuthFormComponent]
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit() {
  }
  loginUser(event:any){
    this.authService.loginUser(event).subscribe(res=>{
      console.log(res)
      localStorage.setItem('access_token', res.token)
      localStorage.setItem('userId', res.loggedUserId)
      this.router.navigate(['tasks', 'all'])
    })
  }
}
