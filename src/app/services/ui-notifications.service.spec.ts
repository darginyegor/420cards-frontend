import { TestBed } from '@angular/core/testing';

import { UiNotificationsService } from './ui-notifications.service';

describe('UiNotificationsService', () => {
  let service: UiNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
