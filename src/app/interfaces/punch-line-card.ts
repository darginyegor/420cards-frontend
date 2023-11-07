export const CARD_TEXT_CASES = [
  'nom', // именительный
  'gen', // родительный
  'dat', // дательный
  'acc', // винительный
  'inst', // творительный
  'prep', // предложный
] as const;
export type CardTextCase = (typeof CARD_TEXT_CASES)[number];

export interface PunchLineCard {
  id: number;
  text: {
    [key in CardTextCase]: string;
  };
}
