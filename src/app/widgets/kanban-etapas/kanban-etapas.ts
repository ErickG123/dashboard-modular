import { Component } from '@angular/core';

@Component({
  selector: 'app-kanban-etapas',
  standalone: true,
  template: `
    <div class="fluxo-container">
      @for (etapa of etapas; track etapa.nome) {
        <div class="card-etapa">
          <span class="nome">{{ etapa.nome }}</span>
          <div class="valor-area">
            <span class="tempo">{{ etapa.tempo }}</span><span class="unidade">min</span>
          </div>
          <div class="meta-area">
            <span class="status" [class.bad]="etapa.isRuim" [class.good]="!etapa.isRuim">
              <i [class]="etapa.isRuim ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i> {{ etapa.variacao }} min
            </span>
            <span class="meta">Meta: {{ etapa.meta }} min</span>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
      width: 100%;
      overflow: hidden;
    }
    
    .fluxo-container {
      display: flex;
      gap: 15px;
      flex-wrap: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
      padding: 10px;
      height: 100%;
      align-items: center;
      
      &::-webkit-scrollbar { height: 6px; }
      &::-webkit-scrollbar-track { background: transparent; }
      &::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }
      &::-webkit-scrollbar-thumb:hover { background: var(--text-muted); }
    }
    
    .card-etapa {
      background: var(--bg-app); 
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 15px;
      min-width: 160px;
      flex: 1 1 0; 
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.02);
      transition: transform 0.2s, border-color 0.2s;

      &:hover {
        transform: translateY(-2px);
        border-color: var(--text-muted);
      }
    }
    
    .nome { 
      font-size: 0.75rem; 
      font-weight: 700; 
      color: var(--text-muted); 
      text-transform: uppercase; 
      letter-spacing: 0.5px;
    }
    
    .valor-area { 
      display: flex; 
      align-items: baseline; 
      gap: 4px; 
      border-bottom: 1px solid var(--border-color); 
      padding-bottom: 10px; 
    }
    
    .tempo { 
      font-size: 2.2rem; 
      font-weight: 800; 
      color: var(--text-main); 
      line-height: 1; 
    }
    
    .unidade { 
      font-size: 0.9rem; 
      color: var(--text-muted); 
      font-weight: 600; 
    }
    
    .meta-area { 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      font-size: 0.75rem; 
      font-weight: 600; 
    }
    
    .status { 
      display: flex; 
      align-items: center; 
      gap: 2px; 
    }
    
    .status.bad { color: #ef4444; } 
    .status.good { color: #10b981; } 
    .meta { color: var(--text-muted); }
  `]
})
export class KanbanEtapas {
  etapas = [
    { nome: 'Agendamento', tempo: 14, variacao: '+4', meta: 10, isRuim: true },
    { nome: 'Entrada Base', tempo: 4, variacao: '+2', meta: 2, isRuim: true },
    { nome: 'Peso 01', tempo: 1, variacao: '-9', meta: 10, isRuim: false },
    { nome: 'Carregamento', tempo: 2, variacao: '-8', meta: 10, isRuim: false },
    { nome: 'Peso 02', tempo: 1, variacao: '-9', meta: 10, isRuim: false },
    { nome: 'Check-out', tempo: 2, variacao: '-8', meta: 10, isRuim: false },
    { nome: 'Finalizado', tempo: 2, variacao: '-8', meta: 10, isRuim: false }
  ];
}
