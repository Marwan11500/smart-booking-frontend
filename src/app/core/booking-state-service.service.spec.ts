import { TestBed } from '@angular/core/testing';

import { BookingStateServiceService } from './booking-state-service.service';

describe('BookingStateServiceService', () => {
  let service: BookingStateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingStateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
