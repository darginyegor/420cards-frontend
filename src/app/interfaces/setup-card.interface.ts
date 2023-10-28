import { CardTextCase } from './punch-line-card.interface';

export interface SetupCard {
  id: number;
  text: string;
  startsFromPunchLine: boolean;
  case: CardTextCase;
}
