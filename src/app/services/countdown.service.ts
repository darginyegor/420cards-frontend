import { Injectable } from '@angular/core';
import {
  Subject,
  delay,
  filter,
  map,
  of,
  switchMap,
  take,
  tap,
  timer,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  private _countdownTrigger$ = new Subject<number>();
  public readonly countdown$ = this._countdownTrigger$.pipe(
    tap(() => (this._isBusy = true)),
    switchMap((duration) =>
      timer(0, 1000).pipe(
        map((i) => duration - i),
        take(duration + 1),
        tap((i) => (this._isBusy = !!i))
      )
    )
  );

  private _isBusy = false;

  constructor() {}

  public start(duration: number) {
    if (!this._isBusy) {
      this._countdownTrigger$.next(duration);
    }
    return of(null).pipe(delay(duration * 1000), take(1));
  }
}
