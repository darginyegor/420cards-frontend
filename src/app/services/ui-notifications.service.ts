import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface UiNotification {
  name: string;
  message?: string;
  icon?: string;
}

const ERRORS_MAP: {
  [key: string]: UiNotification;
} = {
  '404': {
    icon: '😳 ',
    name: 'Комната не найдена',
    message: `Возможно, что-то не так с твоей ссылкой,`,
  },
  '403': {
    icon: '😢',
    name: 'Не вускают...',
    message: 'Кажется, там играют без тебя. Вы точно друзья?',
  },
  '0': {
    icon: '😵',
    name: 'Ошибка подключения',
    message: 'Что-то не так с сервером или твоим интернетом.',
  },
};

@Injectable({
  providedIn: 'root',
})
export class UiNotificationsService {
  private _feed$ = new Subject<UiNotification>();
  public feed$ = this._feed$.asObservable();

  constructor() {}

  public notification(notification: UiNotification) {
    this._feed$.next(notification);
  }

  public fromError(error: any) {
    const notification = ERRORS_MAP[String(error.status)] || {
      icon: '🚧 ',
      name: 'Какая-то ошибка',
      message: error.message,
    };
    this.notification(notification);
  }
}
