import { TestBed } from '@angular/core/testing';

import { UserNotTaken.ValidatorService } from './user-not-taken.validator.service';

describe('UserNotTaken.ValidatorService', () => {
  let service: UserNotTaken.ValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserNotTaken.ValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
