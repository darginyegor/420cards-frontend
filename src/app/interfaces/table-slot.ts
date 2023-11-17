import { PunchLineCard } from './punch-line-card';

export interface TableSlot {
  isEmpty: boolean;
  isWinner?: boolean;
  // TODO deprecate properties above
  card?: PunchLineCard;
  state?: 'empty' | 'close' | 'open' | 'winner';
}
