import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../data-access/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule]

})
export class AuthFormComponent  implements OnInit {
  @Input() buttonTitle: string = "";

  @Output() onAuth:EventEmitter<any> = new EventEmitter();
  authForm = this.fb.group({
    email: [''],
    password: ['']
  })
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {}
  onSubmitAuthForm(){
    this.onAuth.emit(this.authForm.value)
  }

}
