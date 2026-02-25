import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-resumo-kanban',
  imports: [],
  templateUrl: './resumo-kanban.html',
  styleUrl: './resumo-kanban.scss',
})
export class ResumoKanban {
  @Input() dados: any;
}
