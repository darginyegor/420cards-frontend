import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Animations } from 'src/app/app.animations';
import { Player } from 'src/app/interfaces/player';

@Component({
  selector: 'app-players-bar',
  templateUrl: './players-bar.component.html',
  styleUrls: ['./players-bar.component.scss'],
  host: {
    class: 'l-ph-xxl l-row-l l-scroll-h',
  },
  animations: [
    trigger('state', [
      transition(
        ':enter',
        useAnimation(Animations.POP, {
          params: {
            scaleFrom: 0,
            scaleDrop: 0.95,
            time: '1.2s',
          },
        })
      ),
    ]),
  ],
})
export class PlayersBarComponent {
  @Input() players: Player[] = [];
  @Input() withStatus = false;
}
