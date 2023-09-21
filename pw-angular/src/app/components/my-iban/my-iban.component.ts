import { Component, Input } from '@angular/core';
import BankAccounts from 'src/app/interfaces/bankAccounts';

@Component({
  selector: 'app-my-iban',
  templateUrl: './my-iban.component.html',
  styleUrls: ['./my-iban.component.scss']
})
export class MyIbanComponent {


  @Input() bankAccounts : BankAccounts[] | null = null

}
