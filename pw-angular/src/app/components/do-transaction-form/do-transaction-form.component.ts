import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import BankAccounts from 'src/app/interfaces/bankAccounts';
import { TransactionType } from 'src/app/interfaces/transactionType';
import { User } from 'src/app/services/auth.service';
import { AddTransaction } from '../../interfaces/add-transaction';




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
   providers: String[] = [
  'Iliad',
  'Vodafone',
  'TIM',
  'Wind Tre',
  'Fastweb',
  'PosteMobile',
  'CoopVoce',
  'Kena Mobile',
  'Ho. Mobile',
  'Lycamobile',
  'Very Mobile',
  'NoiTel',
  'Daily Telecom',
  'BT Italia',
  'Uno Communications',
  'Tiscali Mobile',
  'Digi Mobil',
  'NRJ Mobile'
]


  @Output()
  emitTransaction = new EventEmitter<{amount: number; transactionType: string; description: string}>()

  @Output()
  emitRecharge = new EventEmitter<{provider: string, telephoneNumber: string, rechargeAmount: string}>()

  @Output()
  emitTransfer = new EventEmitter<{description: string, bankAccountTo: string, amountExit: number}>()

  @Output()
  filtersChange = new EventEmitter<{ number: number, bankId: string, type: string, startDate: string, endDate: string }>()
  selectedAccount: any

  newTransactionForm: FormGroup = this.fb.group({
    "transactionType": new FormControl("", [Validators.required]),
    "amount": new FormControl("", [Validators.required]),
    "description": new FormControl("", [Validators.required]),
    "provider": new FormControl("", [Validators.required]),
    "telephoneNumber": new FormControl("", [Validators.required]),
    "rechargeAmount": new FormControl("5", [Validators.required]),
    "bankAccountTo": new FormControl("", [Validators.required]),
    "amountExit": new FormControl("", [Validators.required]),
  })

  query: FormGroup = this.fb.group({
    "number": new FormControl("5"),
    "type": new FormControl(""),
    "startDate": new FormControl("",),
    "endDate": new FormControl(""),
  })
  id!: string
  tab!: string

  setDateStart(date: any) {
    this.query.get('startDate')!.setValue(this.convert(date.value));
  }
  setDateEnd(date: any) {
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
        if(value.startDate)
        value.startDate = this.convert(value.startDate)
        if(value.endDate)
        value.endDate = this.convert(value.endDate)
        this.filtersChange.emit(value)
      });
    this.newTransactionForm.valueChanges.subscribe(
      value => {
        console.log(value)
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

      let transactionPayload: any = {
      transactionType: this.newTransactionForm.value.transactionType!,
      amount: parseInt(this.newTransactionForm.value.amount!),
      description: this.newTransactionForm.value.description!,
      provider: this.newTransactionForm.value.provider!,
      telephoneNumber: this.newTransactionForm.value.telephoneNumber!,
      rechargeAmount: this.newTransactionForm.value.rechargeAmount!,
      bankAccountTo: this.newTransactionForm.value.bankAccountTo!,
      amountExit: this.newTransactionForm.value.amountExit!,
    }


    if(transactionPayload.transactionType =="650c1449a7e99de7b7813009"){
    this.emitRecharge.emit(transactionPayload)
    this.closeParentModal()
    this.newTransactionForm.reset()
    }
    else if(transactionPayload.transactionType =="650c1425a7e99de7b7813003"){
      console.log(transactionPayload)
    this.emitTransfer.emit(transactionPayload)
    this.closeParentModal()
    this.newTransactionForm.reset()
    }
    else{
    this.emitTransaction.emit(transactionPayload)
    this.closeParentModal()
    this.newTransactionForm.reset()
    }

  }


}
