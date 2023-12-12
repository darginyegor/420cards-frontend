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
          params: { scale: '1.3', scaleDrop: '0.95' },
        })
      ),
    ]),
    trigger('score', [
      transition(
        ':increment',
        useAnimation(Animations.POP, {
          params: { scale: '1.3', scaleDrop: '0.95' },
        })
      ),
    ]),
  ],
})
export class PlayerAvatarComponent {
  @Input() public player?: Player;
  @Input() public withStatus = false;
  @Input() public isWinner = false;
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
}
