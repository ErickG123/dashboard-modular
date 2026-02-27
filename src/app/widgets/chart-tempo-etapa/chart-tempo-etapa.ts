import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-chart-tempo-etapa',
  standalone: true,
  imports: [ChartModule],
  template: `
    <div class="chart-wrapper">
      <p-chart type="bar" [data]="data" [options]="options" [responsive]="true"></p-chart>
    </div>
  `,
  styles: [`
    :host { 
      display: block; 
      width: 100%; 
      height: 100%; 
    }
    
    .chart-wrapper { 
      position: relative; 
      width: 100%; 
      height: 100%; 
      padding: 10px; 
      box-sizing: border-box;
    }
    
    ::ng-deep p-chart { 
      display: block; 
      width: 100%; 
      height: 100%; 
    }
    
    ::ng-deep p-chart > div {
      width: 100% !important;
      height: 100% !important;
    }
    
    ::ng-deep canvas { 
      width: 100% !important; 
      height: 100% !important; 
    }
  `]
})
export class ChartTempoEtapa implements OnInit {
  data: any;
  options: any;

  ngOnInit() {
    this.data = {
      labels: ['AGENDAMENTO', 'ENTRADA BASE', 'PESO 01', 'CARREGAMENTO', 'PESO 02', 'CHECK-OUT', 'FINALIZADO'],
      datasets: [
        { label: 'Meta', backgroundColor: '#cbd5e1', data: [20, 10, 15, 15, 15, 10, 10] },
        { label: 'Realizado', backgroundColor: '#0ea5e9', data: [45, 380, 850, 380, 480, 30, 20] }
      ]
    };
    this.options = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: 'var(--text-main)' } }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: 'var(--text-muted)' }
        },
        y: {
          grid: { display: false },
          ticks: { color: 'var(--text-muted)' }
        }
      }
    };
  }
}
