import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';
import { AuthService } from 'src/app/services/auth.service';
import { FontService } from 'src/app/services/utils/font.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  constructor(
    private authSrv: AuthService,
    private route: Router,
    private _snackBar: MatSnackBar,
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
          this._snackBar.open(this.fontSrv.capitalize(err.error.message), "OK")
          }
      }
    )
  }

  ngOnDestroy(): void {
      this._snackBar.ngOnDestroy
  }
}
