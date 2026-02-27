import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTempoEtapa } from './chart-tempo-etapa';

describe('ChartTempoEtapa', () => {
  let component: ChartTempoEtapa;
  let fixture: ComponentFixture<ChartTempoEtapa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartTempoEtapa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartTempoEtapa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
