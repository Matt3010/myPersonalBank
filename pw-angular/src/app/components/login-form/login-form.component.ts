import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { interval, takeWhile } from 'rxjs';
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
  @Input() loginErrors : any | null = null

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.startTimer()
  }

  startTimer() {

    setTimeout(()=>{
      this.toastr.info("reset in 20s", "My personal Bank")
    }, 10000)

    setTimeout(()=>{
      this.toastr.info("reset in 10s", "My personal Bank")
    }, 20000)

    interval(30000).pipe(
      takeWhile(() => true)
    ).subscribe(() => {
      this.loginForm.reset()
      this.toastr.warning("Page has been resetted for inactivity", "My personal Bank")
    });
}

  loginForm = this.fb.group({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  })

   emitLogin() {

    this.emailError = null;
    this.passwordError = null;
    this.loginErrors = null

    if (this.loginForm.valid) {
      let loginPayload: Login = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!
      };
      this.loginEmit.emit(loginPayload);
    } else {
      this.emailError = this.loginForm.get('email')?.hasError('required') ? 'Field is required' : null;
      this.passwordError = this.loginForm.get('password')?.hasError('required') ? 'Field is required' : null;
    }
  }
}


//NOTE -
// Validazione form in entrata dalla api
