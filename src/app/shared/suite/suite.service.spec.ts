import { TestBed, inject } from '@angular/core/testing';

import { SuiteService } from './suite.service';

describe('SuiteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuiteService]
    });
  });

  it('should be created', inject([SuiteService], (service: SuiteService) => {
    expect(service).toBeTruthy();
  }));
});
