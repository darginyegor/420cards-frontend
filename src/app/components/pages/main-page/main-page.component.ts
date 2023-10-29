import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PLAYERS_MOCK, PROFILE_AVATARS } from 'src/app/mocks';
import { ApiService } from 'src/app/services/api.service';
import { EventsService } from 'src/app/services/events.service';
import { PlayerProfileService } from 'src/app/services/player-profile.service';
import { UiNotificationsService } from 'src/app/services/ui-notifications.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  public readonly colorPostfix = '';
  public name = this.playerProfileService.name;
  public avatar$ = this.playerProfileService.avatar$;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly api: ApiService,
    private readonly events: EventsService,
    private readonly playerProfileService: PlayerProfileService,
    private readonly router: Router,
    private readonly notifications: UiNotificationsService
  ) {}

  public start(): void {
    const token = this.activatedRoute.snapshot.queryParamMap.get('t');
    this.api
      .getConnectionInfo(
        {
          name: this.name,
          emoji: this.playerProfileService.avatar.emoji,
          backgroundColor: this.playerProfileService.avatar.color,
        },
        token
      )
      .subscribe({
        next: (response) => {
          this.events.setConnectionInfo(response);
          this.router.navigate(['lobby']);
        },
        error: (error) => {
          this.notifications.error({
            name: 'Ошибка подключения к API',
            message: error.message,
          });
        },
      });
  }

  public nextAvatar() {
    this.playerProfileService.selectNext();
  }

  public prevAvatar() {
    this.playerProfileService.selectPrev();
  }

  public saveName(name: string) {
    this.playerProfileService.name = name;
  }
}
