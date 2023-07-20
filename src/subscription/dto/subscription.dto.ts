import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class SubscriptionDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  partnerCode: string;

  @IsString()
  @IsNotEmpty()
  serviceCode: string;

  @IsString()
  subscriptionKey: string;

  @IsBoolean()
  @IsNotEmpty()
  status: String;
}
