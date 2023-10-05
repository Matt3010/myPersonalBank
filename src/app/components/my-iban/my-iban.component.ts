import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { faTrashCan, faUpRightFromSquare, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { chunk, map } from 'lodash';
import BankAccounts from 'src/app/interfaces/bankAccounts';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-my-iban',
  templateUrl: './my-iban.component.html',
  styleUrls: ['./my-iban.component.scss']
})
export class MyIbanComponent {

  faUpRightFromSquare = faUpRightFromSquare;
  faTrashCan = faTrashCan;
  faPenToSquare = faPenToSquare;

  deleteMode: boolean = false


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


  coloreCasualeScuro() {
    const r = Math.floor(Math.random() * 3);
    const g = Math.floor(Math.random() * 34);
    const b = Math.floor(Math.random() * 190);

    // Crea una stringa CSS con il colore generato
    const colore = `rgb(${r},${g},${b})`;

    return colore;
  }

  inserisciSpaziOgni4Caratteri(inputString : string) {
  const chunkedArray = chunk(inputString, 4);

  const resultString = map(chunkedArray, chunk => chunk.join('')).join(' ');

  return resultString;
}


  goToDetail(id: string){
      this.route.navigate(['bankAccounts/transactions'], { queryParams: { id: id, page: "period" } })
  }


  delete(id: string){
    this.authSrv.delete(id).subscribe(
      (res: any)=>{
        window.location.reload()
      },
      (err: any)=>{
        this._snackBar.open("Error! Account not deleted. Retry later!", "Ok",  {
            duration: 3000,
          })
      }
    )
  }



}




