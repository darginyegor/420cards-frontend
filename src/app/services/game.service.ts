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
import { BehaviorSubject, ReplaySubject, switchMap, take, timer } from 'rxjs';
import { GameSettings } from './game-settings.service';

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
  public winner?: Player;
  public setup?: SetupCard;

  private _state: GameState = GameState.Void;
  public get state() {
    return this._state;
  }

  public get isInitialized() {
    return this._state !== GameState.Void;
  }

  public get lobbyToken() {
    return this.events.lobbyToken;
  }

  private _chosenCardId?: number;
  public get hasChosenCard() {
    return Boolean(this._chosenCardId);
  }
  public get chosenCardId() {
    return this._chosenCardId;
  }

  private _turnCount$ = new BehaviorSubject(0);
  public turnCount$ = this._turnCount$.asObservable();

  private _turnTimerTrigger$ = new ReplaySubject<number>(1);
  public turnTimer$ = this._turnTimerTrigger$.pipe(
    switchMap((duration) => timer(0, 1000).pipe(take(duration + 1)))
  );
  public turnDuration$ = this._turnTimerTrigger$.asObservable();

  private _selfUuid?: string;
  private _leadUuid?: string;
  private _ownerUuid?: string;

  public get isOwner() {
    return this._selfUuid === this._ownerUuid;
  }

  public get isLeading() {
    return this._selfUuid === this._leadUuid;
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
    allPlayersReady: (data) => this.onAllPlayersReady(data),
    tableCardOpened: (data) => this.onTableCardOpened(data),
    turnEnded: (data) => this.onTurnEnded(data),
    gameFinished: (data) => this.onGameFinished(data),
    error: (data) => this.onError(data),
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

  private _resetPlayersScore() {
    this.players.forEach((player) => {
      player.score = 0;
    });
  }

  private _clearHand() {
    this.hand.length = 0;
  }

  private _clearPlayers() {
    this.players.length = 0;
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

    this._clearHand();
    this.hand.push(...data.hand.map((card) => new PunchLineCard(card)));

    this._clearPlayers();
    this.players.push(...data.players);

    this.setup = data.setup;
    this._turnCount$.next(data.turnCount);
    this._selfUuid = data.selfUuid;
    this._ownerUuid = data.ownerUuid;

    if (data.leadUuid) {
      this._leadUuid = data.leadUuid;
      this._setLead(data.leadUuid);
    }

    if (data.selectedCard) {
      this._chosenCardId = data.selectedCard.id;
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
    this._ownerUuid = data.uuid;
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
    if (data?.chosenCardId) {
      this._chosenCardId = data?.chosenCardId;
    }
    this._state = GameState.Judgement;
  }

  private onGameStarted(data: GameStartedEventData) {
    this._resetPlayersScore();
    this._clearHand();
    this.hand.push(...data.hand.map((card) => new PunchLineCard(card)));
  }

  private onTurnStarted(data: TurnStartedEventData) {
    this._resetTable();
    this._setLead(data.leadUuid);
    this._state = GameState.Turns;
    this.countdown.start(3);

    if (data.turnDuration) {
      this._turnTimerTrigger$.next(data.turnDuration);
    }

    if (this._chosenCardId) {
      const index = this.hand.findIndex(
        (card) => card.id === this._chosenCardId
      );
      this.hand.splice(index, 1);
    }
    this._chosenCardId = undefined;

    if (data.card) {
      this.hand.unshift(new PunchLineCard(data.card));
    }

    this._leadUuid = data.leadUuid;
    this._turnCount$.next(data.turnCount);
    this.setup = data.setup;
  }

  private onTableCardOpened(data: TableCardOpenedEventData) {
    this.table[data.index].card = new PunchLineCard(data.card);
  }

  private onTurnEnded(data: TurnEndedEventData) {
    const player = this._getPlayer(data.winnerUuid);
    if (!player) {
      return;
    }
    player.score = data.score;
    this.table.find((answer) => {
      if (answer.card?.id === data.cardId) {
        answer.isPicked = true;
        answer.author = player.name;
        return true;
      } else {
        return false;
      }
    });
  }

  private onGameFinished(data: GameFinishedEventData) {
    const player = this._getPlayer(data.winnerUuid);
    if (player) {
      player.state = 'default';
      player.isWinner = true;
    }
    this._state = GameState.Finished;
    this.winner = player;
  }

  private onError(data: any) {
    this.notifications.fromError(data);
  }

  public init() {
    if (this.state === GameState.Void) {
      this.events.init();
    }
  }

  public start(settings: GameSettings) {
    if (![GameState.Gathering, GameState.Finished].includes(this.state)) {
      throw new Error('Game already started or not yet initialized.');
    }

    this.events.emit({
      type: GameActionType.StartGame,
      data: settings,
    });
  }

  public makeTurn(id: number) {
    this.events.emit({
      type: GameActionType.MakeTurn,
      data: {
        id,
      },
    });
    this._chosenCardId = id;
  }

  public openTableCard(index: number) {
    this.events.emit({
      type: GameActionType.OpenTableCard,
      data: {
        index,
      },
    });
  }

  public pickWinner(id: number) {
    this.events.emit({
      type: GameActionType.PickWinner,
      data: {
        id,
      },
    });
  }

  public continue() {
    this.events.emit({
      type: GameActionType.Continue,
      data: null,
    });
  }
}
