import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto'
import { orderBy, reverse } from 'lodash';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() labels: string[] = []
  @Input() data: string[] = []
  @Output() updateEmit = new EventEmitter<boolean>()
  public chart!: Chart;

  ngOnInit(): void {
    window.setTimeout(() => {
       this.createChart();
    }, 100)
  }

  createChart() {

    const colors = ['red', 'green'];
    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {// values on X-Axis
        labels: orderBy(this.labels),
        datasets: [{
          label: 'Trend',
          data: reverse([...this.data.map(value => parseFloat(value))]), // Convert string to number
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              display: false
            },
            ticks: {
              stepSize: 1000,
              color: (ctx) => {
                // Access the tick's value, cast it back to string, and compare it
                const tickValue = parseFloat((ctx.tick.value).toString()).toString();
                return tickValue >= '0' ? 'green' : 'red';
              }
            }
          }
        }
      },


    });
  }
}
