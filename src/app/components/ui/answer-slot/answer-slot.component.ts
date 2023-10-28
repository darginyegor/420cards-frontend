import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-answer-slot',
  templateUrl: './answer-slot.component.html',
  styleUrls: ['./answer-slot.component.scss'],
})
export class AnswerSlotComponent {
  @Input() public answer = null;
  @Input() public canOpen = false;
}
