import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authSrv: AuthService, private route: Router, private toastr: ToastrService) {
  }

  loginErrors: any | null = null

  doLogin(loginPayload: Login){
    this.authSrv.login(loginPayload).subscribe(
      (res)=>{
          //TODO - Service popup loggato
          this.toastr.success("You are correctly logged in!", "My personal Bank")
          this.route.navigateByUrl("/home")
        },
      (err)=>{
        console.log(err)
          this.toastr.error("Sorry! An error has occurred", "My personal Bank")
          this.loginErrors = err
      }
    )
  }
}
