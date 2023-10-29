import { Component, OnInit } from '@angular/core';
import { delay, map, tap } from 'rxjs';
import { BackgroundColorService } from 'src/app/services/background-color.service';
import {
  UiNotification,
  UiNotificationsService,
} from 'src/app/services/ui-notifications.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  public current: UiNotification | null = null;
  private readonly timeout = 5000;
  public isFading = false;
  public isHighLighted = false;
  private _currentId = 0;

  constructor(
    private readonly backgroundColor: BackgroundColorService,
    private readonly notifications: UiNotificationsService
  ) {}

  public get isLight() {
    return this.backgroundColor.isLight;
  }

  public ngOnInit(): void {
    this.notifications.feed$
      .pipe(
        map((event) => {
          if (this.isFading) {
            this.isFading = false;
          }
          if (this.current) {
            this.highlight();
          }
          this.current = event;
          return ++this._currentId;
        }),
        delay(this.timeout),
        tap((id) => {
          if (id === this._currentId) {
            this.isFading = true;
          }
        }),
        delay(300),
        tap((id) => {
          if (id === this._currentId) {
            this.isFading = false;
            this.current = null;
          }
        })
      )
      .subscribe();
  }

  private highlight() {
    this.isHighLighted = true;
    setTimeout(() => (this.isHighLighted = false), 200);
  }
}
