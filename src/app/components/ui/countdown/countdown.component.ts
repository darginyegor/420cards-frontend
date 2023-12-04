import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, HostBinding } from '@angular/core';
import { tap } from 'rxjs';
import { CountdownService } from 'src/app/services/countdown.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  animations: [
    trigger('state', [
      transition('* => *', [
        animate(
          '.95s cubic-bezier(0,.8,.8,0)',
          keyframes([
            style({
              opacity: 0,
              transform: 'scale(0)',
              offset: 0,
            }),
            style({
              opacity: 1,
              transform: 'scale(1)',
              offset: 0.4,
            }),
            style({
              opacity: 0,
              transform: 'scale(5)',
              offset: 1,
            }),
          ])
        ),
      ]),
    ]),
  ],
})
export class CountdownComponent {
  public countdown$ = this.countdown.countdown$.pipe(
    tap((c) => (this._isActive = !!c))
  );

  @HostBinding('class.--active') private _isActive = false;

  constructor(private readonly countdown: CountdownService) {}
}
