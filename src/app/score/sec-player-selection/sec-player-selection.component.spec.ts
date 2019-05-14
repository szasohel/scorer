import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecPlayerSelectionComponent } from './sec-player-selection.component';

describe('SecPlayerSelectionComponent', () => {
  let component: SecPlayerSelectionComponent;
  let fixture: ComponentFixture<SecPlayerSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecPlayerSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecPlayerSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
