import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { AuthService, User } from '../../services/auth.service';
import { AddTransiction } from 'src/app/interfaces/add-transaction';
import { ToastrService } from 'ngx-toastr';
import { Transaction } from 'src/app/interfaces/transaction';
import { Subject, takeUntil } from 'rxjs';

@Component({
  templateUrl: './ricerca-movimenti1.component.html',
  styleUrls: ['./ricerca-movimenti1.component.scss']
})
export class RicercaMovimenti1Component  implements OnInit{

  transactionList: Transaction[] | null = null

  destroyed$ = new Subject<void>()

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private toastr: ToastrService){
  }
  types$ = this.transactionService.typesList$
  currentUser$ = this.authService.currentUser$

  ngOnInit(): void {
    //NOTE -qui lascio l' iban numero una per la prima volta
    this.currentUser$.subscribe(res=>{
    this.transactionService.getByNumber1(10, res!.bankAccounts[0].id)
    })
  }
  addTransaction(payload: AddTransiction){
      this.transactionService.add1(payload)
  }
  doQuery(query: any){

    //NOTE - Qui invece avra sempre account personalizzato
    this.currentUser$.subscribe(res=>{
    this.transactionService.getByNumber1(query.number, res!.bankAccounts[0].id)
    })  }


}
