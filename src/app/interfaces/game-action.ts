export enum GameActionType {
  StartGame = 'startGame',
}

export interface GameAction {
  id: number;
  type: GameActionType;
  data: any;
}
