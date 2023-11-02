import { Player } from './player.interface';

export type GameEventType =
  | 'playerReady'
  | 'welcome'
  | 'playerJoined'
  | 'playerConnected'
  | 'playerDisconnected'
  | 'playerLeft'
  | 'connectionError'
  | 'connectionLost';

export interface GameEvent {
  id?: number;
  type: GameEventType;
  data: any;
}
