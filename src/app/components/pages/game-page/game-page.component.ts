import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { PunchLineCard } from 'src/app/interfaces/punch-line-card';
import { GameSettingsService } from 'src/app/services/game-settings.service';
import { GameService, GameState } from 'src/app/services/game.service';
import { UiNotificationsService } from 'src/app/services/ui-notifications.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent implements OnInit {
  public players = this.game.players;
  public hand = this.game.hand;
  public table = this.game.table;
  public turnCount$ = this.game.turnCount$;
  public turnTimer$ = this.game.turnTimer$.pipe(map((i) => i + 1));
  public turnDuration$ = this.game.turnDuration$;

  public scoreToWin = this.settings.defaultScore;
  public scoreOptions = this.settings.scoreOptions;

  public turnDuration = this.settings.defaultTurnDuration;
  public turnDurationOptions = this.settings.turnDurationOptions;

  constructor(
    private readonly game: GameService,
    private readonly settings: GameSettingsService,
    private readonly notifications: UiNotificationsService,
    private router: Router
  ) {}

  public get isTimerVisible() {
    return this.game.state === GameState.Turns;
  }

  public get isSetupVisible() {
    return ![GameState.Void, GameState.Gathering, GameState.Finished].includes(
      this.game.state
    );
  }

  public get isHandVisible() {
    return !(this.game.isLeading || this.game.state !== GameState.Turns);
  }

  public get isHandActive() {
    return !this.game.hasChosenCard && this.game.state === GameState.Turns;
  }

  public get isLobbyControlsVisible() {
    return this.game.state === GameState.Gathering;
  }

  public get isTableVisible() {
    if ([GameState.Gathering, GameState.Finished].includes(this.game.state)) {
      return false;
    }

    return (
      this.game.isLeading ||
      [GameState.Judgement, GameState.Congrats].includes(this.game.state)
    );
  }

  public get isFinishScreenVisible() {
    return this.game.state === GameState.Finished;
  }

  public get isLeading() {
    return this.game.isLeading;
  }

  public get isTableActive() {
    return this.game.state === GameState.Judgement && this.game.isLeading;
  }

  public get setup() {
    return this.game.setup;
  }

  public get chosenUuid() {
    return this.game.chosenCardId;
  }

  public get winner() {
    return this.game.winner;
  }

  public get isOwner() {
    return this.game.isOwner;
  }

  public ngOnInit(): void {
    if (!this.game.isInitialized) {
      try {
        this.game.init();
      } catch (error) {
        this.notifications.notification({
          icon: '🤔',
          name: 'Не удалось подключиться к игре',
          message: 'Если что-то не получается, нужно просто попробовать снова',
        });
        this.router.navigate(['/']);
      }
    }
  }

  public share() {
    const fullUrl = `${window.location.origin}/?t=${this.game.lobbyToken}`;
    if (navigator?.share) {
      navigator.share({
        url: fullUrl,
      });
    } else if (navigator?.clipboard) {
      navigator.clipboard.writeText(fullUrl);
      this.notifications.notification({
        icon: '💚',
        name: 'Ссылка скопиролвана',
        message: 'Можешь отправлять её друзьями. У тебя есть друзья?',
      });
    } else {
      alert(fullUrl);
    }
  }

  public start() {
    this.game.start({
      turnDuration: this.turnDuration,
      winningScore: this.scoreToWin,
    });
  }

  public makeTurn(id: number) {
    this.game.makeTurn(id);
  }

  public openSlot(index: number) {
    this.game.openTableCard(index);
  }

  public pickWinner(card: PunchLineCard | undefined) {
    if (card) {
      this.game.pickWinner(card.id);
    }
  }

  public refreshHand() {
    this.notifications.notification({
      icon: '💨',
      name: 'Пук-среньк',
      message: 'Это не работает',
    });
  }

  public goEndless() {
    this.game.continue();
  }
}
