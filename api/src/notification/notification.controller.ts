import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Notification } from './notification.model';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  @Get()
  getNotifications(): Observable<Notification[]> {
    return this.notificationService.notifications$.pipe(first());
  }

  constructor(private readonly notificationService: NotificationService) {}
}
