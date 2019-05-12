import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveScoreComponent } from './live-score.component';

describe('LiveScoreComponent', () => {
  let component: LiveScoreComponent;
  let fixture: ComponentFixture<LiveScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
