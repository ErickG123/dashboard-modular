import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-chart-planejado-realizado',
  standalone: true,
  imports: [ChartModule],
  template: `<div class="w-full h-full"><p-chart type="bar" [data]="data" [options]="options" [responsive]="true"></p-chart></div>`,
  styles: [`:host, .w-full { display: block; width: 100%; height: 100%; } ::ng-deep p-chart { height: 100%; display: block; canvas { height: 100% !important; width: 100% !important; } }`]
})
export class ChartPlanejadoRealizado implements OnInit {
  data: any; options: any;
  ngOnInit() {
    this.data = {
      labels: ['00h','02h','04h','06h','08h','10h','12h','14h','16h','18h','20h'],
      datasets: [
        { label: 'Total Vagas', backgroundColor: '#3b82f6', data: [50, 50, 50, 0, 40, 95, 145, 50, 60, 55, 50] },
        { label: 'Ocupadas', backgroundColor: '#0f172a', data: [0, 0, 0, 0, 20, 65, 58, 45, 55, 15, 12] }
      ]
    };
    this.options = { maintainAspectRatio: false, scales: { x: { grid: { display: false } }, y: { beginAtZero: true } } };
  }
}