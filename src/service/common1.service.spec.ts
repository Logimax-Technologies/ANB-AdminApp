import { TestBed } from '@angular/core/testing';

import { Common1Service } from './common1.service';

describe('Common1Service', () => {
  let service: Common1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Common1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
