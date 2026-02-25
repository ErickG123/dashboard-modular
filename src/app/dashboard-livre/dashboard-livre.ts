import { Component, signal, effect } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KtdGridModule, KtdGridLayout } from '@katoid/angular-grid-layout';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { ResumoKanban } from '../widgets/resumo-kanban/resumo-kanban';
import { GraficoTransportadoras } from '../widgets/grafico-transportadoras/grafico-transportadoras';

export interface DadosWidget {
  id: string;
  type: string;
  inputs?: any;
}

@Component({
  selector: 'app-dashboard-livre',
  imports: [
    NgComponentOutlet,
    FormsModule,
    KtdGridModule,
    Select,
    Button
  ],
  templateUrl: './dashboard-livre.html',
  styleUrl: './dashboard-livre.scss'
})
export class DashboardLivre {
  cols = 24;
  rowHeight = 30;

  layout = signal<KtdGridLayout>([]);
  widgetsData = signal<DadosWidget[]>([]);
  graficoSelecionado = signal<string | null>(null);

  graficosDisponiveis = [
    { label: 'Resumo Kanban', value: 'KANBAN' },
    { label: 'Transportadoras', value: 'TRANSPORTADORAS' }
  ];

  constructor() {
    const savedLayout = localStorage.getItem('dash_layout_grid');
    const savedData = localStorage.getItem('dash_data_grid');

    if (savedLayout && savedData) {
      this.layout.set(JSON.parse(savedLayout));
      this.widgetsData.set(JSON.parse(savedData));
    } else {
      this.layout.set([
        { id: '1', x: 0, y: 0, w: 8, h: 6 },
        { id: '2', x: 8, y: 0, w: 12, h: 8 }
      ]);
      this.widgetsData.set([
        { id: '1', type: 'KANBAN', inputs: { pendentes: 12, emAndamento: 5 } },
        { id: '2', type: 'TRANSPORTADORAS', inputs: { regiao: 'Sul' } }
      ]);
    }

    effect(() => {
      localStorage.setItem('dash_layout_grid', JSON.stringify(this.layout()));
      localStorage.setItem('dash_data_grid', JSON.stringify(this.widgetsData()));
    });
  }

  getComponentByType(type: string): any {
    switch (type) {
      case 'KANBAN': return ResumoKanban;
      case 'TRANSPORTADORAS': return GraficoTransportadoras;
      default: return null;
    }
  }

  getWidgetData(id: string): DadosWidget | undefined {
    return this.widgetsData().find(w => w.id === id);
  }

  adicionarWidget() {
    const selecionado = this.graficoSelecionado();
    if (!selecionado) return;

    const novoId = Math.random().toString(36).substring(2, 9);

    this.widgetsData.update(w => [
      ...w,
      { id: novoId, type: selecionado, inputs: {} }
    ]);

    this.layout.update(l => [
      ...l,
      { id: novoId, x: 0, y: 0, w: 8, h: 6 }
    ]);

    this.graficoSelecionado.set(null);
  }

  removerWidget(idToRemove: string) {
    this.widgetsData.update(w => w.filter(widget => widget.id !== idToRemove));
    this.layout.update(l => l.filter(item => item.id !== idToRemove));
  }

  onLayoutUpdated(novoLayout: KtdGridLayout) {
    this.layout.set(novoLayout);
  }
}