import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';

import { MatPaginator } from '@angular/material/paginator';
import { Transaction } from 'src/app/interfaces/transaction';

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


    fileName = 'movementsThree.xlsx';
  exportExcel() {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

}







