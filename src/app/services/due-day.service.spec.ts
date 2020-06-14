import { TestBed } from '@angular/core/testing';

import { DueDayService } from './due-day.service';

describe('DuoDayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DueDayService = TestBed.get(DueDayService);
    expect(service).toBeTruthy();
  });
});
