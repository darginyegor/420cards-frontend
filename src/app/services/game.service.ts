import { Injectable } from '@angular/core';
import { Player } from '../interfaces/player.interface';
import { EventsService } from './events.service';
import { UiNotificationsService } from './ui-notifications.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public readonly players: Player[] = [];

  private _isInitialized = false;
  public get isInitialized() {
    return this._isInitialized;
  }

  public get lobbyToken() {
    return this.events.lobbyToken;
  }

  constructor(
    private readonly events: EventsService,
    private readonly notifications: UiNotificationsService,
    private readonly router: Router
  ) {
    this.events.feed$.subscribe({
      next: (event) => {
        // TODO: make player a class
        let player: Player | undefined;
        switch (event.type) {
          case 'welcome':
            this._isInitialized = true;
            this.players.push(...event.data.players);
            break;
          case 'playerJoined':
            this.players.push(event.data);
            break;
          case 'playerConnected':
            player = this.players.find(
              (player) => player.uuid === event.data.uuid
            );
            if (!player) {
              return;
            }
            player.isConnected = true;
            break;
          case 'playerDisconnected':
            player = this.players.find(
              (player) => player.uuid === event.data.uuid
            );
            if (!player) {
              return;
            }
            player.isConnected = false;
            break;
          case 'playerLeft':
            const index = this.players.findIndex(
              (player) => player.uuid === event.data.uuid
            );
            if (index < 0) {
              return;
            }
            this.players.splice(index, 1);
            break;
          case 'connectionError':
            this.notifications.notification({
              icon: '🤡',
              name: 'Нас не пускают',
              message: 'Возможно, мы стучимся не туда...',
            });
            this.router.navigate(['/']);
            break;
        }
      },
    });
  }

  public init() {
    if (!this.isInitialized) {
      this.events.init();
    }
  }
}
