import { Component, OnInit } from '@angular/core';
import { PunchLineCard } from 'src/app/interfaces/punch-line-card';
import { GameService, GameState } from 'src/app/services/game.service';
import { UiNotificationsService } from 'src/app/services/ui-notifications.service';

@Component({
  selector: 'app-lobby-page',
  templateUrl: './lobby-page.component.html',
  styleUrls: ['./lobby-page.component.scss'],
})
export class LobbyPageComponent implements OnInit {
  public players = this.game.players;
  public hand = this.game.hand;
  public table = this.game.table;

  public get isSetupVisible() {
    return ![GameState.Void, GameState.Finished].includes(this.game.state);
  }

  public get isHandVisible() {
    return !(this.game.isLeading || this.game.state !== GameState.Turns);
  }

  public get isHandActive() {
    return this.game.chosenUuid && this.game.state === GameState.Turns;
  }

  public get isLobbyControlsVisible() {
    return this.game.state === GameState.Gathering;
  }

  public get isTableVisible() {
    return (
      this.game.isLeading ||
      [GameState.Judgement, GameState.Congrats].includes(this.game.state)
    );
  }

  public get setup() {
    return this.game.setup;
  }

  constructor(
    private readonly game: GameService,
    private readonly notifications: UiNotificationsService
  ) {}

  ngOnInit(): void {
    try {
      this.game.init();
    } catch (error) {
      this.notifications.notification({
        icon: '👀',
        name: 'Это всё понарошку',
        message: 'Никаких подключений',
      });
      // this.router.navigate(['/']);
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
    this.game.start();
  }

  public makeTurn(uuid: string) {
    this.game.makeTurn(uuid);
  }

  public openSlot(index: number) {
    this.game.openTableCard(index);
  }

  public pickWinner(card: PunchLineCard | undefined) {
    if (card) {
      this.game.pickWinner(card.uuid);
    }
  }

  public refreshHand() {
    this.notifications.notification({
      icon: '💨',
      name: 'Пук-среньк',
      message: 'Это не работает',
    });
  }
}
