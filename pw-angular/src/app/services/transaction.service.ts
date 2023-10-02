import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../interfaces/transaction';
import { BehaviorSubject, Observable, isEmpty, map } from 'rxjs';
import { TransactionType } from '../interfaces/transactionType';
import { MatSnackBar } from '@angular/material/snack-bar';
import BankAccount from '../interfaces/bankAccounts';
import { ActivatedRoute } from '@angular/router';
import { AddTransaction } from '../interfaces/add-transaction';
import { omitBy, pickBy } from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private route: ActivatedRoute) {

this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.id = params['id'];
      }
    );

    this.getTransactionTypes()
    this.getUserAccounts()
  }

  id: string | null = null

  private _typesList$ = new BehaviorSubject<TransactionType[]>([]);
  typesList$ = this._typesList$.asObservable()

   private _transactionsList$ = new BehaviorSubject<Transaction[]>([]);
  transactionsList$ = this._transactionsList$.asObservable()

   private _bankAccounts$ = new BehaviorSubject<BankAccount[]>([]);
  bankAccounts$ = this._bankAccounts$.asObservable()

    getTransactionTypes(){
      this.http.get<TransactionType[]>("api/transactionTypes").subscribe(
        types=>{
          this._typesList$.next(types)
        }
      )
    }

     getTransactions(id: string, qta?: number, type?: string, startDate?: string, endDate?: string): Observable<Transaction[]> {
    let params = new HttpParams();

    if (qta) {
      params = params.set('number', qta.toString());
    }
    if (type) {
      params = params.set('type', type);
    }
    if (startDate) {
      params = params.set('startDate', startDate);
    }
    if (endDate) {
      params = params.set('endDate', endDate);
    }

    return this.http.get<Transaction[]>("/api/bankAccounts/" + id + "/transactions", { params });
  }


    getUserAccounts(){
     this.http.get<BankAccount[]>("/api/bankAccounts/").subscribe(
      res=>{
        this._bankAccounts$.next(res)
      }
     )
    }

    add(payload: AddTransaction) {

      this.http.post<Transaction>("/api/bankAccounts/"+ this.id+"/transactions", payload).subscribe(
            res=>{
              this.getTransactions(this.id!)
              window.location.reload()
            },
            (err)=>{
              this._snackBar.open(err.error.message, "OK");
            }
      )
    }



    rechargePhone(id: string, provider: string,  rechargeAmount: string,  telephoneNumber: string){
      return this.http.post("/api/bankAccounts/"+id+"/mobileRecharge", {operator: provider, mobile: telephoneNumber, amount: rechargeAmount})
    }

    transfer(id: string, description: string, bankAccountTo: string, quantityExit: number){
      return this.http.post("/api/bankAccounts/"+id+"/transfer", {bankAccount: bankAccountTo, amount: quantityExit, description: description})
    }




}


