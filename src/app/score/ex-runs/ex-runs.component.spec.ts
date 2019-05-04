import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExRunsComponent } from './ex-runs.component';

describe('ExRunsComponent', () => {
  let component: ExRunsComponent;
  let fixture: ComponentFixture<ExRunsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExRunsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExRunsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
