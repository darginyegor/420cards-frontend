import { PunchLineCard } from './punch-line-card';

export interface TableSlot {
  isPicked?: boolean;
  card?: PunchLineCard;
  author?: string;
}
