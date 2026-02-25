import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoKanban } from './resumo-kanban';

describe('ResumoKanban', () => {
  let component: ResumoKanban;
  let fixture: ComponentFixture<ResumoKanban>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumoKanban]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumoKanban);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
