export type GameEventType =
  | 'playerReady'
  | 'allPlayersReady'
  | 'welcome'
  | 'playerJoined'
  | 'playerConnected'
  | 'playerDisconnected'
  | 'playerLeft'
  | 'connectionError'
  | 'connectionLost'
  | 'ownerChanged'
  | 'gameStarted'
  | 'turnStarted'
  | 'tableCardOpened'
  | 'turnEnded';

export interface GameEvent {
  id?: number;
  type: GameEventType;
  data: any;
}
