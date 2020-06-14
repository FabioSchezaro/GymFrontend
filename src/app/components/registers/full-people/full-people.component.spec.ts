import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullPeopleComponent } from './full-people.component';

describe('FullPeopleComponent', () => {
  let component: FullPeopleComponent;
  let fixture: ComponentFixture<FullPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
