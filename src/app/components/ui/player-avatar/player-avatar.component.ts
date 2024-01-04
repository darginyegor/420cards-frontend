import {
  trigger,
  transition,
  animate,
  useAnimation,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { Animations } from 'src/app/app.animations';
import { AVATAR_BACKDROPS } from 'src/app/app.consts';
import { Player } from 'src/app/interfaces/player';
import { PlayerProfileService } from 'src/app/services/player-profile.service';

export type AvatarSize = 'normal' | 'large';

@Component({
  selector: 'app-player-avatar',
  templateUrl: './player-avatar.component.html',
  styleUrls: ['./player-avatar.component.scss'],
  animations: [
    trigger('state', [
      transition(':enter', []),
      transition(
        '* => *',
        useAnimation(Animations.POP, {
          params: { scaleMax: '1.3', scaleDrop: '0.95' },
        })
      ),
    ]),
    trigger('score', [
      transition(
        ':increment',
        useAnimation(Animations.POP, {
          params: { scaleMax: '1.3', scaleDrop: '0.95' },
        })
      ),
    ]),
  ],
})
export class PlayerAvatarComponent {
  @Input() public player?: Player;
  @Input() public withStatus = false;
  @Input() public size: AvatarSize = 'normal';
  public readonly withBackdrop = AVATAR_BACKDROPS;

  @HostBinding('class.app-player-avatar--pending') public get isPending() {
    return !this.player?.isConnected;
  }

  @HostBinding('class') public get sizeClassName() {
    return `--${this.size}`;
  }

  public get isReady() {
    return !!(this.player?.state === 'ready');
  }

  public get isLeading() {
    return !!(this.player?.state === 'leading');
  }

  public get avatar() {
    if (!this.player) {
      return;
    }

    return PlayerProfileService.get(this.player.emoji);
  }

  public get bgGradient() {
    if (!this.avatar) {
      return;
    }
    const { color, colors } = this.avatar;
    return (
      `radial-gradient(circle at 50% 50% , #FFFFFF 0%, #FFFFFF00 100%),\n` +
      `radial-gradient(circle at 0% 100% , ${colors[0] || color} 0%, ${
        colors[0] || color
      }00 100%),\n` +
      `radial-gradient(circle at 100% 0% , ${colors[1] || color} 0%, ${
        colors[1] || color
      }00 100%),\n` +
      `#F6F6F6`
    );
  }
}
