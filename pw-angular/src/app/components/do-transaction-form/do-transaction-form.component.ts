import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { TransactionType } from 'src/app/interfaces/transactionType';
import { User } from 'src/app/services/auth.service';
import { AddTransiction } from '../../interfaces/add-transaction';

@Component({
  selector: 'app-do-transaction-form',
  templateUrl: './do-transaction-form.component.html',
  styleUrls: ['./do-transaction-form.component.scss']
})
export class DoTransactionFormComponent  implements OnInit{

@Input() types!: TransactionType[]
@Input() currentUser!: User
@Input() fromMov2 : boolean = false
orderForm!: FormGroup;
isParentOpen = false;
@Output() emitTransaction = new EventEmitter<AddTransiction>()
@Output() emitQuery = new EventEmitter<{number: number, bankId: string, type: string}>()
selectedAccount: any

	constructor( private fb: FormBuilder ) {}


  ngOnInit(): void {
      this.query.valueChanges.subscribe((res)=>{
        this.emitQuery.emit({number: parseInt(this.query.value.number!), bankId: this.query.value.bankAccount!, type: this.query.value.type!})
      })
  }
  newTransactionForm = this.fb.group({
    "transactionType" : new FormControl("", [Validators.required]),
    "amount": new FormControl("", [Validators.required]),
    "bankAccount": new FormControl("", [Validators.required]),
    "description": new FormControl("", [Validators.required]),
  })

  query = this.fb.group({
    "number": new FormControl("10", [Validators.required]),
    "bankAccount": new FormControl("", [Validators.required]),
    "type": new FormControl("", [Validators.required]),
  })
  
  openParentModal() {
    this.isParentOpen = true;
  }
  closeParentModal() {
    this.isParentOpen = false;
  }
  doTransaction(){
    let transactionPayload : AddTransiction = {
      transactionType: this.newTransactionForm.value.transactionType!,
      amount:  parseInt(this.newTransactionForm.value.amount!) ,
      bankAccount: this.newTransactionForm.value.bankAccount!,
      description: this.newTransactionForm.value.description!,

    }
    this.emitTransaction.emit(transactionPayload)
    this.closeParentModal()
    this.newTransactionForm.reset()
  }


}
