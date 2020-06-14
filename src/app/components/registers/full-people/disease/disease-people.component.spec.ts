import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseasePeopleComponent } from './disease-people.component';

describe('DiseasePeopleComponent', () => {
  let component: DiseasePeopleComponent;
  let fixture: ComponentFixture<DiseasePeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseasePeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseasePeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
