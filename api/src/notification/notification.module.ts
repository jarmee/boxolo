import { KafkaModule } from '@jarmee/kafka';
import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
  imports: [KafkaModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
