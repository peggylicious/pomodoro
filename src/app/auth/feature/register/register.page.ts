import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthFormComponent } from '../../ui/auth-form/auth-form.component';
import { AuthService } from '../../data-access/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, AuthFormComponent, RouterModule]
})
export class RegisterPage implements OnInit {
  formTitle: string = 'register'
  constructor(private authService: AuthService) { }

  ngOnInit() {}
  registerUser(event:any){
    this.authService.registerUser(event).subscribe(res=>console.log(res))
  }

}
