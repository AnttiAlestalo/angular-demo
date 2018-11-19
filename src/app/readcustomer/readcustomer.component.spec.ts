import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadcustomerComponent } from './readcustomer.component';

describe('ReadcustomerComponent', () => {
  let component: ReadcustomerComponent;
  let fixture: ComponentFixture<ReadcustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadcustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
