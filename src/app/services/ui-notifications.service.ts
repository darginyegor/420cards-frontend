import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface UiNotification {
  name: string;
  message?: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UiNotificationsService {
  private _feed$ = new Subject<UiNotification>();
  public feed$ = this._feed$.asObservable();

  constructor() {}

  public notification(error: UiNotification) {
    this._feed$.next(error);
  }
}
