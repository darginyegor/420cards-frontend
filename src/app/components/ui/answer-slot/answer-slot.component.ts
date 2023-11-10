import { Component, Input } from '@angular/core';
import { PunchLineCard } from 'src/app/interfaces/punch-line-card';

@Component({
  selector: 'app-answer-slot',
  templateUrl: './answer-slot.component.html',
  styleUrls: ['./answer-slot.component.scss'],
})
export class AnswerSlotComponent {
  @Input() public answer: PunchLineCard | null = null;
  @Input() public canOpen = false;
}
