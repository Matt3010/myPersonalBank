import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../interfaces/transaction';
import { BehaviorSubject, Observable } from 'rxjs';
import { TransactionType } from '../interfaces/transactionType';
import { AddTransiction } from '../interfaces/add-transaction';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private http: HttpClient, private _snackBar: MatSnackBar, ) {
    this.getTransactionTypes()
  }

  private _typesList$ = new BehaviorSubject<TransactionType[]>([]);
  typesList$ = this._typesList$.asObservable()

   private _transactionsList$ = new BehaviorSubject<Transaction[]>([]);
  transactionsList$ = this._transactionsList$.asObservable()

  getTransactionTypes(){
    this.http.get<TransactionType[]>("api/transaction/types").subscribe(
      types=>{
        this._typesList$.next(types)
      }
    )
  }

    getByNumber1(qta: number,id: string){
     this.http.post<Transaction[]>("/api/transactions/"+id+"/number/", { number : qta }).subscribe(
      res=>{
        this._transactionsList$.next(res)
      }
     )
    }


    add1(payload: AddTransiction) {
      this.http.post<Transaction>("/api/transactions/"+ payload.bankAccount, payload).subscribe(
            res=>{
              let lastValue = this._transactionsList$.value
              lastValue.push(res)
              let orderedList = lastValue.sort(function compare(a, b) {
                  let dateA : any= new Date(a.createdAt);
                  let dateB : any = new Date(b.createdAt);
                  return dateB - dateA;
              });
              this._transactionsList$.next(orderedList)
              this._snackBar.open("Transaction succeded!", "OK");
            },
            err=>{
                  this._snackBar.open("Transaction error!", "OK");

            }

      )
    }

}


