import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-transportadoras',
  imports: [],
  templateUrl: './grafico-transportadoras.html',
  styleUrl: './grafico-transportadoras.scss',
})
export class GraficoTransportadoras {
  @Input() dados: any;
}
