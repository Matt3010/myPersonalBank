import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';
import { AuthService } from 'src/app/services/auth.service';
import { FontService } from 'src/app/services/utils/font.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/services/transaction.service';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  constructor(
    private authSrv: AuthService,
    private route: Router,
    private _snackBar: MatSnackBar,
    private fontSrv: FontService,
    private modalService: NgbModal,
    ) {
  }

  loginErrors: any | null = null

  email = new FormControl("", [Validators.required])

  doLogin(loginPayload: Login){
    this.authSrv.login(loginPayload).subscribe(
      (res)=>{
          this.route.navigate(['profile'])
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


  	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
		);
	}



  sendEmail(){
    if(this.email.valid){
      this.authSrv.sendEmail(this.email.value!).subscribe(
        res=>{
         this._snackBar.open("Email sent successfully", "Ok")
        },
        err=>{
         this._snackBar.open(err.error.message, "Ok")

        }
      )
    }
  }
}
