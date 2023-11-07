export type GameEventType =
  | 'playerReady'
  | 'welcome'
  | 'playerJoined'
  | 'playerConnected'
  | 'playerDisconnected'
  | 'playerLeft'
  | 'connectionError'
  | 'connectionLost'
  | 'ownerChanged'
  | 'gameStarted';

export interface GameEvent {
  id?: number;
  type: GameEventType;
  data: any;
}
