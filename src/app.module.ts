import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionModule } from './subscription/subscription.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/subscriptions'),
    SubscriptionModule,
    RabbitMQModule
  ],
})
export class AppModule {}
