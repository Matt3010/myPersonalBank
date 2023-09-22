import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { TransactionType } from 'src/app/interfaces/transactionType';

@Component({
  selector: 'app-do-transaction-form',
  templateUrl: './do-transaction-form.component.html',
  styleUrls: ['./do-transaction-form.component.scss']
})
export class DoTransactionFormComponent{

@Input() types!: TransactionType[]

	constructor(private modalService: NgbModal, private fb: FormBuilder) {}

  destroyed$ = new Subject()

  newTransactionForm = this.fb.group({
    "transactionType" : new FormControl("", [Validators.required]),
    "amount": new FormControl("", [Validators.required]),
    "bankAccount": new FormControl("", [Validators.required]),
    "description": new FormControl("", [Validators.required]),
  })

open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
			},
			(reason) => {
			},
		);
	}

}
