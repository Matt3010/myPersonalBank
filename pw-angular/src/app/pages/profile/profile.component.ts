import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
    constructor(private authService: AuthService, private transactionService: TransactionService,
    private modalService: NgbModal,
        private _snackBar: MatSnackBar,

){
    }

    currentUser$ = this.authService.currentUser$
    bankAccounts$ = this.transactionService.bankAccounts$

      old = new FormControl("", [Validators.required])
      new = new FormControl("", [Validators.required])
      repeat = new FormControl("", [Validators.required])


    open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
		);
	}

  reset(){
    if(this.old.valid && this.new.valid && this.repeat.valid && this.new.value == this.repeat.value){
      this.authService.reset(this.old.value!, this.new.value!).subscribe(
        (res : any)=>{
          this._snackBar.open("Password changed", "Ok")
        },
        (err : any)=>{
          this._snackBar.open(err.error.message, "Ok")
        }
      )
    }


  }

  }
