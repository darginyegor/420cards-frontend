export type PlayerState = 'default' | 'ready' | 'leading';

export interface Player {
  uuid: string;
  name: string;
  emoji: string;
  backgroundColor: string;
  points: number;
  state: PlayerState;
  isConnected: boolean;
}
