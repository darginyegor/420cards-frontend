import { transition, trigger, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { Animations } from 'src/app/app.animations';
import { ApiService } from 'src/app/services/api.service';
import { BackgroundColorService } from 'src/app/services/background-color.service';
import { EventsService } from 'src/app/services/events.service';
import { PlayerProfileService } from 'src/app/services/player-profile.service';
import { UiNotificationsService } from 'src/app/services/ui-notifications.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  animations: [
    trigger('changeAvatar', [
      transition(':enter', []),
      transition('* => *', [useAnimation(Animations.POP)]),
    ]),
  ],
})
export class MainPageComponent {
  public readonly colorPostfix = '';
  public name = this.playerProfile.name;
  public avatar$ = this.playerProfile.avatar$.pipe(
    tap((avatar) => this.backgroundColor.set(avatar.color, 'light'))
  );
  public isLoading = false;
  public lobbyToken = this.activatedRoute.snapshot.queryParamMap.get('t');

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly api: ApiService,
    private readonly backgroundColor: BackgroundColorService,
    private readonly events: EventsService,
    private readonly playerProfile: PlayerProfileService,
    private readonly router: Router,
    private readonly notifications: UiNotificationsService
  ) {
    this.events.clearCache();
  }

  public start(): void {
    if (!this.name) {
      this.notifications.notification({
        name: 'Тебя что, никак не зовут?',
        icon: '🤔',
        message: 'Напиши своё имя, иначе поиграть не получится.',
      });
      return;
    }

    this.isLoading = true;
    this.api
      .getConnectionInfo(
        {
          name: this.name,
          emoji: this.playerProfile.avatar.emoji,
          backgroundColor: this.playerProfile.avatar.color,
        },
        this.lobbyToken
      )
      .subscribe({
        next: (response) => {
          this.events.setConnectionInfo(response);
          this.router.navigate(['play']);
        },
        error: (error) => {
          this.isLoading = false;
          this.notifications.notification({
            icon: '🚧 ',
            name: 'Ошибка подключения к API',
            message: `Код: ${error.status}. Остальное тебе знать не обязательно.`,
          });
        },
      });
  }

  public nextAvatar() {
    this.playerProfile.selectNext();
  }

  public prevAvatar() {
    this.playerProfile.selectPrev();
  }

  public saveName(name: string) {
    this.playerProfile.name = name;
  }
}
