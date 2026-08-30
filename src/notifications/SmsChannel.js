import { INotificationChannel } from '../interfaces/INotificationChannel.js';

export class SmsChannel extends INotificationChannel {
  async send(recipient, message) {
    console.log(`[SMS → ${recipient}] ${message.body}`);
    return { channel: 'sms', delivered: true };
  }
}
