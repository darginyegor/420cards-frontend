import { PunchLineCard, PunchLineCardSchema } from './punch-line-card';

export interface TableSlotSchema {
  isPicked?: boolean;
  card?: PunchLineCardSchema;
  author?: string;
}

export interface TableSlot {
  isPicked?: boolean;
  card?: PunchLineCard;
  author?: string;
}
