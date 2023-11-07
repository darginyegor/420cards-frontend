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
    const archiveString = this.store.get('LOGS');
    this.archive = archiveString ? JSON.parse(archiveString) : [];
  }

  public log(data: any, title?: string) {
    this._session.push({
      timestamp: new Date().toISOString(),
      title,
      data,
    });
    this.store.set(
      'LOGS',
      JSON.stringify([...this.archive, ...this._session], null, 4)
    );
  }
}
