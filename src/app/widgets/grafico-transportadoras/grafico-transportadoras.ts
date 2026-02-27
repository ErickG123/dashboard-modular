import { Component, Input, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-grafico-transportadoras',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './grafico-transportadoras.html',
  styleUrl: './grafico-transportadoras.scss'
})
export class GraficoTransportadoras implements OnInit {
  @Input() dados: any;

  data: any;
  options: any;

  ngOnInit() {
    this.data = {
      labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      datasets: [
        {
          type: 'line',
          label: 'SLA de Entrega (%)',
          borderColor: '#f59e0b',
          borderWidth: 3,
          fill: false,
          tension: 0.4,
          data: [92, 95, 88, 91, 98, 99, 100]
        },
        {
          type: 'bar',
          label: 'Expresso Sul (Carga Seca)',
          backgroundColor: '#3b82f6',
          data: [450, 520, 480, 600, 750, 300, 200]
        },
        {
          type: 'bar',
          label: 'Rápido Norte (Refrigerada)',
          backgroundColor: '#8b5cf6',
          data: [300, 410, 350, 420, 580, 250, 150]
        },
        {
          type: 'bar',
          label: 'Logística BR (Fracionada)',
          backgroundColor: '#10b981',
          data: [150, 200, 180, 220, 300, 120, 80]
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          labels: { color: '#475569', font: { weight: '500' } }
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        x: {
          stacked: true,
          ticks: { color: '#64748b' },
          grid: { color: '#e2e8f0', drawBorder: false }
        },
        y: {
          stacked: true,
          ticks: { color: '#64748b' },
          grid: { color: '#e2e8f0', drawBorder: false }
        }
      }
    };
  }
}
