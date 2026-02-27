import { Component, inject, computed, signal } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { Button } from 'primeng/button';
import { DashboardService } from '../../services/dashboard';

import { KanbanEtapas } from '../../widgets/kanban-etapas/kanban-etapas';
import { ChartPlanejadoRealizado } from '../../widgets/chart-planejado-realizado/chart-planejado-realizado';
import { ChartTempoEtapa } from '../../widgets/chart-tempo-etapa/chart-tempo-etapa';
import { ChartEficiencia } from '../../widgets/chart-eficiencia/chart-eficiencia';
import { ChartComparacao } from '../../widgets/chart-comparacao/chart-comparacao';
import { ChartTopEntidades } from '../../widgets/chart-top-entidades/chart-top-entidades';

@Component({
  selector: 'app-dashboard-viewer',
  standalone: true,
  imports: [NgComponentOutlet, Button],
  templateUrl: './dashboard-viewer.html',
  styleUrl: './dashboard-viewer.scss'
})
export class DashboardViewer {
  dashService = inject(DashboardService);

  activeLayout = computed(() => this.dashService.getActiveLayout());

  fullscreenSectionId = signal<string | null>(null);
  fullscreenWidgetId = signal<string | null>(null);

  getComponentByType(type: string): any {
    switch (type) {
      case 'KANBAN_ETAPAS': return KanbanEtapas;
      case 'PLANEJADO_REALIZADO': return ChartPlanejadoRealizado;
      case 'TEMPO_ETAPA': return ChartTempoEtapa;
      case 'EFICIENCIA': return ChartEficiencia;
      case 'COMPARACAO': return ChartComparacao;
      case 'TOP_ENTIDADES': return ChartTopEntidades;
      default: return null;
    }
  }

  toggleFullscreenSection(id: string) {
    this.fullscreenSectionId.set(this.fullscreenSectionId() === id ? null : id);
  }

  toggleFullscreenWidget(id: string) {
    this.fullscreenWidgetId.set(this.fullscreenWidgetId() === id ? null : id);
  }
}
