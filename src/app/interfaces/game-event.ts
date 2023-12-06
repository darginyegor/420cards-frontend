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
  isLeading: boolean;
  leadUuid?: string;
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
  isLeading: boolean;
  card?: PunchLineCardSchema;
  setup: SetupCard;
  turnCount: number;
}

export interface PlayerReadyEventData {
  uuid: string;
}

export interface TableCardOpenedEventData {
  index: number;
  card: PunchLineCardSchema;
}

export interface TurnEndedEventData {
  winnerUuid: string;
  cardUuid: string;
  score: number;
}

export interface GameFinishedEventData {
  winnerUuid: string;
}
