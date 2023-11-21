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
import {
  GameEventType,
  GameStartedEventData,
  OwnerChangedEventData,
  PlayerConnectedEventData,
  PlayerDisonnectedEventData,
  PlayerJoinedEventData,
  PlayerLeftEventData,
  PlayerReadyEventData,
  TableCardOpenedEventData,
  TurnEndedEventData,
  TurnStartedEventData,
  WelcomeEventData,
} from '../interfaces/game-event';

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
  public setup?: SetupCard;
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

  private _turnIndex = 0;
  public get turnIndex() {
    return this._turnIndex;
  }

  private readonly eventHandlersMap: {
    [key in GameEventType]: (data: any) => void;
  } = {
    welcome: (data) => this.onWelcome(data),
    playerJoined: (data) => this.onPlayerJoined(data),
    playerConnected: (data) => this.onPlayerConnected(data),
    playerDisconnected: (data) => this.onPlayerDisconnected(data),
    playerLeft: (data) => this.onPlayerLeft(data),
    ownerChanged: (data) => this.onOwnerChanged(data),
    gameStarted: (data) => this.onGameStarted(data),
    turnStarted: (data) => this.onTurnStarted(data),
    playerReady: (data) => this.onPlayerReady(data),
    allPlayersReady: () => this.onAllPlayersReady(),
    tableCardOpened: (data) => this.onTableCardOpened(data),
    turnEnded: (data) => this.onTurnEnded(data),
  };

  constructor(
    private readonly countdown: CountdownService,
    private readonly events: EventsService,
    private readonly notifications: UiNotificationsService
  ) {
    this.events.feed$.subscribe({
      next: (event) => {
        this.eventHandlersMap[event.type](event.data);
      },
    });
  }

  private onWelcome(data: WelcomeEventData) {
    this._state = data.state;
    this.players.push(...data.players);
  }

  private onPlayerJoined(data: PlayerJoinedEventData) {
    this.players.push(data);
  }

  private onPlayerConnected(data: PlayerConnectedEventData) {
    const player = this.players.find((player) => player.uuid === data.uuid);
    if (!player) {
      return;
    }
    player.isConnected = true;
  }

  private onPlayerDisconnected(data: PlayerDisonnectedEventData) {
    const player = this.players.find((player) => player.uuid === data.uuid);
    if (!player) {
      return;
    }
    player.isConnected = false;
  }

  private onPlayerLeft(data: PlayerLeftEventData) {
    const index = this.players.findIndex((player) => player.uuid === data.uuid);
    if (index < 0) {
      return;
    }
    this.players.splice(index, 1);
  }

  private onOwnerChanged(data: OwnerChangedEventData) {
    this.players.forEach((player) => {
      player.isLobbyOwner = player.uuid === data.uuid;
    });
  }

  private onPlayerReady(data: PlayerReadyEventData) {
    const player = this.players.find((player) => player.uuid === data.uuid);
    if (!player) {
      return;
    }
    player.state = 'ready';

    this.table.find((item, index) => {
      if (!item) {
        this.table[index] = {};
        return true;
      } else {
        return false;
      }
    });
  }

  private onAllPlayersReady() {
    this._state = GameState.Judgement;
  }

  public onGameStarted(data: GameStartedEventData) {
    this.hand.push(...data.hand.map((card) => new PunchLineCard(card)));
  }

  public onTurnStarted(data: TurnStartedEventData) {
    this.table.splice(0, this.table.length);
    this.table.length = this.players.length - 1;
    this.players.forEach(
      (player) =>
        (player.state = player.uuid === data.leadUuid ? 'leading' : 'default')
    );
    this.countdown.start(3).subscribe({
      next: () => {
        this._state = GameState.Turns;
        if (data.isLeading) {
          // MAYBE do something, maybe not
          // this.notifications.notification({
          //   icon: '🫵',
          //   name: 'Ты - ведущий!',
          //   message: 'Какой-нибудь текст здесь ещё написан лаконичный',
          // });
        }
      },
    });

    if (this._chosenUuid) {
      const index = this.hand.findIndex(
        (card) => card.uuid === this._chosenUuid
      );
      this.hand.splice(index, 1);
    }
    this._chosenUuid = '';

    if (data.card) {
      this.hand.push(new PunchLineCard(data.card));
    }

    this.isLeading = data.isLeading;
    this._turnIndex++;
    this.setup = data.setup;
  }

  public onTableCardOpened(data: TableCardOpenedEventData) {
    this.table[data.index].card = data.card;
  }

  public onTurnEnded(data: TurnEndedEventData) {
    const player = this.players.find((player) => {
      return player.uuid === data.winnerUuid;
    });
    if (!player) {
      return;
    }
    player.score = data.score;
    this.table.find((answer) => {
      if (answer.card?.uuid === data.cardUuid) {
        answer.isPicked = true;
        answer.author = player.name;
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
