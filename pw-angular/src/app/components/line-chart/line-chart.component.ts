import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto'
import { orderBy, reverse, take, takeRight } from 'lodash';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnChanges {

  @Input() labels: string[] = []
  @Input() data: string[] = []
  @Output() updateEmit = new EventEmitter<boolean>()
  public chart!: Chart;
  last: number = 5
  chartRef: any;

  ngOnInit(): void {
    window.setTimeout(() => {
       this.createChart();
    }, 100)
  }

ngOnChanges(changes: SimpleChanges): void {
    this.updateChart()
}

  updateChart(){
    this.chart.destroy()
    this.ngOnInit()
  }

  createChart() {


    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: takeRight(orderBy(this.labels),this.last),
        datasets: [{
          label: 'Trend',
          data: takeRight(reverse([...this.data.map(value => parseFloat(value))]),this.last),
          fill: true,
          borderColor: '#8955fd',
          tension: 0.2,
          backgroundColor: ['#e9dfff'], // Assegna il gradiente come sfondo

        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false
            },
          },
          y: {
            display: false,
            grid: {
              display: true
            },ticks: {
            stepSize: 10000000
    }
          }
        },
        plugins:{
        legend: {
            display: false,
         },

      }
      },



    });
  }



}
