import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBatsmanComponent } from './add-batsman.component';

describe('AddBatsmanComponent', () => {
  let component: AddBatsmanComponent;
  let fixture: ComponentFixture<AddBatsmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBatsmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBatsmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
