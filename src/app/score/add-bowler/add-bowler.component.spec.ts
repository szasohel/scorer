import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBowlerComponent } from './add-bowler.component';

describe('AddBowlerComponent', () => {
  let component: AddBowlerComponent;
  let fixture: ComponentFixture<AddBowlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBowlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBowlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
