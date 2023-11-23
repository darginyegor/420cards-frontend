import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { LogRecord, LogRecordType } from '../interfaces/log-record';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  public readonly archive: LogRecord[];
  private _session: LogRecord[] = [];

  constructor(private readonly store: StoreService) {
    const archiveString = this.store.get('LOGS');
    this.archive = archiveString ? JSON.parse(archiveString) : [];
  }

  public get all() {
    return [...this._session, ...this.archive];
  }

  public log(type: LogRecordType, data: any) {
    this._session.push({
      timestamp: new Date().toISOString(),
      type,
      data,
    });
    this.store.set(
      'LOGS',
      JSON.stringify([...this.archive, ...this._session].slice(-50), null, 4)
    );
  }
}
