import { Injectable } from '@angular/core';
import { GameEvent } from '../interfaces/game-event.interface';
import { Subject, tap } from 'rxjs';
import { GameAction } from '../interfaces/game-action';
import { ConnectionResponse } from './api.service';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private socket?: WebSocket;
  private _feed$ = new Subject<GameEvent>();
  private _host? = localStorage.getItem('LOBBY_HOST_CACHED');
  private _lobbyToken? = localStorage.getItem('LOBBY_TOKEN_CACHED');
  private _playerToken? = localStorage.getItem('PLAYER_TOKEN_CACHED');

  constructor(private store: StoreService) {}

  public get isConnected() {
    return !!this.socket?.OPEN;
  }

  public get lobbyToken() {
    return this._lobbyToken || '';
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
    return this._feed$.asObservable().pipe(
      tap((event) => {
        switch (event.type) {
          case 'playerConnected':
            this.store.setMany({
              LOBBY_HOST_CACHED: this._host,
              LOBBY_TOKEN_CACHED: this._lobbyToken,
              PLAYER_TOKEN_CACHED: this._playerToken,
            });
        }
      })
    );
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
