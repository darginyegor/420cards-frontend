import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/interfaces/player.interface';
import { PLAYERS_MOCK } from 'src/app/mocks';
import { EventsService } from 'src/app/services/events.service';
import { UiNotificationsService } from 'src/app/services/ui-notifications.service';

@Component({
  selector: 'app-lobby-page',
  templateUrl: './lobby-page.component.html',
  styleUrls: ['./lobby-page.component.scss'],
})
export class LobbyPageComponent implements OnInit {
  public players: Player[] = [];
  constructor(
    private readonly events: EventsService,
    private readonly notifications: UiNotificationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    try {
      this.events.listen().subscribe({
        next: (event) => {
          switch (event.type) {
            case 'welcome':
              this.players = event.data['players'];
              break;
            case 'playerJoined':
              // TODO: remove type casting
              this.players.push(event.data as Player);
              break;
            case 'playerConnected':
              const player = this.players.find(
                (player) => player.uuid === event.data['uuid']
              );
              if (!player) {
                return;
              }
              player.isConnected = true;
          }
        },
      });
    } catch (error) {
      this.notifications.error({
        name: 'Некуда подключаться',
        message: 'В сервисе событий нет данных для подключения',
      });
      this.router.navigate(['/']);
    }
  }

  public share() {
    const url = '';
    const fullUrl = `${url}?t=${this.events.lobbyToken}`;
    if (navigator?.share) {
      navigator.share({
        title: 'Подключайся к игре',
        text: 'Тебя пригласили поиграть в 420cards',
        url: fullUrl,
      });
    } else if (navigator?.clipboard) {
      navigator.clipboard.writeText(fullUrl);
    }
  }
}
