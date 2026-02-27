import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPlanejadoRealizado } from './chart-planejado-realizado';

describe('ChartPlanejadoRealizado', () => {
  let component: ChartPlanejadoRealizado;
  let fixture: ComponentFixture<ChartPlanejadoRealizado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartPlanejadoRealizado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartPlanejadoRealizado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
