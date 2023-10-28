export enum GameActionType {
  PunchChosen = 'punch_chosen',
}

export interface GameAction {
  type: GameActionType;
}
