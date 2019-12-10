import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { Observable } from 'rxjs';

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka: Kafka;

  onModuleInit() {
    this.kafka = new Kafka({
      clientId: 'boxolo-api',
      brokers: ['localhost:9092'],
    });
  }

  createConsumer(groupId: string, topic: string): Observable<any> {
    const consumer = this.kafka.consumer({ groupId });
    return Observable.create(observer =>
      consumer
        .connect()
        .then(() => consumer.subscribe({ topic, fromBeginning: true }))
        .then(() =>
          consumer.run({
            eachMessage: async ({ partition, message }) => {
              observer.next({
                partition,
                offset: message.offset,
                value: message.value.toString(),
              });
            },
          }),
        )
        .catch(error => {
          observer.error(error);
        }),
    );
  }
}
