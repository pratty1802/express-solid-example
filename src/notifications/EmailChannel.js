import { INotificationChannel } from '../interfaces/INotificationChannel.js';

export class EmailChannel extends INotificationChannel {
  async send(recipient, message) {
    // In production: integrate with SendGrid, SES, etc.
    console.log(`[Email → ${recipient}] ${message.subject}: ${message.body}`);
    return { channel: 'email', delivered: true };
  }
}
