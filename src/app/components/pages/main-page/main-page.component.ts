import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Animations } from 'src/app/app.animations';
import { ApiService } from 'src/app/services/api.service';
import { EventsService } from 'src/app/services/events.service';
import { GameService } from 'src/app/services/game.service';
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
export class MainPageComponent implements OnInit {
  public readonly colorPostfix = '';
  public name = this.playerProfile.name;
  public avatar$ = this.playerProfile.avatar$;
  public bottomSheetBg$ = this.avatar$.pipe(
    map(
      ({ colors }) =>
        `radial-gradient(circle at 50% 30% , #FFFFFF 0%, #FFFFFF00 75%),\n` +
        `radial-gradient(circle at 0% 100% , ${colors[0]} 0%, ${colors[0]}00 100%),\n` +
        `radial-gradient(circle at 100% 0% , ${colors[1]} 0%, ${colors[1]}88 100%),\n` +
        ` ${colors[2]}`
    )
  );
  public isLoading = false;
  public lobbyToken = this.activatedRoute.snapshot.queryParamMap.get('t');

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly api: ApiService,
    private readonly game: GameService,
    private readonly events: EventsService,
    private readonly playerProfile: PlayerProfileService,
    private readonly router: Router,
    private readonly notifications: UiNotificationsService
  ) {}

  public ngOnInit(): void {
    if (this.lobbyToken && this.lobbyToken === this.events.lobbyToken) {
      this.router.navigate(['play']);
    } else {
      this.events.clearConnectionInfo();
    }
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
          backgroundColor: this.playerProfile.avatar.colors[0],
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
          this.notifications.fromError(error);
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
