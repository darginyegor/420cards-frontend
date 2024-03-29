import { Injectable } from '@angular/core';
import { GameEvent } from '../interfaces/game-event';
import { BehaviorSubject, Subject } from 'rxjs';
import { GameAction, GameActionWithoutId } from '../interfaces/game-action';
import { ConnectionResponse } from './api.service';
import { StoreService } from './store.service';
import { UiNotificationsService } from './ui-notifications.service';
import { LogRecordType } from '../interfaces/log-record';

export enum ConnectionStatus {
  Connected = 'connected',
  Disconnected = 'disconnected',
  Pending = 'pending',
}

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private socket?: WebSocket;
  private _host? = this.store.get('LOBBY_HOST_CACHED');
  private _lobbyToken? = this.store.get('LOBBY_TOKEN_CACHED');
  private _playerToken? = this.store.get('PLAYER_TOKEN_CACHED');

  private _feed$ = new Subject<GameEvent>();
  public feed$ = this._feed$.asObservable();

  private _eventId = 0;
  private _connectionAttemps = 0;

  constructor(
    private readonly store: StoreService,
    private readonly notifications: UiNotificationsService
  ) {}

  private _status$ = new BehaviorSubject(ConnectionStatus.Disconnected);
  public readonly status$ = this._status$.asObservable();

  public get lobbyToken() {
    return this._lobbyToken || '';
  }

  public setConnectionInfo(info: ConnectionResponse): void {
    this._host = info.host;
    this._lobbyToken = info.lobbyToken;
    this._playerToken = info.playerToken;
    this.store.setMany([
      ['PLAYER_TOKEN_CACHED', info.playerToken],
      ['LOBBY_HOST_CACHED', this._host],
      ['LOBBY_TOKEN_CACHED', this._lobbyToken],
    ]);
  }

  public init() {
    if (!this._host || !this._playerToken || !this.lobbyToken) {
      throw new Error(
        `Missing connection configuration:
        host: ${this._host},
        playerToken: ${this._playerToken},
        lobbyTokern: ${this._lobbyToken}`
      );
    }

    this.socket = new WebSocket(
      `${this._host}?lobbyToken=${this._lobbyToken}&playerToken=${this._playerToken}`
    );

    this._status$.next(ConnectionStatus.Pending);

    this.socket.onopen = (event) => {
      this._connectionAttemps = 0;
      this._status$.next(ConnectionStatus.Connected);
      console.log(event);
    };

    this.socket.onmessage = (event) => {
      const eventParsed = JSON.parse(event.data);
      this._feed$.next(eventParsed);
    };

    this.socket.onerror = (error) => {
      console.log(error);
    };

    this.socket.onclose = (event) => {
      console.log(event);
      this.socket = undefined;

      if (event.wasClean || this._connectionAttemps >= 5) {
        this.clearConnectionInfo();
        this._status$.next(ConnectionStatus.Disconnected);
      } else {
        this._status$.next(ConnectionStatus.Pending);
        setTimeout(() => {
          this._connectionAttemps++;
          this.init();
        }, 2000);
      }
    };
  }

  public listen() {
    if (!this.socket) {
      this.init();
    }

    return this.feed$;
  }

  public emit(action: GameActionWithoutId): void {
    if (!this.socket) {
      throw new Error(
        'No connection established. First, establish a connecton via calling listen().'
      );
    }

    const actionWithId: GameAction = {
      id: this._eventId,
      ...action,
    };

    this.socket.send(JSON.stringify(actionWithId));
    this._eventId++;
  }

  public fabricate(event: GameEvent): void {
    this._feed$.next(event);
  }

  public clearConnectionInfo() {
    this.store.clearMany([
      'LOBBY_HOST_CACHED',
      'LOBBY_TOKEN_CACHED',
      'PLAYER_TOKEN_CACHED',
    ]);
    this._host = undefined;
    this._lobbyToken = undefined;
    this._playerToken = undefined;
  }
}
