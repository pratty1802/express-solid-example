import { INotificationChannel } from '../interfaces/INotificationChannel.js';

/**
 * S — Single Responsibility Principle
 * Orchestrates notifications only. Does not create orders or process payments.
 *
 * D — Dependency Inversion Principle
 * Depends on INotificationChannel abstractions, not concrete Email/SMS classes.
 */
export class NotificationService {
  /** @param {INotificationChannel[]} channels */
  constructor(channels) {
    this.channels = channels;
  }

  async notifyOrderPlaced(order, customer) {
    const message = {
      subject: `Order #${order.id} confirmed`,
      body: `Hi ${customer.name}, your order of $${order.total.toFixed(2)} is confirmed.`,
    };

    return Promise.all(
      this.channels.map((channel) => channel.send(customer.contact, message))
    );
  }
}
