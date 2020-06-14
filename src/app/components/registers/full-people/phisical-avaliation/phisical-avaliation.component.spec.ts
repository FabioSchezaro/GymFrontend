import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhisicalAvaliationComponent } from './phisical-avaliation.component';

describe('PhisicalAvaliationComponent', () => {
  let component: PhisicalAvaliationComponent;
  let fixture: ComponentFixture<PhisicalAvaliationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhisicalAvaliationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhisicalAvaliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
