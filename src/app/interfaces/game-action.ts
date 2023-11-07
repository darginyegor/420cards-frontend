export enum GameActionType {
  StartGame = 'startGame',
  MakeTurn = 'makeTurn',
}

export interface GameAction {
  id: number;
  type: GameActionType;
  data: any;
}
