import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbInputDatepicker, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { TransactionType } from 'src/app/interfaces/transactionType';
import { AuthService, User } from 'src/app/services/auth.service';
import { AddTransaction } from '../../interfaces/add-transaction';
import { TransactionService } from 'src/app/services/transaction.service';
import BankAccounts from 'src/app/interfaces/bankAccounts';
import { ActivatedRoute, Router } from '@angular/router';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-do-transaction-form',
  templateUrl: './do-transaction-form.component.html',
  styleUrls: ['./do-transaction-form.component.scss'],
})
export class DoTransactionFormComponent implements OnInit {

  @Input() types!: TransactionType[]
  @Input() currentUser!: User
  @Input() bankAccounts!: BankAccounts[]
  @Input() fromMov2: boolean = false
  @Input() fromMov3: boolean = false

  orderForm!: FormGroup;
  isParentOpen = false;


  @Output()
  emitTransaction = new EventEmitter<AddTransaction>()

  @Output()
  filtersChange = new EventEmitter<{ number: number, bankId: string, type: string, startDate: string, endDate: string }>()
  selectedAccount: any

  newTransactionForm: FormGroup = this.fb.group({
    "transactionType": new FormControl("", [Validators.required]),
    "amount": new FormControl("", [Validators.required]),
    "description": new FormControl("", [Validators.required]),
  })

  query: FormGroup = this.fb.group({
    "number": new FormControl("5" ),
    "type": new FormControl("" ),
    "startDate": new FormControl("", ),
    "endDate": new FormControl("" ),
  })
  id!: string
  tab!: string

  setDateStart(date: any){
  this.query.get('startDate')!.setValue(this.convert(date.value));
  }
  setDateEnd(date: any){
  this.query.get('endDate')!.setValue(this.convert(date.value));
  console.log(this.query.value.endDate)
  }

convert(str: string) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

  constructor(private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.id = params['id'];
        this.tab = params['tab'];
      }
      );

      this.query.valueChanges.subscribe(
        value => {
          this.filtersChange.emit(value)
        });

  }


  openParentModal() {
    this.newTransactionForm.reset()
    this.isParentOpen = true;
  }
  closeParentModal() {
    this.isParentOpen = false;
    this.newTransactionForm.reset()
  }
  doTransaction() {
    let transactionPayload: AddTransaction = {
      transactionType: this.newTransactionForm.value.transactionType!,
      amount: parseInt(this.newTransactionForm.value.amount!),
      description: this.newTransactionForm.value.description!,
    }
    this.emitTransaction.emit(transactionPayload)
    this.closeParentModal()
    this.newTransactionForm.reset()
  }



  //DATES



}
