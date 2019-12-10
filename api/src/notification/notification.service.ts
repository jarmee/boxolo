import { KafkaService } from '@jarmee/kafka';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  constructor(private readonly kafkaService: KafkaService) {}
}
