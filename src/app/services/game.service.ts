import { Injectable } from '@angular/core';
import { Player } from '../interfaces/player';
import { EventsService } from './events.service';
import { UiNotificationsService } from './ui-notifications.service';
import { Router } from '@angular/router';
import { GameActionType } from '../interfaces/game-action';
import { PunchLineCard } from '../interfaces/punch-line-card';
import { SetupCard } from '../interfaces/setup-card';
import { CountdownService } from './countdown.service';
import { TableSlot } from '../interfaces/table-slot';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public readonly players: Player[] = [];
  public readonly hand: PunchLineCard[] = [];
  public readonly table: TableSlot[] = [];
  public setup: SetupCard | null = null;

  // TODO: refactor'
  public chosenUuid = '';

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

  private _turnIndex = -1;

  constructor(
    private readonly countdown: CountdownService,
    private readonly events: EventsService,
    private readonly notifications: UiNotificationsService,
    private readonly router: Router
  ) {
    this.events.feed$.subscribe({
      next: (event) => {
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
            this.onTurnStarted(
              event.data.leadUuid,
              event.data.isLeading,
              event.data.card,
              event.data.setup
            );
            break;
          case 'playerReady':
            this.onPlayerReady(event.data.uuid);
            break;
          case 'allPlayersReady':
            this._isHandVisible = false;
            this._isTableVisible = true;
            break;
          case 'tableCardOpened':
            this.table[event.data.index].card = event.data.card;
            break;
          case 'turnEnded':
            this.onTurnEnded(event.data);
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

    this.table.find((item) => {
      if (item.isEmpty) {
        item.isEmpty = false;
        return true;
      } else {
        return false;
      }
    });
  }

  public onTurnStarted(
    uuid: string,
    isLeading: boolean,
    card: PunchLineCard,
    setup: SetupCard
  ) {
    this.table.splice(0, this.table.length);
    this.table.length = 0;
    for (let i = 0; i < this.players.length - 1; i++) {
      this.table.push({
        isEmpty: true,
      });
    }
    this.players.forEach(
      (player) => (player.state = player.uuid === uuid ? 'leading' : 'default')
    );
    this.countdown.start(3).subscribe({
      next: (i) => {
        this._isHandVisible = !isLeading;
        this._isSetupVisible = true;
        this._isHandActive = !isLeading;
        this._isTableVisible = isLeading;
      },
    });

    if (this.chosenUuid) {
      const index = this.hand.findIndex(
        (card) => card.uuid === this.chosenUuid
      );
      this.hand.splice(index, 1);
    }
    this.chosenUuid = '';

    if (card) {
      this.hand.push(card);
    }

    this._turnIndex++;
    this.setup = setup;
  }

  public onTurnEnded(event: any) {
    const player = this.players.find((player) => {
      console.log(player.uuid, event.winnerUuid);
      return player.uuid === event.winnerUuid;
    });
    if (!player) {
      return;
    }
    player.score = event.score;
    this.table.find((answer) => {
      if (answer.card?.uuid === event.cardUuid) {
        answer.isWinner = true;
        return true;
      } else {
        return false;
      }
    });
    this.notifications.notification({
      icon: '🎉',
      name: `Победил ${player.name}`,
      message: 'Красиво рисовать я это пока не умею, но скоро научусь.',
    });
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
    this.chosenUuid = uuid;
  }

  public openTableCard(index: number) {
    this.events.emit({
      id: 0,
      type: GameActionType.OpenTableCard,
      data: {
        index,
      },
    });
  }

  public pickWinner(uuid: string) {
    this.events.emit({
      id: 0,
      type: GameActionType.PickWinner,
      data: {
        uuid,
      },
    });
  }
}
