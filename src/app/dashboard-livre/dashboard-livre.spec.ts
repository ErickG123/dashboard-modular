import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLivre } from './dashboard-livre';

describe('DashboardLivre', () => {
  let component: DashboardLivre;
  let fixture: ComponentFixture<DashboardLivre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardLivre]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardLivre);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
