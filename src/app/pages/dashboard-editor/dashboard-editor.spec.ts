import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEditor } from './dashboard-editor';

describe('DashboardEditor', () => {
  let component: DashboardEditor;
  let fixture: ComponentFixture<DashboardEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEditor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
