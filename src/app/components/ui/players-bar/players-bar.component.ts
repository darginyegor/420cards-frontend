import { Component, Input } from '@angular/core';
import { Player } from 'src/app/interfaces/player';

@Component({
  selector: 'app-players-bar',
  templateUrl: './players-bar.component.html',
  styleUrls: ['./players-bar.component.scss'],
  host: {
    class: 'l-ph-xxl l-row-l l-scroll-h',
  },
})
export class PlayersBarComponent {
  @Input() players: Player[] = [];
  @Input() withStatus = false;
}
