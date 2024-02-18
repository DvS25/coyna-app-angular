import { Component } from '@angular/core';
import {NotificationService } from "./notification.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  notifications: Notification[] = [];
  private _subscription = Subscription;

  constructor(
      private _notificationSvc: NotificationService
) {
  }

  private _addNotification(notification: Notification) {
    this.notifications.push(notification);

    // @ts-ignore
    if (notification.timeout !== 0) {
      // @ts-ignore
      setTimeout(() => this.close(notification), notification.timeout);
    }
  }

  ngOnInit() {
    console.log(';;;;;;;;;;;;......')
    // @ts-ignore
    this._subscription = this._notificationSvc.getObservable().subscribe(notification => this._addNotification(notification));
  }

  ngOnDestroy() {
    // @ts-ignore
    this._subscription.unsubscribe();
  }

  close(notification: Notification) {
    // @ts-ignore
    this.notifications = this.notifications.filter(notif => notif.id !== notification.id);
  }


  className(notification: Notification): string {
    console.log('::::: notification', notification)
    let style: string;

    // @ts-ignore
    switch (notification.type) {

        // @ts-ignore
      case NotificationType.success:
        style = 'success';
        break;

        // @ts-ignore
      case NotificationType.warning:
        style = 'warning';
        break;

        // @ts-ignore
      case NotificationType.error:
        style = 'error';
        break;

      default:
        style = 'info';
        break;
    }

    return style;
  }
}



