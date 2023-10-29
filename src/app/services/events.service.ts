import { Injectable } from '@angular/core';
import { GameEvent } from '../interfaces/game-event.interface';
import { Subject } from 'rxjs';
import { GameAction } from '../interfaces/game-action';
import { ConnectionResponse } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private socket?: WebSocket;
  private _feed$ = new Subject<GameEvent>();
  private _host?: string;
  private _lobbyToken?: string;
  private _playerToken?: string;

  constructor() {}

  public get isConnected() {
    return !!this.socket?.OPEN;
  }

  public get lobbyToken() {
    return this._lobbyToken;
  }

  public setConnectionInfo(info: ConnectionResponse): void {
    this._host = info.host;
    this._lobbyToken = info.lobbyToken;
    this._playerToken = info.playerToken;
  }

  public listen() {
    this.socket = new WebSocket(
      `${this._host}?lobbyToken=${this._lobbyToken}&playerToken=${this._playerToken}`
    );

    this.socket.onmessage = (event) => {
      this._feed$.next(JSON.parse(event.data));
    };

    this.socket.onclose = (_event) => {
      this.socket = undefined;
    };
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
