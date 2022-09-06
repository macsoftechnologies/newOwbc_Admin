import { TestBed } from '@angular/core/testing';

import { OwbcService } from './owbc.service';

describe('OwbcService', () => {
  let service: OwbcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwbcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
