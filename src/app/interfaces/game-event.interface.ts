export type GameEventType = 'playerReady';

export interface GameEvent {
  id: number;
  type: GameEventType;
  playerId: number;
}
