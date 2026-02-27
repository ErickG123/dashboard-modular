import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { DashboardService } from '../../services/dashboard';

@Component({
  selector: 'app-dashboard-list',
  standalone: true,
  imports: [Button, InputText, FormsModule],
  templateUrl: './dashboard-list.html',
  styleUrl: './dashboard-list.scss'
})
export class DashboardList {
  dashService = inject(DashboardService);
  onEdit = output<string>();
  
  novoLayoutNome = signal('');

  criarLayout() {
    if (this.novoLayoutNome().trim()) {
      this.dashService.createLayout(this.novoLayoutNome().trim());
      this.novoLayoutNome.set('');
    }
  }

  editar(id: string) {
    this.onEdit.emit(id);
  }
}
