import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authSrv: AuthService, private route: Router){
  }

  loginErrors: any | null = null

  doLogin(loginPayload: Login){
    this.authSrv.login(loginPayload).subscribe(
      (res)=>{
          //TODO - Service popup loggato
          this.route.navigateByUrl("/home")
        },
      (err)=>{
        console.log(err)
          this.loginErrors = err
      }
    )
  }
}
