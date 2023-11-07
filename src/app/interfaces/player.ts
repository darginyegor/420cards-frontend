export type PlayerState = 'default' | 'ready' | 'leading';

export interface Player {
  uuid: string;
  name: string;
  emoji: string;
  backgroundColor: string;
  score: number;
  state: PlayerState;
  isConnected: boolean;
  isLobbyOwner: boolean;
}
