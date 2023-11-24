interface CardText {
  [key: string]: string;
}

export type CardTextCase = keyof CardText;

export interface PunchLineCardSchema {
  uuid: string;
  text: [string, string[]][];
}

export class PunchLineCard {
  public readonly uuid;
  private readonly _text: CardText;

  constructor(schema: PunchLineCardSchema) {
    this.uuid = schema.uuid;
    this._text = schema.text.reduce<CardText>((accumulator, variant) => {
      variant[1].forEach((key) => (accumulator[key] = variant[0]));
      return accumulator;
    }, {});
  }

  public toCase(textCase: CardTextCase, capitalize?: boolean): string {
    const text = this._text[textCase];
    return capitalize ? this.capitalize(text) : text;
  }

  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
