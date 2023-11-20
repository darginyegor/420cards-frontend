import { Component } from '@angular/core';
import { BACKGROUND_BLUR } from 'src/app/app.consts';
import { Player } from 'src/app/interfaces/player';
import { SetupCard } from 'src/app/interfaces/setup-card';
import { TableSlot } from 'src/app/interfaces/table-slot';
import {
  PLAYERS_MOCK,
  PUNCH_LINE_CARDS,
  SETUP_CARDS_MOCK,
} from 'src/app/mocks';
import { CountdownService } from 'src/app/services/countdown.service';
import { GameService } from 'src/app/services/game.service';
import { UiNotificationsService } from 'src/app/services/ui-notifications.service';

@Component({
  selector: 'app-sandbox-page',
  templateUrl: './sandbox-page.component.html',
  styleUrls: ['./sandbox-page.component.scss'],
})
export class SandboxPageComponent {
  public players: Player[] = PLAYERS_MOCK; // this.game.players;
  public hand = PUNCH_LINE_CARDS;
  public table: TableSlot[] = [{}, {}, {}, {}];
  public currentIndex = 0;
  public isLeading = true;

  public isActive = true;
  public isHandVisible = true;
  public isTableVisible = false;
  public isTableActive = false;

  constructor(
    private readonly countdown: CountdownService,
    private readonly game: GameService,
    private readonly notifications: UiNotificationsService
  ) {
    try {
      this.game.init();
    } catch {}
  }

  public get setupCard(): SetupCard {
    return SETUP_CARDS_MOCK[this.currentIndex];
  }

  public get isBlurApplied() {
    return BACKGROUND_BLUR;
  }

  public select(index: number) {
    this.isActive = false;
    this.players[0].state = 'ready';
    this._triggerInterfaceTestCycle();
  }

  public testCountdown() {
    this.countdown.start(3).subscribe({
      next: (i) => console.log(i),
    });
  }

  public testTableFlip(i: number) {
    this.table[i] = {
      card: PUNCH_LINE_CARDS[i],
    };
    console.log(this.table);
  }

  public testPick(i: number) {
    this.table[i].isPicked = true;
  }

  private _triggerInterfaceTestCycle() {
    setTimeout(() => {
      this.players[3].state = 'ready';
    }, 2000);

    setTimeout(() => {
      this.players[4].state = 'ready';
    }, 4000);

    setTimeout(() => {
      this.players[2].state = 'ready';
      this.isTableVisible = true;
      this.isHandVisible = false;
    }, 6000);

    //   setTimeout(() => {
    //     this.isActive = true;
    //     this.players[0].state = 'default';
    //     this.currentIndex++;
    //     if (this.currentIndex >= SETUP_CARDS_MOCK.length - 1) {
    //       this.currentIndex = 0;
    //     }
    //     this.punchLineCards.splice(index, 1);
    //     console.log('new setup card:', this.currentIndex, this.setupCard);
    //     const winnerIndex = Math.round(Math.random() * (PLAYERS_MOCK.length - 1));
    //     PLAYERS_MOCK[winnerIndex].points += 1;
    //   }, 3000);
  }
}
