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
export class LoginFormComponent implements OnInit {


  emailError: string | null = null;
  passwordError: string | null = null;

  @Output() loginEmit = new EventEmitter<Login>()
  countdown: number = 30;
  constructor(private _snackBar: MatSnackBar, private fb: FormBuilder, private route: Router) {
  }

 ngOnInit(): void {
  this.startCountdown(); // Start the initial countdown
}

startCountdown() {
  const countdownInterval = setInterval(() => {
    if (this.countdown > 0) {
      this.countdown--;
    } else {
      clearInterval(countdownInterval); // Stop the interval when the countdown reaches 0
      this.resetForm();
      this.startCountdown(); // Start the countdown again after resetting the form
    }
  }, 1000); // Every 1 second
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

  goToRegistration() {
    this.route.navigateByUrl("registration")
  }

  resetForm() {
    // Resetta il form
    this.loginForm.reset();
    this.countdown = 30; // Ripristina il countdown a 30 secondi
  }


}


//NOTE -
// Validazione form in entrata dalla api
