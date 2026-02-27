import { Component, Input, OnInit } from '@angular/core';

interface KpiData {
  titulo: string;
  valor: number;
  icon: string;
  cor: string;
  variacao: string;
}

@Component({
  selector: 'app-resumo-kanban',
  standalone: true,
  templateUrl: './resumo-kanban.html',
  styleUrl: './resumo-kanban.scss'
})
export class ResumoKanban implements OnInit {
  @Input() dados: any;
  
  kpis: KpiData[] = [];

  ngOnInit() {
    this.kpis = [
      { titulo: 'Aguardando', valor: 142, icon: 'pi pi-clock', cor: '#f59e0b', variacao: '+5%' },
      { titulo: 'Em Separação', valor: 86, icon: 'pi pi-box', cor: '#3b82f6', variacao: '-2%' },
      { titulo: 'Em Rota', valor: 215, icon: 'pi pi-truck', cor: '#8b5cf6', variacao: '+12%' },
      { titulo: 'Entregues', valor: 894, icon: 'pi pi-check-circle', cor: '#10b981', variacao: '+18%' }
    ];
  }
}
