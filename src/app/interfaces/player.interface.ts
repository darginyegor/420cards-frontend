export type PlayerState = 'default' | 'ready' | 'leading';

export interface Player {
  id: number;
  name: string;
  emoji: string;
  backgroundColor: string;
  points: number;
  state: PlayerState;
}
