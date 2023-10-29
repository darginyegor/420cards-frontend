export type GameEventType =
  | 'playerReady'
  | 'welcome'
  | 'playerJoined'
  | 'playerConnected';

export interface GameEvent {
  id?: number;
  type: GameEventType;
  data: {
    [key: string]: any;
  };
}
