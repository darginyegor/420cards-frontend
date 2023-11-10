import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SETUP_CARDS_MOCK } from 'src/app/mocks';
import { GameService } from 'src/app/services/game.service';
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
  public setup = SETUP_CARDS_MOCK[0];

  public get isSetupVisible() {
    return this.game.isSetupVisible;
  }

  public get isHandVisible() {
    return this.game.isHandVisible;
  }

  public get isHandActive() {
    return this.game.isHandActive;
  }

  public get isLobbyControlsVisible() {
    return this.game.isLobbyControlsVisible;
  }

  public get isTableVisible() {
    return this.game.isTableVisible;
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
        name: 'Тебе точно туда было надо?',
        message: 'Почти уверен, что нет. Вот еперь ты в нужном месте.',
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

  public refreshHand() {
    this.notifications.notification({
      icon: '💨',
      name: 'Пук-среньк',
      message: 'Это не работает',
    });
  }
}
