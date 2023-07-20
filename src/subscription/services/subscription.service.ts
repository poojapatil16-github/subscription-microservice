import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscription } from '../entities/subscription.entity'; 
import { SubscriptionDto } from '../dto/subscription.dto'; 
import { RabbitMQService } from 'src/rabbitmq/services/rabbitmq.service'; 
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name) private readonly subscriptionModel: Model<Subscription>,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  async subscribe(subscriptionDto: SubscriptionDto): Promise<any> {
    subscriptionDto.status = "subscribed";
    const subscriptionKey = uuidv4();
    subscriptionDto.subscriptionKey = subscriptionKey;
    const subscription = new this.subscriptionModel(subscriptionDto);
    const savedSubscription = await subscription.save();

    // Send callback via RabbitMQ
    const payload = {
      email: savedSubscription.email,
      partnerCode: savedSubscription.partnerCode,
      serviceCode: savedSubscription.serviceCode,
      status: savedSubscription.status,
      success:true,
      subscriptionKey: subscriptionKey,
      subscriptionDetails: savedSubscription,
    };
    await this.rabbitMQService.sendCallback(payload);

    return savedSubscription;
  }

  async unsubscribe(subscriptionDto: SubscriptionDto): Promise<any> {
    subscriptionDto.status = "unsubscribed";
    const subscription = new this.subscriptionModel(subscriptionDto);
    const savedSubscription = await subscription.save();

    // Send callback via RabbitMQ
    const payload = {
      email: savedSubscription.email,
      partnerCode: savedSubscription.partnerCode,
      serviceCode: savedSubscription.serviceCode,
      status: savedSubscription.status,
      success:true,
      subscriptionKey: "",
      subscriptionDetails: savedSubscription,
    };
    await this.rabbitMQService.sendCallback(payload);

    return savedSubscription;
  }
}
