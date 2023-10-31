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
  private _host? = this.store.get('LOBBY_HOST_CACHED');
  private _lobbyToken? = this.store.get('LOBBY_TOKEN_CACHED');
  private _playerToken? = this.store.get('PLAYER_TOKEN_CACHED');

  private _feed$ = new Subject<GameEvent>();
  public feed$ = this._feed$.asObservable().pipe(
    tap((event) => {
      switch (event.type) {
        case 'welcome':
          this.store.setMany([
            ['LOBBY_HOST_CACHED', this._host],
            ['LOBBY_TOKEN_CACHED', this._lobbyToken],
            ['PLAYER_TOKEN_CACHED', this._playerToken],
          ]);
      }
    })
  );

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

  public init() {
    this.socket = new WebSocket(
      `${this._host}?lobbyToken=${this._lobbyToken}&playerToken=${this._playerToken}`
    );

    this.socket.onmessage = (event) => {
      this._feed$.next(JSON.parse(event.data));
    };

    this.socket.onclose = (_event) => {
      this.socket = undefined;
    };
  }

  public listen() {
    if (!this.socket) {
      this.init();
    }

    return this.feed$;
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
