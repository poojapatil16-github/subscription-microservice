import { Controller, Post, Body } from '@nestjs/common';
import { SubscriptionService } from '../services/subscription.service'; 
import { SubscriptionDto } from '../dto/subscription.dto'; 

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('subscribe')
  async subscribe(@Body() subscriptionDto: SubscriptionDto): Promise<any> {
    return this.subscriptionService.subscribe(subscriptionDto);
  }

  @Post('unsubscribe')
  async unsubscribe(@Body() subscriptionDto: SubscriptionDto): Promise<any> {
    return this.subscriptionService.unsubscribe(subscriptionDto);
  }
}
