import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseGridFormComponent } from './base-grid-form.component';

describe('BaseGridFormComponent', () => {
  let component: BaseGridFormComponent;
  let fixture: ComponentFixture<BaseGridFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseGridFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseGridFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
