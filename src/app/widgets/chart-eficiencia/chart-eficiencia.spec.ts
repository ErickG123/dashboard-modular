import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartEficiencia } from './chart-eficiencia';

describe('ChartEficiencia', () => {
  let component: ChartEficiencia;
  let fixture: ComponentFixture<ChartEficiencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartEficiencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartEficiencia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
