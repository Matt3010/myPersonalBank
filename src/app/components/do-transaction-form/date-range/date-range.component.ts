import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent {

  @Output() emitStart = new EventEmitter<any>()
  @Output() emitEnd = new EventEmitter<any>()

  emitChangeStartDate(start: any) {
    this.emitStart.emit(start)
  }
  emitChangeEndDate(end: any) {
    this.emitEnd.emit(end)

  }

}
