import { Component, Input } from '@angular/core';
import { SetupCard } from 'src/app/interfaces/setup-card';

@Component({
  selector: 'app-setup-card',
  templateUrl: './setup-card.component.html',
  styleUrls: ['./setup-card.component.scss'],
})
export class SetupCardComponent {
  @Input() setup?: SetupCard;
  @Input() turnCount = 1;
  @Input() isLeading = false;
}
