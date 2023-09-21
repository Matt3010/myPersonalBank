import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FontService } from 'src/app/services/utils/font.service';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private authSrv: AuthService,
    private route: Router,
    private toastr: ToastrService,
    private fontSrv: FontService) {
  }

  loginErrors: any | null = null

  doLogin(loginPayload: Login){
    this.authSrv.login(loginPayload).subscribe(
      (res)=>{
          this.route.navigateByUrl("home")
        },
      (err)=>{
        if(err){
            this.toastr.error(this.fontSrv.capitalize(err.error.message), "My personal Bank")
        }
      }
    )
  }
}
