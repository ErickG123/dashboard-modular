import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoTransportadoras } from './grafico-transportadoras';

describe('GraficoTransportadoras', () => {
  let component: GraficoTransportadoras;
  let fixture: ComponentFixture<GraficoTransportadoras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoTransportadoras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoTransportadoras);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
