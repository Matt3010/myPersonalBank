import { Component,   Input,   OnInit,   ViewChild } from '@angular/core';
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


export class PaginatorRicercaMovimenti1Component implements OnInit{

    constructor(private transactionService: TransactionService) {
    }

    transactionList$ = this.transactionService.transactionsList$
    list!: Transaction[]
    @Input() fromMov2 : boolean = true

    ngOnInit(): void {
        this.transactionList$.subscribe(res=>{
            this.list = sortBy(res, [function(o) { return o.createdAt; }])
            this.dataSource.data = res
            this.dataSource._updatePaginator
        })
    }

    @Input() displayedColumns: string[] | null = null
    dataSource = new MatTableDataSource<Transaction>(this.list);

      @ViewChild(MatPaginator) paginator!: MatPaginator;

      ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
      }
}







