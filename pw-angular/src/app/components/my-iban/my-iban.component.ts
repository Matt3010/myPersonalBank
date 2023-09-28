import { Component, Input } from '@angular/core';
import BankAccounts from 'src/app/interfaces/bankAccounts';
import {  format } from 'date-fns'
import { faArrowUp19 } from '@fortawesome/free-solid-svg-icons';
import { faUpRightFromSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-iban',
  templateUrl: './my-iban.component.html',
  styleUrls: ['./my-iban.component.scss']
})
export class MyIbanComponent {

  faUpRightFromSquare = faUpRightFromSquare;
  faTrashCan = faTrashCan;


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

  constructor(private route: Router, private authSrv: AuthService, private _snackBar: MatSnackBar){
  }


  goToDetail(id: string){
    this.route.navigate(['loading'],{ queryParams: { id: id, page: "number" } })
  }


  delete(id: string){
    this.authSrv.delete(id).subscribe(
      (res: any)=>{
        window.location.reload()
      },
      (err: any)=>{
        this._snackBar.open("Error! Account not deleted. Retry later!", "Ok")
      }
    )
  }

}







