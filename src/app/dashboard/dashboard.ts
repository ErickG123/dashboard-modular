import { Component, signal, computed, effect } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { ResumoKanban } from '../widgets/resumo-kanban/resumo-kanban';
import { GraficoTransportadoras } from '../widgets/grafico-transportadoras/grafico-transportadoras';

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

@Component({
  selector: 'app-dashboard',
  imports: [
    NgComponentOutlet,
    FormsModule,
    DragDropModule,
    Select,
    Button,
    InputText,
    Dialog
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  secoes = signal<DashSection[]>([]);

  modalVisivel = signal(false);
  novaSecaoNome = signal('');
  secaoSelecionadaModal = signal<string | null>(null);
  graficoSelecionadoModal = signal<string | null>(null);

  fullscreenSectionId = signal<string | null>(null);
  fullscreenWidgetId = signal<string | null>(null);

  graficosDisponiveis = [
    { label: 'Resumo Kanban', value: 'KANBAN' },
    { label: 'Transportadoras', value: 'TRANSPORTADORAS' }
  ];

  opcoesSessoes = computed(() => {
    return this.secoes().map(sec => ({ label: sec.title, value: sec.id }));
  });

  constructor() {
    const saved = localStorage.getItem('dash_sections');
    if (saved) {
      const parsed: DashSection[] = JSON.parse(saved);
      parsed.forEach(sec => {
        sec.widgets.forEach(w => {
          if (!w.height) w.height = 3;
          if (!w.flex) w.flex = 1;
        });
      });
      this.secoes.set(parsed);
    } else {
      this.secoes.set([
        {
          id: 'sec-1',
          title: 'Indicadores Principais',
          widgets: [
            { id: 'w1', type: 'KANBAN', flex: 1, height: 3, inputs: { pendentes: 12 } },
            { id: 'w2', type: 'TRANSPORTADORAS', flex: 1, height: 3, inputs: { regiao: 'Sul' } }
          ]
        }
      ]);
    }

    effect(() => {
      localStorage.setItem('dash_sections', JSON.stringify(this.secoes()));
    });
  }

  getComponentByType(type: string): any {
    switch (type) {
      case 'KANBAN': return ResumoKanban;
      case 'TRANSPORTADORAS': return GraficoTransportadoras;
      default: return null;
    }
  }

  abrirPersonalizacao() {
    this.modalVisivel.set(true);
  }

  criarSessao() {
    const nome = this.novaSecaoNome().trim();
    if (!nome) return;

    const nova: DashSection = {
      id: 'sec-' + Math.random().toString(36).substring(2, 9),
      title: nome,
      widgets: []
    };

    this.secoes.update(s => [...s, nova]);
    this.novaSecaoNome.set('');
    this.secaoSelecionadaModal.set(nova.id);
  }

  removerSecao(id: string) {
    this.secoes.update(s => s.filter(sec => sec.id !== id));
    if (this.secaoSelecionadaModal() === id) {
      this.secaoSelecionadaModal.set(null);
    }
    if (this.fullscreenSectionId() === id) {
      this.fullscreenSectionId.set(null);
    }
  }

  adicionarWidget() {
    const secId = this.secaoSelecionadaModal();
    const type = this.graficoSelecionadoModal();

    if (!secId || !type) return;

    const novoWidget: WidgetData = {
      id: 'w-' + Math.random().toString(36).substring(2, 9),
      type: type,
      flex: 1,
      height: 3,
      inputs: {}
    };

    this.secoes.update(secoes => secoes.map(sec => {
      if (sec.id === secId) {
        return { ...sec, widgets: [...sec.widgets, novoWidget] };
      }
      return sec;
    }));

    this.graficoSelecionadoModal.set(null);
  }

  removerWidget(sectionId: string, widgetId: string) {
    this.secoes.update(secoes => secoes.map(sec => {
      if (sec.id === sectionId) {
        return { ...sec, widgets: sec.widgets.filter(w => w.id !== widgetId) };
      }
      return sec;
    }));
    if (this.fullscreenWidgetId() === widgetId) {
      this.fullscreenWidgetId.set(null);
    }
  }

  ajustarLargura(sectionId: string, widgetId: string, delta: number) {
    this.secoes.update(secoes => secoes.map(sec => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          widgets: sec.widgets.map(w => {
            if (w.id === widgetId) {
              const newFlex = Math.max(1, Math.min(10, w.flex + delta));
              return { ...w, flex: newFlex };
            }
            return w;
          })
        };
      }
      return sec;
    }));
  }

  ajustarAltura(sectionId: string, widgetId: string, delta: number) {
    this.secoes.update(secoes => secoes.map(sec => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          widgets: sec.widgets.map(w => {
            if (w.id === widgetId) {
              const newHeight = Math.max(1, Math.min(10, w.height + delta));
              return { ...w, height: newHeight };
            }
            return w;
          })
        };
      }
      return sec;
    }));
  }

  toggleFullscreenSection(id: string) {
    this.fullscreenSectionId.set(this.fullscreenSectionId() === id ? null : id);
  }

  toggleFullscreenWidget(id: string) {
    this.fullscreenWidgetId.set(this.fullscreenWidgetId() === id ? null : id);
  }

  drop(event: CdkDragDrop<WidgetData[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.secoes.set([...this.secoes()]);
    }
  }
}
