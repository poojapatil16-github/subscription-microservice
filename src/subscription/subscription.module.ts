import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionController } from 'src/subscription/controller/subscription.controller'; 
import { SubscriptionService } from 'src/subscription/services/subscription.service'; 
import { Subscription, SubscriptionSchema } from './entities/subscription.entity'; 
import { RabbitMQModule } from 'src/rabbitmq/rabbitmq.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Subscription.name, schema: SubscriptionSchema }]), RabbitMQModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
