import { Component, signal } from '@angular/core';
import { DashboardContainer } from "./pages/dashboard-container/dashboard-container";

@Component({
  selector: 'app-root',
  imports: [DashboardContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('dashboard-dinamico');
}
