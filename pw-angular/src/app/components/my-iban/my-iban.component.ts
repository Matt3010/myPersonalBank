import { Component, Input } from '@angular/core';
import BankAccounts from 'src/app/interfaces/bankAccounts';

@Component({
  selector: 'app-my-iban',
  templateUrl: './my-iban.component.html',
  styleUrls: ['./my-iban.component.scss']
})
export class MyIbanComponent {


  @Input() bankAccounts : BankAccounts[] | null = null
  settings = {
    actions: {
      columnTitle: "Actions",
      position: 'left',
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
       actions: {
        title: "Actions",
        type: 'custom',
        filter: false,
        width: '120px',
       // renderComponent: ButtonTableDevicesDocsComponent,
      },
      createdAt: {
        title: "Created at",
        type: '',
        filter: true,
     //   renderComponent: TableViewComponent,

      },
      iban: {
      title:"Iban",
      type: '',
      filter: true,
      //renderComponent: TableViewComponent,
      },
    },
  };

}
