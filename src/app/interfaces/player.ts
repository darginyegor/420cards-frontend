export type PlayerState = 'default' | 'ready' | 'leading';

export interface Player {
  uuid: string;
  name: string;
  emoji: string;
  score: number;
  state: PlayerState;
  isConnected: boolean;
  isLobbyOwner: boolean;
  isWinner: boolean;
}
