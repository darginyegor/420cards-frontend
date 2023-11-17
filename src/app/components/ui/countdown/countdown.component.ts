import { Component, HostBinding } from '@angular/core';
import { tap } from 'rxjs';
import { CountdownService } from 'src/app/services/countdown.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent {
  public countdown$ = this.countdown.countdown$.pipe(
    tap((c) => (this._isActive = !!c))
  );

  @HostBinding('class.--active') private _isActive = false;

  constructor(private readonly countdown: CountdownService) {}
}
