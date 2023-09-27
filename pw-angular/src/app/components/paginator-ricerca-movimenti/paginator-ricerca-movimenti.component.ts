import { Component,   Input,   OnChanges,   OnInit,   SimpleChanges,   ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { TransactionService } from 'src/app/services/transaction.service';
import {MatPaginator} from '@angular/material/paginator';
import { Transaction } from 'src/app/interfaces/transaction';
import { sortBy } from 'lodash';

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

  constructor() {
    this.dataSource = new MatTableDataSource();
  }

  ngOnChanges(changes: SimpleChanges): void {
          const sortedList = this.transactionList
          this.dataSource.data = sortedList;
          this.dataSource._updateChangeSubscription()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}







