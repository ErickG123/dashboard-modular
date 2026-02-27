import { Component, inject, input, output, OnInit, computed, signal } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';

import { DashboardService, DashSection, WidgetData } from '../../services/dashboard';

import { KanbanEtapas } from '../../widgets/kanban-etapas/kanban-etapas';
import { ChartPlanejadoRealizado } from '../../widgets/chart-planejado-realizado/chart-planejado-realizado';
import { ChartTempoEtapa } from '../../widgets/chart-tempo-etapa/chart-tempo-etapa';
import { ChartEficiencia } from '../../widgets/chart-eficiencia/chart-eficiencia';
import { ChartComparacao } from '../../widgets/chart-comparacao/chart-comparacao';
import { ChartTopEntidades } from '../../widgets/chart-top-entidades/chart-top-entidades';

@Component({
  selector: 'app-dashboard-editor',
  standalone: true,
  imports: [NgComponentOutlet, FormsModule, DragDropModule, Select, Button, InputText, Dialog],
  templateUrl: './dashboard-editor.html',
  styleUrl: './dashboard-editor.scss'
})
export class DashboardEditor implements OnInit {
  dashService = inject(DashboardService);
  layoutId = input.required<string>();
  onBack = output<void>();

  secoes = computed(() => {
    const layout = this.dashService.getLayoutById(this.layoutId());
    return layout ? layout.sections : [];
  });

  layoutName = computed(() => {
    return this.dashService.getLayoutById(this.layoutId())?.name || '';
  });

  modalVisivel = false;
  novaSecaoNome = '';
  secaoSelecionadaModal: string | null = null;
  graficoSelecionadoModal: string | null = null;

  modalConfigVisivel = false;
  widgetConfigAlvo: {secId: string, wId: string} | null = null;
  widgetConfigLargura = 1;
  widgetConfigAltura = 100;

  fullscreenSectionId = signal<string | null>(null);
  fullscreenWidgetId = signal<string | null>(null);

  graficosDisponiveis = this.dashService.graficosDisponiveis;

  opcoesSessoes = computed(() => this.secoes().map(sec => ({ label: sec.title, value: sec.id })));

  ngOnInit() {}

  private updateSections(newSections: DashSection[]) {
    this.dashService.updateLayoutSections(this.layoutId(), newSections);
  }

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

  voltar() { this.onBack.emit(); }
  abrirPersonalizacao() { this.modalVisivel = true; }

  abrirConfig(secId: string, wId: string) {
    const sec = this.secoes().find(s => s.id === secId);
    const widget = sec?.widgets.find(w => w.id === wId);
    if (widget) {
      this.widgetConfigAlvo = { secId, wId };
      this.widgetConfigLargura = widget.flex;
      this.widgetConfigAltura = widget.height;
      this.modalConfigVisivel = true;
    }
  }

  salvarConfigWidget() {
    if (!this.widgetConfigAlvo) return;
    const { secId, wId } = this.widgetConfigAlvo;
    const novasSecoes = this.secoes().map(sec => {
      if (sec.id === secId) {
        return {
          ...sec,
          widgets: sec.widgets.map(w => w.id === wId ? { ...w, flex: this.widgetConfigLargura, height: this.widgetConfigAltura } : w)
        };
      }
      return sec;
    });
    this.updateSections(novasSecoes);
    this.modalConfigVisivel = false;
  }

  criarSessao() {
    const nome = this.novaSecaoNome.trim();
    if (!nome) return;
    const nova: DashSection = { id: 'sec-' + Math.random().toString(36).substring(2, 9), title: nome, widgets: [] };
    this.updateSections([...this.secoes(), nova]);
    this.novaSecaoNome = '';
    this.secaoSelecionadaModal = nova.id;
  }

  removerSecao(id: string) {
    this.updateSections(this.secoes().filter(sec => sec.id !== id));
    if (this.secaoSelecionadaModal === id) this.secaoSelecionadaModal = null;
    if (this.fullscreenSectionId() === id) this.fullscreenSectionId.set(null);
  }

  adicionarWidget() {
    if (!this.secaoSelecionadaModal || !this.graficoSelecionadoModal) return;
    const novoWidget: WidgetData = {
      id: 'w-' + Math.random().toString(36).substring(2, 9),
      type: this.graficoSelecionadoModal, flex: 3, height: 3, inputs: {}
    };
    const novasSecoes = this.secoes().map(sec => sec.id === this.secaoSelecionadaModal ? { ...sec, widgets: [...sec.widgets, novoWidget] } : sec);
    this.updateSections(novasSecoes);
    this.graficoSelecionadoModal = null;
  }

  removerWidget(sectionId: string, widgetId: string) {
    const novasSecoes = this.secoes().map(sec => sec.id === sectionId ? { ...sec, widgets: sec.widgets.filter(w => w.id !== widgetId) } : sec);
    this.updateSections(novasSecoes);
    if (this.fullscreenWidgetId() === widgetId) this.fullscreenWidgetId.set(null);
  }

  ajustarLargura(sectionId: string, widgetId: string, delta: number) {
    const novasSecoes = this.secoes().map(sec => sec.id === sectionId ? {
      ...sec, widgets: sec.widgets.map(w => w.id === widgetId ? { ...w, flex: Math.max(1, Math.min(12, w.flex + delta)) } : w)
    } : sec);
    this.updateSections(novasSecoes);
  }

  ajustarAltura(sectionId: string, widgetId: string, delta: number) {
    const novasSecoes = this.secoes().map(sec => sec.id === sectionId ? {
      ...sec, widgets: sec.widgets.map(w => w.id === widgetId ? { ...w, height: Math.max(1, Math.min(10, w.height + delta)) } : w)
    } : sec);
    this.updateSections(novasSecoes);
  }

  toggleFullscreenSection(id: string) { this.fullscreenSectionId.set(this.fullscreenSectionId() === id ? null : id); }
  toggleFullscreenWidget(id: string) { this.fullscreenWidgetId.set(this.fullscreenWidgetId() === id ? null : id); }

  drop(event: CdkDragDrop<WidgetData[]>) {
    if (event.previousContainer === event.container) {
      const arr = [...event.container.data];
      moveItemInArray(arr, event.previousIndex, event.currentIndex);
      const novasSecoes = this.secoes().map(sec => sec.widgets === event.container.data ? { ...sec, widgets: arr } : sec);
      this.updateSections(novasSecoes);
    }
  }
}
