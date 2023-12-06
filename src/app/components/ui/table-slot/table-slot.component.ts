import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { CardTextCase } from 'src/app/interfaces/punch-line-card';
import { TableSlot } from 'src/app/interfaces/table-slot';

@Component({
  selector: 'app-table-slot',
  templateUrl: './table-slot.component.html',
  styleUrls: ['./table-slot.component.scss'],
  animations: [
    trigger('state', [
      transition(':enter', animate('0s')),
      transition('* => *', [
        animate(
          '.6s cubic-bezier(0,.5,.5,1)',
          keyframes([
            style({
              transform: 'scale(1)',
              offset: 0,
            }),
            style({
              transform: 'scale(1.05)',
              offset: 0.5,
            }),
            style({
              transform: 'scale(0.99',
              offset: 0.8,
            }),
            style({
              transform: 'scale(1)',
              offset: 1,
            }),
          ])
        ),
      ]),
    ]),
  ],
})
export class TableSlotComponent {
  @Input() public slot?: TableSlot;
  @Input() public case?: CardTextCase;

  @HostBinding('class.--active')
  @Input()
  public isActive = false;

  @Output() public open = new EventEmitter();
  @Output() public pick = new EventEmitter();

  public get state() {
    if (!this.slot) {
      return 'empty';
    }
    if (!this.slot.card) {
      return 'face-down';
    }
    return this.isPicked ? 'picked' : 'face-up';
  }

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

  public interact() {
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
