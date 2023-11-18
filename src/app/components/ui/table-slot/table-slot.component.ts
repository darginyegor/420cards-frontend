import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { CardTextCase } from 'src/app/interfaces/punch-line-card';
import { TableSlot } from 'src/app/interfaces/table-slot';

@Component({
  selector: 'app-table-slot',
  templateUrl: './table-slot.component.html',
  styleUrls: ['./table-slot.component.scss'],
})
export class TableSlotComponent {
  @Input() public slot?: TableSlot;
  @Input() public case?: CardTextCase;

  @HostBinding('class.--active')
  @Input()
  public isActive = false;

  @HostBinding('class.--empty')
  public get isEmpty() {
    return !this.slot;
  }

  @HostBinding('class.--face-down')
  public get isFaceDown() {
    return !!this.slot && !this.slot.card;
  }

  @HostBinding('class.--face-up')
  public get isFaceUp() {
    return !!this.slot?.card;
  }

  @HostBinding('class.--picked')
  public get isPicked() {
    return this.slot?.isPicked;
  }

  @Output() public open = new EventEmitter();
  @Output() public pick = new EventEmitter();

  public get casedText() {
    if (!this.case) {
      return;
    }
    return this.slot?.card?.text[this.case];
  }

  @HostListener('click') public action() {
    if (this.isEmpty || !this.isActive) {
      return;
    }

    if (this.isFaceDown) {
      this.open.emit();
    } else {
      this.pick.emit();
    }
  }
}
