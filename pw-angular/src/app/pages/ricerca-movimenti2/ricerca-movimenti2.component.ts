import { Component } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { AddTransiction } from 'src/app/interfaces/add-transaction';
import { format } from 'date-fns';
import { Transaction } from 'src/app/interfaces/transaction';
import * as XLSX from 'xlsx';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector:"app-view-type",
  templateUrl: './ricerca-movimenti2.component.html',
  styleUrls: ['./ricerca-movimenti2.component.scss']
})
export class RicercaMovimenti2Component {


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
