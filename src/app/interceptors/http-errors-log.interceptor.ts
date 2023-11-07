import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LogsService } from '../services/logs.service';

@Injectable()
export class HttpErrorsLogInterceptor implements HttpInterceptor {
  constructor(private readonly logs: LogsService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        const { url, urlWithParams, method, body } = request;
        this.logs.log(
          {
            request: {
              url,
              urlWithParams,
              method,
              body,
            },
            error: error,
          },
          'http error'
        );
        return throwError(error);
      })
    );
  }
}
