import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { interval, take, takeWhile } from 'rxjs';
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

  constructor(private fb: FormBuilder, private toastr: ToastrService, private route: Router) {
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
      this.toastr.info("Reset in 20s", "My personal Bank")
    }, 10000)

    setTimeout(()=>{
      this.toastr.info("Reset in 10s", "My personal Bank")
    }, 20000)

    setTimeout(()=>{
      this.loginForm.reset()
      this.toastr.info("Page resetted", "My personal Bank")    },
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
    this.toastr.clear()
    this.route.navigateByUrl("registration")
  }
}


//NOTE -
// Validazione form in entrata dalla api
