import { Injectable } from '@angular/core';
import { Player } from '../interfaces/player.interface';
import { EventsService } from './events.service';

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

  constructor(private readonly events: EventsService) {
    this.events.feed$.subscribe({
      next: (event) => {
        switch (event.type) {
          case 'welcome':
            this._isInitialized = true;
            this.players.push(...event.data.players);
            break;
          case 'playerJoined':
            this.players.push(event.data);
            break;
          case 'playerConnected':
            const player = this.players.find(
              (player) => player.uuid === event.data.uuid
            );
            if (!player) {
              return;
            }
            player.isConnected = true;
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
