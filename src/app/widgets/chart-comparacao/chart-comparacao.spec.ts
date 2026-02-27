import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComparacao } from './chart-comparacao';

describe('ChartComparacao', () => {
  let component: ChartComparacao;
  let fixture: ComponentFixture<ChartComparacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartComparacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartComparacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
