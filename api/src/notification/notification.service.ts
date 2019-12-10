import { KafkaService } from '@jarmee/kafka';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { Notification } from './notification.model';

@Injectable()
export class NotificationService implements OnModuleInit, OnModuleDestroy {
  notifications$: BehaviorSubject<Notification[]> = new BehaviorSubject<
    Notification[]
  >([]);

  private notificationSubscription: Subscription;

  constructor(private readonly kafkaService: KafkaService) {}

  onModuleInit() {
    this.notificationSubscription = this.kafkaService
      .createConsumer('notification-group', 'notification')
      .pipe(
        map(({ value: data }) => ({ data })),
        withLatestFrom(this.notifications$),
        map(([notification, notifications]) => [
          ...notifications,
          notification,
        ]),
      )
      .subscribe(notifications => this.notifications$.next(notifications));
  }

  onModuleDestroy() {
    this.notificationSubscription.unsubscribe();
  }
}
