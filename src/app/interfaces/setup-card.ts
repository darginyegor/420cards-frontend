import { CardTextCase } from './punch-line-card';

export interface SetupCard {
  id: number;
  text: string;
  startsFromPunchLine: boolean;
  case: CardTextCase;
}
