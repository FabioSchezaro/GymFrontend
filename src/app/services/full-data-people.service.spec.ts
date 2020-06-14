import { TestBed } from '@angular/core/testing';

import { FullDataPeopleService } from './full-data-people.service';

describe('FullDataPeopleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FullDataPeopleService = TestBed.get(FullDataPeopleService);
    expect(service).toBeTruthy();
  });
});
