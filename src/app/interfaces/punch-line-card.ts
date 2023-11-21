interface CardText {
  nom: string;
  gen?: string;
  dat?: string;
  acc?: string;
  inst?: string;
  prep?: string;
}

export type CardTextCase = keyof CardText;

export interface PunchLineCardSchema {
  uuid: string;
  text: CardText;
}

export class PunchLineCard {
  public readonly uuid;
  private readonly _text: CardText;

  constructor(schema: PunchLineCardSchema) {
    this.uuid = schema.uuid;
    this._text = schema.text;
  }

  public toCase(textCase: CardTextCase, capitalize?: boolean): string {
    const text = this._text[textCase] || this._text.nom;
    return capitalize ? this.capitalize(text) : text;
  }

  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
