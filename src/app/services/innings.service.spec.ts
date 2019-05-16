import { TestBed } from '@angular/core/testing';

import { InningsService } from './innings.service';

describe('InningsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InningsService = TestBed.get(InningsService);
    expect(service).toBeTruthy();
  });
});
