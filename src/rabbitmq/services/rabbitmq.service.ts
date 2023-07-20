import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async onModuleInit(): Promise<void> {
    await this.init();
  }

  private async init(): Promise<void> {
    try {
      this.connection = await amqp.connect('amqp://127.0.0.1:5672'); // Replace with your RabbitMQ URL
      this.channel = await this.connection.createChannel();
      console.log('RabbitMQ connection established.');
    } catch (error) {
      console.error('Error connecting to RabbitMQ:', error);
    }
  }

  async sendCallback(payload: any): Promise<void> {
    const queue = 'service_subscription_queue';

    try {
      await this.channel.assertQueue(queue, { durable: false });
      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));
      console.log('Message sent to RabbitMQ:', payload);
    } catch (error) {
      console.error('Error sending message to RabbitMQ:', error);
    }
  }

  async closeConnection(): Promise<void> {
    try {
      await this.channel.close();
      await this.connection.close();
      console.log('RabbitMQ connection closed.');
    } catch (error) {
      console.error('Error closing RabbitMQ connection:', error);
    }
  }
}
