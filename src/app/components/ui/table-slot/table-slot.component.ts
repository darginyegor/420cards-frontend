import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardTextCase } from 'src/app/interfaces/punch-line-card';
import { TableSlot } from 'src/app/interfaces/table-slot';

@Component({
  selector: 'app-table-slot',
  templateUrl: './table-slot.component.html',
  styleUrls: ['./table-slot.component.scss'],
})
export class TableSlotComponent {
  @Input() public slot: TableSlot | null = null;
  @Input() public canOpen = false;
  @Input() public case?: CardTextCase;

  @Output() public open = new EventEmitter();
  @Output() public pick = new EventEmitter();

  public get casedText() {
    if (!this.case) {
      return;
    }
    return this.slot?.card?.text[this.case];
  }

  public action() {
    if (!this.slot?.card) {
      this.open.emit();
    } else {
      this.pick.emit();
    }
  }
}
