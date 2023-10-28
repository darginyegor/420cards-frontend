import { Component } from '@angular/core';
import { BACKGROUND_BLUR } from 'src/app/app.consts';
import { SetupCard } from 'src/app/interfaces/setup-card.interface';
import {
  PLAYERS_MOCK,
  PUNCH_LINE_CARDS,
  SETUP_CARDS_MOCK,
} from 'src/app/mocks';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent {
  public players = PLAYERS_MOCK;
  public readonly punchLineCards = PUNCH_LINE_CARDS;
  public currentIndex = 0;

  public isActive = true;
  public isHandVisible = true;
  public isTableVisible = false;

  constructor() {}

  public get setupCard(): SetupCard {
    return SETUP_CARDS_MOCK[this.currentIndex];
  }

  public get isBlurApplied() {
    return BACKGROUND_BLUR;
  }

  public select(index: number) {
    this.isActive = false;
    this.players[0].state = 'ready';
    setTimeout(() => {
      this.isActive = true;
      this.players[0].state = 'default';
      this.currentIndex++;
      if (this.currentIndex >= SETUP_CARDS_MOCK.length - 1) {
        this.currentIndex = 0;
      }
      this.punchLineCards.splice(index, 1);
      console.log('new setup card:', this.currentIndex, this.setupCard);
      const winnerIndex = Math.round(Math.random() * (PLAYERS_MOCK.length - 1));
      PLAYERS_MOCK[winnerIndex].points += 1;
    }, 3000);
  }
}
