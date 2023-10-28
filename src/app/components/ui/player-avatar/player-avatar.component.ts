import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AVATAR_BACKDROPS } from 'src/app/app.consts';
import { Player } from 'src/app/interfaces/player.interface';

@Component({
  selector: 'app-player-avatar',
  templateUrl: './player-avatar.component.html',
  styleUrls: ['./player-avatar.component.scss'],
})
export class PlayerAvatarComponent {
  @Input() public player?: Player;
  @Input() public withStatus = false;
  public readonly withBackdrop = AVATAR_BACKDROPS;

  public get isReady() {
    return !!(this.player?.state === 'ready');
  }

  public get isLeading() {
    return !!(this.player?.state === 'leading');
  }
}
