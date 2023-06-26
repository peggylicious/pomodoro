import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../data-access/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule]

})
export class AuthFormComponent  implements OnInit {
  @Input() buttonTitle: string = "";
  @Input() formTitle: string = "";
  @Input() wrongEntry: boolean = false;

  @Output() onAuth:EventEmitter<any> = new EventEmitter();
  emailPattern: string = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$';
  passwordPattern: string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{0,}$';
  authForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: ['',  {validators: [Validators.required, Validators.email], updateOn: 'blur'}],
    // email: ['',  {validators: [Validators.required, Validators.email,Validators.pattern(this.emailPattern)]}],
    password: ['', ],
    // password: ['', {updateOn: 'blur'}]
    // password: ['', {validators: [Validators.required, Validators.minLength(8),Validators.pattern(this.passwordPattern)], updateOn: 'blur'}]
  },
  // {
  //   updateOn: 'blur',
  //   validators: []
  // }
  )
  iconColor: string = '#A0A0A0';
  filledEmail: boolean = false;
  filledPassword: boolean = false;
  filledFirstName: boolean = false;
  filledLastName: boolean = false;
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.iconColor = '#A0A0A0'
  }
  onSubmitAuthForm(){
    // console.log(this.authForm)
    this.onAuth.emit(this.authForm.value)
  }
  // onChangeInput(){
  //   console.log(this.authForm)
  //   if(this.authForm.value['email']?.length){
  //     this.filledEmail = true
  //   }else{
  //     this.filledEmail = false
  //   }
  // }
  get firstNameError() {
    if(this.authForm.value['firstName']?.length){
      this.filledFirstName = true
    }else{
      this.filledFirstName = false
    }
    return
  }
  get lastNameError() {
    if(this.authForm.value['lastName']?.length){
      this.filledLastName = true
    }else{
      this.filledLastName = false
    }
    return
  }
  get emailError() {
    if(this.authForm.value['email']?.length){
      this.filledEmail = true
    }else{
      this.filledEmail = false
    }
    if(this.authForm.get('email')?.errors?.['email']){
      return "You have entered an invalid email"
    }
    return

  }
  get passwordError() {
    if(this.authForm.value['password']?.length){
      this.filledPassword = true
    }else{
      this.filledPassword = false
    }
    if(this.formTitle === 'register'){
      // Dynamically set validators

      this.authForm.controls['password'].setValidators([Validators.required, Validators.minLength(8),Validators.pattern(this.passwordPattern)]);
      this.authForm.controls['password'].updateValueAndValidity();
      console.log(this.authForm.get('password'))
      if(this.authForm.get('password')?.errors?.['pattern']){
        // return error if password field does not match pattern
        // console.log(this.authForm)
      // console.log(this.authForm.get('password'))

        return "Password must include at least, 1 uppercase letter and 1 special character"
      }
      if(this.authForm.get('password')?.errors?.['minLength']){
        // return error if password field does not match pattern
        return "Password must be at least 8 characters"
      }
    }else{
      this.authForm.controls['password'].clearValidators(); // Remove validator for login password field
      this.authForm.controls['password'].updateValueAndValidity();
    }


    return

  }
}
