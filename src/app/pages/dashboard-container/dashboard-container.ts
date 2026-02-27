import { Component, signal } from '@angular/core';
import { DashboardList } from '../dashboard-list/dashboard-list';
import { DashboardEditor } from '../dashboard-editor/dashboard-editor';
import { DashboardViewer } from '../dashboard-viewer/dashboard-viewer';

@Component({
  selector: 'app-dashboard-container',
  standalone: true,
  imports: [DashboardList, DashboardEditor, DashboardViewer],
  templateUrl: './dashboard-container.html',
  styleUrl: './dashboard-container.scss'
})
export class DashboardContainer {
  currentView = signal<'viewer' | 'list' | 'editor'>('viewer');
  editingLayoutId = signal<string | null>(null);
  isDarkMode = signal<boolean>(false);

  constructor() {
    const theme = localStorage.getItem('dash_theme');
    if (theme === 'dark') this.toggleTheme();
  }

  navigateTo(view: 'viewer' | 'list') {
    this.currentView.set(view);
    this.editingLayoutId.set(null);
  }

  editLayout(id: string) {
    this.editingLayoutId.set(id);
    this.currentView.set('editor');
  }

  toggleTheme() {
    this.isDarkMode.update(v => !v);
    if (this.isDarkMode()) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('dash_theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('dash_theme', 'light');
    }
  }
}
