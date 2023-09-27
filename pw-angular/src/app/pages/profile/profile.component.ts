import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

    constructor(private authService: AuthService, private transactionService: TransactionService){
    }

    currentUser$ = this.authService.currentUser$
    bankAccounts$ = this.transactionService.bankAccounts$


  }
