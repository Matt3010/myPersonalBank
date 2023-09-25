import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Login } from 'src/app/interfaces/login';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit{


  emailError: string | null = null;
  passwordError: string | null = null;

  @Output() loginEmit = new EventEmitter<Login>()

  constructor(private _snackBar: MatSnackBar, private fb: FormBuilder, private route: Router) {
  }

ngOnInit(): void {
  this.loginForm.valueChanges.pipe(
    take(1)
  ).subscribe(res => {
    if (res) {
      this.startTimer();
    }
  });
}


  startTimer() {

    setTimeout(()=>{
    this._snackBar.open("Reset in 20s" , "OK");
    }, 10000)

    setTimeout(()=>{
    this._snackBar.open("Reset in 10s", "OK");
    }, 20000)

    setTimeout(()=>{
      this.loginForm.reset()
    this._snackBar.open("Reset", "OK");
    },
       30000)

    setTimeout(()=>{
      window.location.reload()
    },
       35000)
}

  loginForm = this.fb.group({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  })

   emitLogin() {

    this.emailError = null;
    this.passwordError = null;

    if (this.loginForm.valid) {
      let loginPayload: Login = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!
      };
      this.loginEmit.emit(loginPayload);
    } else {
      this.emailError = this.loginForm.get('email')?.hasError('required') ? '*' : null;
      this.passwordError = this.loginForm.get('password')?.hasError('required') ? '*' : null;
    }
  }

  goToRegistration(){
    this.route.navigateByUrl("registration")
  }
}


//NOTE -
// Validazione form in entrata dalla api
