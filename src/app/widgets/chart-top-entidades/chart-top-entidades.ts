import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-chart-top-entidades',
  standalone: true,
  imports: [ChartModule],
  template: `<div class="w-full h-full"><p-chart type="bar" [data]="data" [options]="options" [responsive]="true"></p-chart></div>`,
  styles: [`:host, .w-full { display: block; width: 100%; height: 100%; } ::ng-deep p-chart { height: 100%; display: block; canvas { height: 100% !important; width: 100% !important; } }`]
})
export class ChartTopEntidades implements OnInit {
  data: any; options: any;
  ngOnInit() {
    this.data = {
      labels: ['CLIENTE 01', 'CLIENTE 03', 'CLIENTE 02', 'CLIENTE 04', 'CLIENTE 05'],
      datasets: [{ label: 'Volume', backgroundColor: '#1d4ed8', data: [980000, 90000, 5000, 0, 0] }]
    };
    this.options = { indexAxis: 'y', maintainAspectRatio: false, scales: { x: { grid: { display: false } }, y: { grid: { display: false } } } };
  }
}