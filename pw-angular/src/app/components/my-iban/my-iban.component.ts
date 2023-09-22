import { Component, Input } from '@angular/core';
import BankAccounts from 'src/app/interfaces/bankAccounts';
import { compareAsc, format } from 'date-fns'
import { User } from 'src/app/services/auth.service';

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
        filter: false,
        width: '120px',
       // renderComponent: ButtonTableDevicesDocsComponent,
      },
      createdAt: {
        title: "Created at",
        filter: false,
     //   renderComponent: TableViewComponent,
        valuePrepareFunction: (item: any) => {
          let formattedDate = format(new Date(item), 'yyyy-MM-dd hh:mm:ss')
          return formattedDate
        },
      },
      iban: {
      title:"Iban",
      filter: false,
      //renderComponent: TableViewComponent,
      },
    },
  };

}
function moment() {
  throw new Error('Function not implemented.');
}

