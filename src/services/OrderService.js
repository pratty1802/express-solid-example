import { IOrderRepository } from '../interfaces/IOrderRepository.js';

/**
 * S — Single Responsibility Principle
 * Contains order business logic only. HTTP, persistence, and payments are delegated.
 *
 * D — Dependency Inversion Principle
 * High-level OrderService depends on abstractions (repository, payment, notifications),
 * not on Express, in-memory storage, or a specific payment gateway.
 */
export class OrderService {
  /**
   * @param {IOrderRepository} orderRepository
   * @param {import('../payment/PaymentService.js').PaymentService} paymentService
   * @param {import('../notifications/NotificationService.js').NotificationService} notificationService
   */
  constructor(orderRepository, paymentService, notificationService) {
    this.orderRepository = orderRepository;
    this.paymentService = paymentService;
    this.notificationService = notificationService;
  }

  async listOrders() {
    return this.orderRepository.findAll();
  }

  async getOrder(id) {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      const error = new Error(`Order ${id} not found`);
      error.statusCode = 404;
      throw error;
    }
    return order;
  }

  async placeOrder({ customer, items, paymentProvider, paymentDetails }) {
    this.#validateItems(items);

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const paymentResult = await this.paymentService.charge(
      paymentProvider,
      total,
      paymentDetails
    );

    if (!paymentResult.success) {
      const error = new Error(paymentResult.error);
      error.statusCode = 402;
      throw error;
    }

    const order = await this.orderRepository.save({
      customerId: customer.id,
      customerName: customer.name,
      items,
      total,
      status: 'paid',
      payment: {
        provider: paymentProvider,
        transactionId: paymentResult.transactionId,
      },
      createdAt: new Date().toISOString(),
    });

    await this.notificationService.notifyOrderPlaced(order, customer);

    return order;
  }

  #validateItems(items) {
    if (!Array.isArray(items) || items.length === 0) {
      const error = new Error('Order must contain at least one item');
      error.statusCode = 400;
      throw error;
    }

    for (const item of items) {
      if (!item.name || item.price <= 0 || item.quantity <= 0) {
        const error = new Error('Each item needs a name, positive price, and quantity');
        error.statusCode = 400;
        throw error;
      }
    }
  }
}
