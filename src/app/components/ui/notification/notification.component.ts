import { Component, OnInit } from '@angular/core';
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

  constructor(private readonly notifications: UiNotificationsService) {}

  public ngOnInit(): void {
    this.notifications.feed$.subscribe({
      next: (message) => {
        this.current = message;
        setTimeout(() => {
          this.current = null;
        }, this.timeout);
      },
    });
  }
}
