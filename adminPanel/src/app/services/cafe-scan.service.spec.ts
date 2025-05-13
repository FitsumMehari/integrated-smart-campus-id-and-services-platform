import { TestBed } from '@angular/core/testing';

import { CafeScanService } from './cafe-scan.service';

describe('CafeScanService', () => {
  let service: CafeScanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CafeScanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
