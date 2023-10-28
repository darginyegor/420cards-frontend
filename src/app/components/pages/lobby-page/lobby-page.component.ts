import { Component } from '@angular/core';
import { PLAYERS_MOCK } from 'src/app/mocks';

@Component({
  selector: 'app-lobby-page',
  templateUrl: './lobby-page.component.html',
  styleUrls: ['./lobby-page.component.scss'],
})
export class LobbyPageComponent {
  public readonly players = PLAYERS_MOCK;
  private readonly lobbyURL = 'https://link.to.game';

  public share() {
    if (navigator?.share) {
      navigator.share({
        title: 'Подключайся к игре',
        text: 'Тебя пригласили поиграть в 420cards',
        url: this.lobbyURL,
      });
    } else if (navigator?.clipboard) {
      navigator.clipboard.writeText(this.lobbyURL);
    }
  }
}
