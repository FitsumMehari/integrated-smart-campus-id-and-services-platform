import { TestBed } from '@angular/core/testing';

import { GateScanService } from './gate-scan.service';

describe('GateScanService', () => {
  let service: GateScanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GateScanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
