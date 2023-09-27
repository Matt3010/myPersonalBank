import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { TransactionType } from 'src/app/interfaces/transactionType';
import { AuthService, User } from 'src/app/services/auth.service';
import { AddTransiction } from '../../interfaces/add-transaction';
import { TransactionService } from 'src/app/services/transaction.service';
import BankAccounts from 'src/app/interfaces/bankAccounts';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-do-transaction-form',
  templateUrl: './do-transaction-form.component.html',
  styleUrls: ['./do-transaction-form.component.scss']
})
export class DoTransactionFormComponent  implements OnInit{

@Input() types!: TransactionType[]
@Input() currentUser!: User
@Input() bankAccounts!: BankAccounts[]
@Input() fromMov2 : boolean = false

orderForm!: FormGroup;
isParentOpen = false;

@Output()
emitTransaction = new EventEmitter<AddTransiction>()

@Output()
filtersChange = new EventEmitter<{number: number, bankId: string, type: string}>()
selectedAccount: any

newTransactionForm : FormGroup = this.fb.group({
    "transactionType" : new FormControl("", [Validators.required]),
    "amount": new FormControl("", [Validators.required]),
    "description": new FormControl("", [Validators.required]),
  })
query: FormGroup = this.fb.group({
    "number": new FormControl("10", [Validators.required]),
    "bankAccount": new FormControl("" , [Validators.required]),
    "type": new FormControl("", [Validators.required]),
  })
  id!: string

	constructor( private fb: FormBuilder, private route: ActivatedRoute) {
    this.route.queryParams
      .subscribe(params => {
        this.id = params['id'];
      }
    );



         this.query.valueChanges.subscribe(value => this.filtersChange.emit(value));

  }


  ngOnInit(): void {
      this.query.valueChanges.subscribe((res)=>{
        this.filtersChange.emit({number: parseInt(this.query.value.number!), bankId: this.query.value.bankAccount!, type: this.query.value.type!})
      })

  }


  openParentModal() {
    this.newTransactionForm.reset()
    this.isParentOpen = true;
  }
  closeParentModal() {
    this.isParentOpen = false;
    this.newTransactionForm.reset()
  }
  doTransaction(){
    let transactionPayload : AddTransiction = {
      transactionType: this.newTransactionForm.value.transactionType!,
      amount:  parseInt(this.newTransactionForm.value.amount!) ,
      description: this.newTransactionForm.value.description!,
    }
    this.emitTransaction.emit(transactionPayload)
    this.closeParentModal()
    this.newTransactionForm.reset()
  }


}
