import { Controller, Get } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Controller('notification')
export class NotificationController {
  @Get()
  getNotifications(): Observable<Notification[]> {
    return of([]);
  }
}
