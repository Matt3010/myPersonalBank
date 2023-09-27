import { Component, Input } from '@angular/core';
import BankAccounts from 'src/app/interfaces/bankAccounts';
import {  format } from 'date-fns'
import { faArrowUp19 } from '@fortawesome/free-solid-svg-icons';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-iban',
  templateUrl: './my-iban.component.html',
  styleUrls: ['./my-iban.component.scss']
})
export class MyIbanComponent {

  faArrowUp19 = faArrowUp19;
  faUpRightFromSquare = faUpRightFromSquare;


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

  constructor(private route: Router){
  }


  goToDetail(id: string){
    this.route.navigate(['bankAccounts/transactions'],{ queryParams: { id: id, page: "number" } })
  }

}







