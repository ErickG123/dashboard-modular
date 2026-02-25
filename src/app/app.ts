import { Component, signal } from '@angular/core';
import { DashboardLivre } from "./dashboard-livre/dashboard-livre";
import { Dashboard } from "./dashboard/dashboard";

@Component({
  selector: 'app-root',
  imports: [DashboardLivre, Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('dashboard-dinamico');
}
