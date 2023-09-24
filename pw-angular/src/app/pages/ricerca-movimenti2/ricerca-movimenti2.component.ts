import { Component } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { AuthService, } from '../../services/auth.service';
import { AddTransiction } from 'src/app/interfaces/add-transaction';
import { format } from 'date-fns';
import { Transaction } from 'src/app/interfaces/transaction';

@Component({
  templateUrl: './ricerca-movimenti2.component.html',
  styleUrls: ['./ricerca-movimenti2.component.scss']
})
export class RicercaMovimenti2Component {

  labels: Array<string> = [];
  data: Array<string> = [];
  types$ = this.transactionService.typesList$
  currentUser$ = this.authService.currentUser$

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    //NOTE -qui lascio l' iban numero uno per la prima volta
    this.currentUser$.subscribe(res => {
      if(res)
        this.types$.subscribe(type=>{
            this.transactionService.getByCategory(10, res!.bankAccounts[0].id, type[0].id)
        })
    })

    this.transactionService.transactionsList$.subscribe(
      list => {
        this.initializeDataset(list)
      }
    )
  }

  doQuery(query: any) {
    //NOTE - Qui invece avra sempre account personalizzato
      this.transactionService.getByCategory(query.number, query.bankId, query.type)
  }

  addTransaction(payload: AddTransiction) {
    this.transactionService.add1(payload)
  }

  initializeDataset(inputLabels: Transaction[]) {
    let labels: Array<string> = [];
    let data: Array<string> = [];

    inputLabels.forEach(element => {
      const formattedDate = format(new Date(element.createdAt), 'yyyy-MM-dd, hh:mm');
      labels.push(formattedDate);
      data.push((element.balance).toString());
    });
    this.labels = labels
    this.data = data
  }
}
