import { CardTextCase } from './punch-line-card';

export interface SetupCard {
  uuid: string;
  text: string;
  startsFromPunchLine: boolean;
  case: CardTextCase;
}
