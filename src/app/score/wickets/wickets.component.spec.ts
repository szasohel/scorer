import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WicketsComponent } from './wickets.component';

describe('WicketsComponent', () => {
  let component: WicketsComponent;
  let fixture: ComponentFixture<WicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
