export enum GameActionType {
  StartGame = 'startGame',
  MakeTurn = 'makeTurn',
  OpenTableCard = 'openTableCard',
  PickWinner = 'pickTurnWinner',
  Continue = 'continue',
}

export interface GameAction {
  id: number;
  type: GameActionType;
  data: any;
}

export type GameActionWithoutId = Omit<GameAction, 'id'>;
