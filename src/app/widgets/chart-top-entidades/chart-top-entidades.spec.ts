import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTopEntidades } from './chart-top-entidades';

describe('ChartTopEntidades', () => {
  let component: ChartTopEntidades;
  let fixture: ComponentFixture<ChartTopEntidades>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartTopEntidades]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartTopEntidades);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
