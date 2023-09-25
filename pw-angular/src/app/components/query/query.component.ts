import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TransactionType } from 'src/app/interfaces/transactionType';
import { User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent {

@Output() openParentEmit = new EventEmitter<void>()
@Input() query : any
@Input() currentUser : User | null = null
@Input() types : TransactionType[] | null = null
@Input() fromMov2: boolean = false


openParentModal(){
  this.openParentEmit.emit()
}




}
