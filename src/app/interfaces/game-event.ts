import { GameState } from '../services/game.service';
import { Player } from './player';
import { PunchLineCard } from './punch-line-card';
import { SetupCard } from './setup-card';

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
}

export interface GameEvent<T = any> {
  id?: number;
  type: GameEventType;
  data: T;
}

export interface WelcomeEventData {
  players: Player[];
  hand: PunchLineCard[];
  setup: SetupCard[];
  // TODO: narrow table type
  table: any[];
  state: GameState;
}

export interface PlayerJoinedEventData {
  player: Player;
}

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
  hand: PunchLineCard[];
}

export interface TurnStartedEventData {
  uuid: string;
  isLeading: boolean;
  card?: PunchLineCard;
  setup: SetupCard;
}

export interface PlayerReadyEventData {
  uuid: string;
}

export interface TableCardOpenedEventData {
  index: number;
  card: PunchLineCard;
}

export interface TurnEndedEventData {
  winnerUuid: string;
  cardUuid: string;
  score: number;
}
