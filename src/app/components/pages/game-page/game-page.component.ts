import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { map, share, tap } from 'rxjs';
import { PunchLineCard } from 'src/app/interfaces/punch-line-card';
import { GameSettingsService } from 'src/app/services/game-settings.service';
import { GameService, GameState } from 'src/app/services/game.service';
import { PlayerProfileService } from 'src/app/services/player-profile.service';
import { UiNotificationsService } from 'src/app/services/ui-notifications.service';
import { BottomSheetComponent } from '../../ui/bottom-sheet/bottom-sheet.component';
import { ConnectionStatus } from 'src/app/services/events.service';

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
  public turnTimer$ = this.game.turnTimer$.pipe(
    map((i) => i + 1),
    share()
  );
  public turnDuration$ = this.game.turnDuration$;
  public isOnline$ = this.game.connectionStatus$;

  public scoreToWin = this.settings.defaultScore;
  public scoreOptions = this.settings.scoreOptions;

  public turnDuration = this.settings.defaultTurnDuration;
  public turnDurationOptions = this.settings.turnDurationOptions;

  @ViewChild('shareSheet') public shareSheet?: BottomSheetComponent;

  constructor(
    private readonly game: GameService,
    private readonly settings: GameSettingsService,
    private readonly notifications: UiNotificationsService,
    private router: Router
  ) {}

  public get isTimerVisible() {
    return this.game.state === GameState.Turns;
  }

  public get isSetupVisible() {
    return ![GameState.Void, GameState.Gathering].includes(this.game.state);
  }

  public get isHandVisible() {
    return this.game.state === GameState.Turns && !this.game.isLeading;
  }

  public get isLobbyControlsVisible() {
    return this.game.state === GameState.Gathering;
  }

  public get isTableVisible() {
    if ([GameState.Gathering].includes(this.game.state)) {
      return false;
    }

    return (
      this.game.isLeading ||
      [GameState.Judgement, GameState.Congrats, GameState.Finished].includes(
        this.game.state
      )
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

  public get isOwner() {
    return this.game.isOwner;
  }

  public get canRefreshHand() {
    return this.game.state === GameState.Turns && !this.game.hasChosenCard;
  }

  public get bottomSheetGradient() {
    if (!this.winner) {
      return '';
    }
    const avatar = PlayerProfileService.get(this.winner.emoji);
    if (!avatar) {
      return '';
    }
    const { colors } = avatar;
    return (
      `radial-gradient(circle at 50% 30% , #FFFFFF 0%, #FFFFFF00 75%),\n` +
      `radial-gradient(circle at 0% 100% , ${colors[0]} 0%, ${colors[0]}00 100%),\n` +
      `radial-gradient(circle at 100% 0% , ${colors[1]} 0%, ${colors[1]}88 100%),\n` +
      ` ${colors[2]}`
    );
  }

  public readonly isPending$ = this.game.connectionStatus$.pipe(
    tap((status) => {
      if (status === ConnectionStatus.Disconnected) {
        this.notifications.notification({
          icon: '🤔',
          name: 'Не удалось подключиться к игре',
          message: 'Если что-то не получается, нужно просто попробовать снова',
        });
        this.router.navigate(['/']);
      }
    }),
    map((status) => status === ConnectionStatus.Pending)
  );

  public get lobbyLink() {
    return `${window.location.origin}/?t=${this.game.lobbyToken}`;
  }

  public ngOnInit(): void {
    if (!this.game.isInitialized) {
      this.game.init();
    }
  }

  public share() {
    if (navigator?.share) {
      navigator.share({
        url: this.lobbyLink,
      });
    } else if (navigator?.clipboard) {
      navigator.clipboard.writeText(this.lobbyLink);
      this.notifications.notification({
        icon: '💚',
        name: 'Ссылка скопиролвана',
        message: 'Можешь отправлять её друзьями. У тебя есть друзья?',
      });
    } else {
      this.shareSheet?.open();
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
    this.game.refreshHand();
  }

  public goEndless() {
    this.game.continue();
  }
}
