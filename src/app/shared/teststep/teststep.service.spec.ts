import { TestBed, inject } from '@angular/core/testing';

import { TeststepService } from './teststep.service';

describe('TestcaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeststepService]
    });
  });

  it('should be created', inject([TeststepService], (service: TeststepService) => {
    expect(service).toBeTruthy();
  }));
});
