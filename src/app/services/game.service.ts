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

export enum GameState {
  Void = 'void',
  Gathering = 'gathering',
  Turns = 'turns',
  Judgement = 'judgement',
  Congrats = 'congrats',
  Finished = 'finished',
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public readonly players: Player[] = [];
  public readonly hand: PunchLineCard[] = [];
  public readonly table: TableSlot[] = [];
  public setup: SetupCard | null = null;
  public isLeading = false;

  private _state: GameState = GameState.Void;
  public get state() {
    return this._state;
  }

  public get lobbyToken() {
    return this.events.lobbyToken;
  }

  private _chosenUuid = '';
  public get hasChosenCard() {
    return Boolean(this._chosenUuid);
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
            this.onWelcome(event.data.players, event.data.state);
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
            this.onGameStarted(event.data.hand);
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
            this.onAllPlayersReady();
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

  private onWelcome(players: Player[], state: GameState) {
    this._state = state;
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

  private onAllPlayersReady() {
    this._state = GameState.Judgement;
  }

  public onGameStarted(hand: PunchLineCard[]) {
    this.hand.push(...hand);
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
      next: () => {
        this._state = GameState.Turns;
      },
    });

    if (this._chosenUuid) {
      const index = this.hand.findIndex(
        (card) => card.uuid === this._chosenUuid
      );
      this.hand.splice(index, 1);
    }
    this._chosenUuid = '';

    if (card) {
      this.hand.push(card);
    }

    this.isLeading = isLeading;
    this._turnIndex++;
    this.setup = setup;
  }

  public onTurnEnded(event: any) {
    const player = this.players.find((player) => {
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
    if (this.state === GameState.Void) {
      this.events.init();
    }
  }

  public start() {
    if (this.state !== GameState.Gathering) {
      throw new Error('Game already started or not yet initialized.');
    }

    this.events.emit({
      type: GameActionType.StartGame,
      data: {
        timeout: null,
      },
    });
  }

  public makeTurn(uuid: string) {
    this.events.emit({
      type: GameActionType.MakeTurn,
      data: {
        uuid,
      },
    });
    this._chosenUuid = uuid;
  }

  public openTableCard(index: number) {
    this.events.emit({
      type: GameActionType.OpenTableCard,
      data: {
        index,
      },
    });
  }

  public pickWinner(uuid: string) {
    this.events.emit({
      type: GameActionType.PickWinner,
      data: {
        uuid,
      },
    });
  }
}
