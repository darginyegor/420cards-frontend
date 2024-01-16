import { CardTextCase } from './punch-line-card';

export interface SetupCard {
  id: number;
  text: string;
  startsWithPunchline: boolean;
  case: CardTextCase;
}
