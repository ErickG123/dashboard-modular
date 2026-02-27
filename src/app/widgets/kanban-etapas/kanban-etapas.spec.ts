import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanEtapas } from './kanban-etapas';

describe('KanbanEtapas', () => {
  let component: KanbanEtapas;
  let fixture: ComponentFixture<KanbanEtapas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanEtapas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanEtapas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
