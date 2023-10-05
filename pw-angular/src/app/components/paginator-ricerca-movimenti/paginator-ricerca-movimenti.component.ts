import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { Transaction } from 'src/app/interfaces/transaction';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-paginator-ricerca-movimenti',
  templateUrl: './paginator-ricerca-movimenti.component.html',
  styleUrls: ['./paginator-ricerca-movimenti.component.scss']
})


export class PaginatorRicercaMovimenti1Component implements  OnChanges{

  @Input() transactionList: Transaction[] = [];
  @Input() displayedColumns: string[] | null = null;
  dataSource: MatTableDataSource<Transaction>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() fromMov2 = true;
  detailsForModals: any




  constructor(private modalService: NgbModal, private trasnactionSrv: TransactionService) {
    this.dataSource = new MatTableDataSource();
  }



  takeDetails(id: string){
    this.trasnactionSrv.getDetails(id).subscribe(details=>{
       this.detailsForModals = details
    })
  }


  ngOnChanges(changes: SimpleChanges): void {
          const sortedList = this.transactionList
          this.dataSource.data = sortedList;
          this.dataSource._updateChangeSubscription()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
		);
	}

}







