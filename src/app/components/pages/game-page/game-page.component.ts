import { Component, OnInit } from '@angular/core';
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

  public scoreToWin = this.settings.defaultScore;
  public scoreOptions = this.settings.scoreOptions;

  public turnDuration = this.settings.defaultTurnDuration;
  public turnDurationOptions = this.settings.turnDurationOptions;

  constructor(
    private readonly game: GameService,
    private readonly settings: GameSettingsService,
    private readonly notifications: UiNotificationsService
  ) {}

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
    if (this.game.state === GameState.Gathering) {
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

  public ngOnInit(): void {
    try {
      this.game.init();
    } catch (error) {
      this.notifications.notification({
        icon: '👀',
        name: 'Это всё понарошку',
        message: 'Никаких подключений',
      });
    }
  }

  public share() {
    const url = '';
    const fullUrl = `${url}/?t=${this.game.lobbyToken}`;
    if (navigator?.share) {
      navigator.share({
        title: 'Будешь играть в 420cards?',
        url: fullUrl,
      });
    } else if (navigator?.clipboard) {
      navigator.clipboard.writeText(fullUrl);
      this.notifications.notification({
        icon: '💚',
        name: 'Ссылка скопиролвана',
        message: 'Можешь отправлять её друзьями. У тебя есть друзья?',
      });
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
