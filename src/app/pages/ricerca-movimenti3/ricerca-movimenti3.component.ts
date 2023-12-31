import { Component } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { AuthService, } from '../../services/auth.service';
import { AddTransaction } from 'src/app/interfaces/add-transaction';
import { format } from 'date-fns';
import { Transaction } from 'src/app/interfaces/transaction';
import * as XLSX from 'xlsx';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';

@Component({
  selector: 'app-ricerca-movimenti3',
  templateUrl: './ricerca-movimenti3.component.html',
  styleUrls: ['./ricerca-movimenti3.component.scss']
})
export class RicercaMovimenti3Component {

  constructor(
    private transactionService: TransactionService, private _snackBar: MatSnackBar,
    private authService: AuthService, private route: ActivatedRoute, private router: Router) {
  }

  labels: Array<string> = [];
  data: Array<string> = [];
  types$ = this.transactionService.typesList$
  currentUser$ = this.authService.currentUser$
  bankAccounts$ = this.transactionService.bankAccounts$
  transactionList!: Transaction[]
  showLoading: boolean = true
    sidebarExpanded = true;


  initializeTransactions() {
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

  ngOnInit(): void {

    this.laoding()
    this.initializeTransactions()

  }

  laoding() {
    setTimeout(() => {
      this.showLoading = false
    }, 1000)
  }

   addTransaction(payload: AddTransaction) {
    this.transactionService.add(payload)
  }


  initializeDataset(inputLabels: Transaction[]) {
    let labels: Array<string> = [];
    let data: Array<string> = [];

    inputLabels.forEach(element => {
      const formattedDate = format(new Date(element.createdAt), 'dd-MM-yyyy, hh:mm');
      labels.push(formattedDate);
      data.push((element.balance).toString());
    });
    this.labels = labels
    this.data = data

  }

  fileName = 'movementsThree.xlsx';
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



  doQuery(event: any) {

    this.route.queryParams
      .subscribe(params => {
        let id = params['id'];
        this.transactionService.getTransactions(id, event.number, event.type, event.startDate, event.endDate).subscribe(
          res => {
            this.transactionList = res
          },
          err => {
            this._snackBar.open(err.error.message, "Ok",  {
            duration: 3000,
          })
          }
        )
      }
      );


  }



  doRecharge(input: { provider: string, telephoneNumber: string, rechargeAmount: string }) {
    this.route.queryParams
      .subscribe(params => {
        let id = params['id'];
        this.transactionService.rechargePhone(id, input.provider, input.rechargeAmount, input.telephoneNumber).pipe(take(1)).subscribe(
          res => {
            if (res) {
              window.location.reload()

            }
          },
          err => {
            this._snackBar.open(err.error.message, "OK",  {
            duration: 3000,
          });
          }
        )
      })
  }


  doTransfer(input: { description: string, bankAccountTo: string, amountExit: number }) {
    this.route.queryParams
      .subscribe(params => {
        let id = params['id'];
        this.transactionService.transfer(id, input.description, input.bankAccountTo, input.amountExit).subscribe(
          res => {
            window.location.reload()
          },
          (err) => {
            console.log(err)
            if (err.status == 200) {
            }
            else {
              this._snackBar.open(err.error.message, "OK",  {
            duration: 3000,
          });
            }

          }
        )
      })
  }

sidebarShow: boolean = false

toggleSide(){
  this.sidebarShow = !this.sidebarShow
}




}

