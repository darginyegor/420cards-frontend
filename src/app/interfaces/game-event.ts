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
  | 'gameStarted'
  | 'turnStarted';

export interface GameEvent {
  id?: number;
  type: GameEventType;
  data: any;
}
