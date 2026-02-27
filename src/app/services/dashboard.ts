import { Injectable, signal, effect } from '@angular/core';

export interface WidgetData {
  id: string;
  type: string;
  flex: number;
  height: number;
  inputs?: any;
}

export interface DashSection {
  id: string;
  title: string;
  widgets: WidgetData[];
}

export interface DashboardLayout {
  id: string;
  name: string;
  isActive: boolean;
  sections: DashSection[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  layouts = signal<DashboardLayout[]>([]);

  graficosDisponiveis = [
    { label: 'Kanban - Tempo por Etapa', value: 'KANBAN_ETAPAS' },
    { label: 'Planejado vs Realizado', value: 'PLANEJADO_REALIZADO' },
    { label: 'Tempo por Etapa (Gráfico)', value: 'TEMPO_ETAPA' },
    { label: 'Eficiência da Operação', value: 'EFICIENCIA' },
    { label: 'Comparação de Carregamento', value: 'COMPARACAO' },
    { label: 'Top 5 Entidades', value: 'TOP_ENTIDADES' }
  ];

  constructor() {
    const saved = localStorage.getItem('dash_layouts_v3');
    if (saved) {
      this.layouts.set(JSON.parse(saved));
    } else {
      this.layouts.set([{
        id: 'layout-default',
        name: 'Visão Operacional',
        isActive: true,
        sections: [
          {
            id: 'sec-1',
            title: 'Indicadores de Tempo',
            widgets: [{ id: 'w1', type: 'KANBAN_ETAPAS', flex: 12, height: 2, inputs: {} }]
          }
        ]
      }]);
    }

    effect(() => {
      localStorage.setItem('dash_layouts_v3', JSON.stringify(this.layouts()));
    });
  }

  getActiveLayout(): DashboardLayout | undefined { return this.layouts().find(l => l.isActive); }
  getLayoutById(id: string): DashboardLayout | undefined { return this.layouts().find(l => l.id === id); }
  createLayout(name: string) { this.layouts.update(l => [...l, { id: 'l-' + Math.random().toString(36).substring(2, 9), name, isActive: l.length === 0, sections: [] }]); }
  deleteLayout(id: string) { this.layouts.update(l => l.filter(layout => layout.id !== id)); }
  setActiveLayout(id: string) { this.layouts.update(layouts => layouts.map(l => ({ ...l, isActive: l.id === id }))); }
  updateLayoutSections(layoutId: string, sections: DashSection[]) { this.layouts.update(layouts => layouts.map(l => l.id === layoutId ? { ...l, sections } : l)); }
}
