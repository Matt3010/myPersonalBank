import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../interfaces/transaction';
import { BehaviorSubject } from 'rxjs';
import { TransactionType } from '../interfaces/transactionType';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private http: HttpClient) {
    this.getTransactionTypes()
  }

  private _typesList$ = new BehaviorSubject<TransactionType[] | null>(null);
  typesList$ = this._typesList$.asObservable()

   private _transactionsList$ = new BehaviorSubject<Transaction[] | null>(null);
  transactionsList$ = this._transactionsList$.asObservable()

  getTransactionTypes(){
    this.http.get<TransactionType[]>("api/transaction/types").subscribe(
      types=>{
        this._typesList$.next(types)
      }
    )
  }


    getByNumber1(qta: number, bankAccountId: string){
      this.http.post<Transaction[]>("/api/transactions/"+bankAccountId+"/number/", { number : qta }).subscribe(
        res =>{
          this._transactionsList$.next(res)
        }
      )
    }

    add1(bankAccount: string, transactionType: string, amount: number, description: string){
      this.http.post<Transaction>("/api/transactions/add",{bankAccount: bankAccount, transactionType: transactionType, amount: amount, description: description}).subscribe(
        (res)=>{
          console.log(res)
        }
      )
    }


}
