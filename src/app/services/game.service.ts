import { Injectable } from '@angular/core';
import { Player } from '../interfaces/player';
import { EventsService } from './events.service';
import { UiNotificationsService } from './ui-notifications.service';
import { GameActionType } from '../interfaces/game-action';
import { PunchLineCard } from '../interfaces/punch-line-card';
import { SetupCard } from '../interfaces/setup-card';
import { CountdownService } from './countdown.service';
import { TableSlot } from '../interfaces/table-slot';
import {
  AllPlayersReadyEventData,
  GameEventType,
  GameFinishedEventData,
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
import { PLAYERS_MOCK } from '../mocks';
import { BehaviorSubject } from 'rxjs';

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
  public winner?: Player = PLAYERS_MOCK[0];
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
  public get chosenUuid() {
    return this._chosenUuid;
  }

  private _turnCount$ = new BehaviorSubject(0);
  public turnCount$ = this._turnCount$.asObservable();

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
    allPlayersReady: (data) => this.onAllPlayersReady(data),
    tableCardOpened: (data) => this.onTableCardOpened(data),
    turnEnded: (data) => this.onTurnEnded(data),
    gameFinished: (data) => this.onGameFinished(data),
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

  private _resetTable() {
    this.table.splice(0, this.table.length);
    this.table.length = this.players.length - 1;
  }

  private _setLead(uuid: string) {
    this.players.forEach(
      (player) => (player.state = player.uuid === uuid ? 'leading' : 'default')
    );
  }

  private _getPlayer(uuid: string) {
    return this.players.find((player) => {
      return player.uuid === uuid;
    });
  }

  private onWelcome(data: WelcomeEventData) {
    this._state = data.state;
    this.hand.push(...data.hand.map((card) => new PunchLineCard(card)));
    this.players.push(...data.players);
    this.setup = data.setup;
    this._turnCount$.next(data.turnCount);
    this.isLeading = data.isLeading;

    if (data.leadUuid) {
      this._setLead(data.leadUuid);
    }

    if (data.selectedCard) {
      this._chosenUuid = data.selectedCard.uuid;
      this.hand.unshift(new PunchLineCard(data.selectedCard));
    }

    this._resetTable();
    if (data.table?.length) {
      this.table.splice(
        0,
        data.table.length,
        ...data.table.map((slot) => ({
          ...slot,
          card: slot.card ? new PunchLineCard(slot.card) : undefined,
        }))
      );
    }
  }

  private onPlayerJoined(data: PlayerJoinedEventData) {
    this.players.push(data);
  }

  private onPlayerConnected(data: PlayerConnectedEventData) {
    const player = this._getPlayer(data.uuid);
    if (!player) {
      return;
    }
    player.isConnected = true;
  }

  private onPlayerDisconnected(data: PlayerDisonnectedEventData) {
    const player = this._getPlayer(data.uuid);
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
    const player = this._getPlayer(data.uuid);
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

  private onAllPlayersReady(data: AllPlayersReadyEventData) {
    this._chosenUuid = data.chosenCardId;
    this._state = GameState.Judgement;
  }

  public onGameStarted(data: GameStartedEventData) {
    this.hand.push(...data.hand.map((card) => new PunchLineCard(card)));
  }

  public onTurnStarted(data: TurnStartedEventData) {
    this._resetTable();
    this._setLead(data.leadUuid);
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

    if (data.card) {
      this.hand.unshift(new PunchLineCard(data.card));
    }

    this.isLeading = data.isLeading;
    this._turnCount$.next(data.turnCount);
    this.setup = data.setup;
  }

  public onTableCardOpened(data: TableCardOpenedEventData) {
    this.table[data.index].card = new PunchLineCard(data.card);
  }

  public onTurnEnded(data: TurnEndedEventData) {
    const player = this._getPlayer(data.winnerUuid);
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

  public onGameFinished(data: GameFinishedEventData) {
    const player = this._getPlayer(data.winnerUuid);
    this._state = GameState.Finished;
    this.winner = player;
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
