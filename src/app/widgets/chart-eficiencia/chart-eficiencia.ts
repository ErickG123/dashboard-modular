import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-chart-eficiencia',
  standalone: true,
  imports: [ChartModule],
  template: `<div class="w-full h-full"><p-chart type="doughnut" [data]="data" [options]="options" [responsive]="true"></p-chart></div>`,
  styles: [`:host, .w-full { display: block; width: 100%; height: 100%; } ::ng-deep p-chart { height: 100%; display: block; canvas { height: 100% !important; width: 100% !important; } }`]
})
export class ChartEficiencia implements OnInit {
  data: any; options: any;
  ngOnInit() {
    this.data = {
      labels: ['Agendamentos', 'Concluídos', 'No Show', 'Cancelados'],
      datasets: [{ data: [104, 8, 38, 23], backgroundColor: ['#3b82f6', '#22c55e', '#f97316', '#ef4444'], hoverBackgroundColor: ['#2563eb', '#16a34a', '#ea580c', '#dc2626'] }]
    };
    this.options = { maintainAspectRatio: false, cutout: '70%', plugins: { legend: { position: 'left' } } };
  }
}