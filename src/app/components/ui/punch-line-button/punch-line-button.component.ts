import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PunchLineCard } from 'src/app/interfaces/punch-line-card';

@Component({
  selector: 'app-punch-line-button',
  templateUrl: './punch-line-button.component.html',
  styleUrls: ['./punch-line-button.component.scss'],
})
export class PunchLineButtonComponent {
  @Input() public selected = false;
  @Input() public disabled = false;

  @Output() public select = new EventEmitter<PunchLineCard>();

  public _select(): void {
    this.selected = true;
    this.select.emit();
  }
}
