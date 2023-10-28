import { Injectable } from '@angular/core';
import { GameEvent } from '../interfaces/game-event.interface';
import { Subject } from 'rxjs';
import { GameAction } from '../interfaces/game-action';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private socket?: WebSocket;
  private _feed$ = new Subject<GameEvent>();

  constructor() {}

  public get isConnected() {
    return !!this.socket?.OPEN;
  }

  public listen() {
    // this.socket = new WebSocket('');

    // this.socket.onmessage = (event) => {
    //   this._feed$.next(event.data);
    // };

    // this.socket.onclose = (_event) => {
    //   this.socket = undefined;
    // };
    return this._feed$.asObservable();
  }

  public emit(action: GameAction): void {
    if (!this.socket) {
      throw new Error(
        'No connection established. First, establish a connecton via calling listen().'
      );
    }

    this.socket.send(JSON.stringify(action));
  }

  public receiveDummy(event: GameEvent): void {
    this._feed$.next(event);
  }
}
