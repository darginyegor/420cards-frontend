import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { LogRecord } from '../interfaces/log-record';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  public readonly archive: LogRecord[];
  private _session: LogRecord[] = [];

  constructor(private readonly store: StoreService) {
    this.archive = JSON.parse(this.store.get('LOGS') || '');
  }

  public log(data: any) {
    this._session.push({
      timestamp: new Date().toISOString(),
      data,
    });
    this.store.set(
      'LOGS',
      JSON.stringify([...this.archive, ...this._session], null, 4)
    );
  }
}
