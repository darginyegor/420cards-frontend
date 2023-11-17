import { Injectable } from '@angular/core';
import { Player } from '../interfaces/player';
import { EventsService } from './events.service';
import { UiNotificationsService } from './ui-notifications.service';
import { Router } from '@angular/router';
import { GameActionType } from '../interfaces/game-action';
import { PunchLineCard } from '../interfaces/punch-line-card';
import { SetupCard } from '../interfaces/setup-card';
import { CountdownService } from './countdown.service';

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
    private readonly countdown: CountdownService,
    private readonly events: EventsService,
    private readonly notifications: UiNotificationsService,
    private readonly router: Router
  ) {
    this.events.feed$.subscribe({
      next: (event) => {
        // TODO: make player a class
        switch (event.type) {
          case 'welcome':
            this.onWelcome(event.data.players);
            break;
          case 'playerJoined':
            this.onPlayerJoined(event.data);
            break;
          case 'playerConnected':
            this.onPlayerConnected(event.data.uuid);
            break;
          case 'playerDisconnected':
            this.onPlayerDisconnected(event.data.uuid);
            break;
          case 'playerLeft':
            this.onPlayerLeft(event.data.uuid);
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
            this.hand.push(...event.data.hand);
            this._isLobbyControlsVisible = false;
            break;
          case 'turnStarted':
            this.countdown.start(3).subscribe({
              next: (i) => {
                this._isHandVisible = !event.data.isLeading;
                this._isSetupVisible = !event.data.isLeading;
                this._isHandActive = !event.data.isLeading;
                this._isTableVisible = event.data.isLeading;
              },
            });
            break;
          case 'playerReady':
            this.onPlayerReady(event.data.uuid);
        }
      },
    });
  }

  private onWelcome(players: Player[]) {
    this._isInitialized = true;
    this.players.push(...players);
  }

  private onPlayerJoined(player: Player) {
    this.players.push(player);
  }

  private onPlayerConnected(uuid: string) {
    const player = this.players.find((player) => player.uuid === uuid);
    if (!player) {
      return;
    }
    player.isConnected = true;
  }

  private onPlayerDisconnected(uuid: string) {
    const player = this.players.find((player) => player.uuid === uuid);
    if (!player) {
      return;
    }
    player.isConnected = false;
  }

  private onPlayerLeft(uuid: string) {
    const index = this.players.findIndex((player) => player.uuid === uuid);
    if (index < 0) {
      return;
    }
    this.players.splice(index, 1);
  }

  private onPlayerReady(uuid: string) {
    const player = this.players.find((player) => player.uuid === uuid);
    if (!player) {
      return;
    }
    player.state = 'ready';
  }

  public init() {
    if (!this.isInitialized) {
      this.events.init();
    }
  }

  public start() {
    // TODO check game state (actually add states)
    this.events.emit({
      id: 0,
      type: GameActionType.StartGame,
      data: {
        timeout: null,
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
