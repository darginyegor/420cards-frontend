import { GameState } from '../services/game.service';
import { Player } from './player';
import { PunchLineCardSchema } from './punch-line-card';
import { SetupCard } from './setup-card';
import { TableSlotSchema } from './table-slot';

export enum GameEventType {
  Welcome = 'welcome',
  PlayerJoined = 'playerJoined',
  PlayerConnected = 'playerConnected',
  PlayerReady = 'playerReady',
  AllPlayersReady = 'allPlayersReady',
  PlayerDisconnected = 'playerDisconnected',
  PlayerLeft = 'playerLeft',
  OwnerChanged = 'ownerChanged',
  GameStarted = 'gameStarted',
  TurnStarted = 'turnStarted',
  TableCardOpened = 'tableCardOpened',
  TurnEnded = 'turnEnded',
  GameFinished = 'gameFinished',
  Error = 'error',
  PlayerScoreChanged = 'playerScoreChanged',
  HandRefreshed = 'handRefreshed',
}

export interface GameEvent<T = any> {
  id?: number;
  type: GameEventType;
  data: T;
}

export interface WelcomeEventData {
  players: Player[];
  hand: PunchLineCardSchema[];
  setup: SetupCard;
  table: TableSlotSchema[];
  state: GameState;
  leadUuid?: string;
  selfUuid: string;
  ownerUuid: string;
  turnCount: number;
  selectedCard?: PunchLineCardSchema;
}

export interface PlayerJoinedEventData extends Player {}

export interface PlayerConnectedEventData {
  uuid: string;
}

export interface PlayerDisonnectedEventData {
  uuid: string;
}

export interface PlayerLeftEventData {
  uuid: string;
}

export interface OwnerChangedEventData {
  uuid: string;
}

export interface GameStartedEventData {
  hand: PunchLineCardSchema[];
}

export interface TurnStartedEventData {
  leadUuid: string;
  card?: PunchLineCardSchema;
  setup: SetupCard;
  turnCount: number;
  turnDuration: number | null;
}

export interface PlayerReadyEventData {
  uuid: string;
}

export interface AllPlayersReadyEventData {
  chosenCardId: number;
}

export interface TableCardOpenedEventData {
  index: number;
  card: PunchLineCardSchema;
}

export interface TurnEndedEventData {
  winnerUuid: string;
  cardId: number;
  score: number;
}

export interface GameFinishedEventData {
  winnerUuid: string;
}

export interface PlayerScoreChangedEventData {
  uuid: string;
  score: number;
}

export interface HandRefreshedEventData {
  hand: PunchLineCardSchema[];
}
