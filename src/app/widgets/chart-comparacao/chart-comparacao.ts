import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-chart-comparacao',
  standalone: true,
  imports: [ChartModule],
  template: `<div class="w-full h-full"><p-chart type="bar" [data]="data" [options]="options" [responsive]="true"></p-chart></div>`,
  styles: [`:host, .w-full { display: block; width: 100%; height: 100%; } ::ng-deep p-chart { height: 100%; display: block; canvas { height: 100% !important; width: 100% !important; } }`]
})
export class ChartComparacao implements OnInit {
  data: any; options: any;
  ngOnInit() {
    this.data = {
      labels: ['20/02', '21/02', '22/02', '23/02', '24/02', '25/02'],
      datasets: [
        { type: 'line', label: 'Meta (Linha)', borderColor: '#8b5cf6', data: [10000, 400000, 300000, 600000, 100000, 5000], tension: 0.4 },
        { type: 'bar', label: 'Realizado (Volume)', backgroundColor: '#3b82f6', data: [10000, 0, 0, 80000, 0, 40000] },
        { type: 'bar', label: 'Realizado (Quilos)', backgroundColor: '#22c55e', data: [0, 0, 0, 0, 0, 950000] },
        { type: 'bar', label: 'Meta (Unidade)', backgroundColor: '#bae6fd', data: [0, 0, 0, 820000, 850000, 0] }
      ]
    };
    this.options = { maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: false } } };
  }
}