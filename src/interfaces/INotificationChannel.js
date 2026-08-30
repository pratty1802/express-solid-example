/**
 * I — Interface Segregation Principle
 * Notification channels share only what they need: a way to send a message.
 * Email and SMS don't inherit unused methods from a bloated base class.
 */
export class INotificationChannel {
  async send(_recipient, _message) {
    throw new Error('INotificationChannel.send must be implemented');
  }
}
