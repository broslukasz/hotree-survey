import { TestBed } from '@angular/core/testing';

import { NewEventDataService } from './new-event-data.service';

describe('NewEventDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [NewEventDataService]
  }));

  it('should be created', () => {
    const service: NewEventDataService = TestBed.get(NewEventDataService);
    expect(service).toBeTruthy();
  });
});
