import { Component } from '@angular/core';
import { Login } from 'src/app/interfaces/login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authSrv: AuthService){
  }

  loginErrors: any | null = null

  doLogin(loginPayload: Login){
    this.authSrv.login(loginPayload).subscribe(
      (res)=>{
          //TODO - 
          //Loggato correttamente
          // Service popup loggato
          // Redirect alla home (Ricordarsi il guard // capisco come funziona il fetchUser)
      },
      (err)=>{
        console.log(err)
          this.loginErrors = err
      }
    )
  }
}
