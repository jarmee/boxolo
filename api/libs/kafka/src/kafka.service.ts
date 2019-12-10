import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class KafkaService implements OnModuleInit {
  onModuleInit() {
    console.log('initialize kafka');
  }
}
