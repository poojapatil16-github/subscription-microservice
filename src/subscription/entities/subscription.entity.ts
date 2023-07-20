import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Subscription extends Document {
  @Prop()
  email: string;

  @Prop()
  partnerCode: string;

  @Prop()
  serviceCode: string;

  @Prop()
  subscriptionKey: string;

  @Prop()
  status: string;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
