import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { AuthService, } from '../../services/auth.service';
import { AddTransiction } from 'src/app/interfaces/add-transaction';
import { format } from 'date-fns';
import { Transaction } from 'src/app/interfaces/transaction';
import * as XLSX from 'xlsx';
import BankAccount from '../../interfaces/bankAccounts';
import { ActivatedRoute, Router } from '@angular/router';
import { orderBy, reverse } from 'lodash';

@Component({
  selector: 'app-number',
  templateUrl: './ricerca-movimenti1.component.html',
  styleUrls: ['./ricerca-movimenti1.component.scss']
})
export class RicercaMovimenti1Component implements OnInit {

  labels: Array<string> = [];
  data: Array<string> = [];
  types$ = this.transactionService.typesList$
  currentUser$ = this.authService.currentUser$
  bankAccounts$ = this.transactionService.bankAccounts$
  transactionList!: Transaction[]

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        let id = params['id'];
        this.transactionService.getTransactions(id).subscribe(
          res => {
            this.transactionList = res
            console.log(res)
            this.initializeDataset(this.transactionList)
          }
        )
      }
      );
  }

  addTransaction(payload: AddTransiction) {
    this.transactionService.add(payload)
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

  fileName = 'movementsOne.xlsx';
  exportExcel() {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }


}
