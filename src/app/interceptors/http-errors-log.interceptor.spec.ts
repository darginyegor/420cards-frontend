import { TestBed } from '@angular/core/testing';

import { HttpErrorsLogInterceptor } from './http-errors-log.interceptor';

describe('HttpErrorsLogInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [HttpErrorsLogInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: HttpErrorsLogInterceptor = TestBed.inject(
      HttpErrorsLogInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
