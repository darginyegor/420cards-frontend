import { Injectable } from '@angular/core';
import { Player } from '../interfaces/player';
import { EventsService } from './events.service';
import { UiNotificationsService } from './ui-notifications.service';
import { Router } from '@angular/router';
import { GameActionType } from '../interfaces/game-action';
import { PunchLineCard } from '../interfaces/punch-line-card';
import { PUNCH_LINE_CARDS } from '../mocks';
import { SetupCard } from '../interfaces/setup-card';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public readonly players: Player[] = [];
  public readonly hand: PunchLineCard[] = [];
  public readonly table: PunchLineCard[] = [];
  public readonly setup: SetupCard | null = null;

  private _isSetupVisible = false;
  public get isSetupVisible() {
    return this._isSetupVisible;
  }

  private _isHandVisible = false;
  public get isHandVisible() {
    return this._isHandVisible;
  }

  private _isHandActive = false;
  public get isHandActive() {
    return this._isHandActive;
  }

  private _isLobbyControlsVisible = true;
  public get isLobbyControlsVisible() {
    return this._isLobbyControlsVisible;
  }
  private _isTableVisible = false;
  public get isTableVisible() {
    return this._isTableVisible;
  }

  private _isInitialized = false;
  public get isInitialized() {
    return this._isInitialized;
  }

  public get lobbyToken() {
    return this.events.lobbyToken;
  }

  constructor(
    private readonly events: EventsService,
    private readonly notifications: UiNotificationsService,
    private readonly router: Router
  ) {
    this.events.feed$.subscribe({
      next: (event) => {
        // TODO: make player a class
        let player: Player | undefined;
        switch (event.type) {
          case 'welcome':
            this._isInitialized = true;
            this.players.push(...event.data.players);
            break;
          case 'playerJoined':
            this.players.push(event.data);
            break;
          case 'playerConnected':
            player = this.players.find(
              (player) => player.uuid === event.data.uuid
            );
            if (!player) {
              return;
            }
            player.isConnected = true;
            break;
          case 'playerDisconnected':
            player = this.players.find(
              (player) => player.uuid === event.data.uuid
            );
            if (!player) {
              return;
            }
            player.isConnected = false;
            break;
          case 'playerLeft':
            const index = this.players.findIndex(
              (player) => player.uuid === event.data.uuid
            );
            if (index < 0) {
              return;
            }
            this.players.splice(index, 1);
            break;
          case 'connectionError':
            this.notifications.notification({
              icon: '🤡',
              name: 'Нас не пускают',
              message: 'Возможно, мы стучимся не туда...',
            });
            this.router.navigate(['/']);
            break;
          case 'ownerChanged':
            this.players.forEach((player) => {
              player.isLobbyOwner = player.uuid === event.data.uui;
            });
            break;
          case 'gameStarted':
            this.notifications.notification({
              icon: '💖',
              name: 'Игра началась',
              message: 'По крайней мере, так сказали ребята...',
            });
            this.hand.push(...event.data.hand);
            this._isHandVisible = true;
            this._isSetupVisible = true;
            this._isLobbyControlsVisible = false;
            break;
          case 'turnStarted':
            this._isHandVisible = !event.data.isLeading;
            this._isSetupVisible = !event.data.isLeading;
            this._isHandActive = !event.data.isLeading;
            this._isTableVisible = event.data.isLeading;
        }
      },
    });
  }

  public init() {
    if (!this.isInitialized) {
      this.events.init();
    }
  }

  public start() {
    // TODO check game state (actually add states)
    // this.events.emit({
    //   id: 0,
    //   type: GameActionType.StartGame,
    //   data: {
    //     timeout: null,
    //   },
    // });
    this.events.fabricate({
      id: 0,
      type: 'gameStarted',
      data: {
        hand: PUNCH_LINE_CARDS,
      },
    });
    this.events.fabricate({
      id: 0,
      type: 'turnStarted',
      data: {
        isLeading: false,
      },
    });
  }

  public makeTurn(uuid: string) {
    this.events.emit({
      id: 0,
      type: GameActionType.MakeTurn,
      data: {
        uuid,
      },
    });
    this._isHandActive = false;
  }
}
