import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  CardTextCase,
  PunchLineCard,
} from 'src/app/interfaces/punch-line-card';
import { TableSlot } from 'src/app/interfaces/table-slot';

@Component({
  selector: 'app-answer-slot',
  templateUrl: './answer-slot.component.html',
  styleUrls: ['./answer-slot.component.scss'],
})
export class AnswerSlotComponent {
  @Input() public answer: TableSlot | null = null;
  @Input() public canOpen = false;
  @Input() public case?: CardTextCase;

  @Output() public open = new EventEmitter();
  @Output() public pick = new EventEmitter();

  public get casedText() {
    if (!this.case) {
      return;
    }
    return this.answer?.card?.text[this.case];
  }

  public action() {
    if (!this.answer?.card) {
      this.open.emit();
    } else {
      this.pick.emit();
    }
  }
}
