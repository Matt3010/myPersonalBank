import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  templateUrl: './ricerca-movimenti1.component.html',
  styleUrls: ['./ricerca-movimenti1.component.scss']
})
export class RicercaMovimenti1Component{

  constructor(private transactionService: TransactionService){
  }
  types$ = this.transactionService.typesList$

}
