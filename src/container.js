/**
 * Composition Root — wires concrete implementations to abstractions.
 * This is where Dependency Inversion becomes concrete at the application boundary.
 */
import { InMemoryOrderRepository } from './repositories/InMemoryOrderRepository.js';
import { EmailChannel } from './notifications/EmailChannel.js';
import { SmsChannel } from './notifications/SmsChannel.js';
import { NotificationService } from './notifications/NotificationService.js';
import { CreditCardProcessor } from './payment/CreditCardProcessor.js';
import { PayPalProcessor } from './payment/PayPalProcessor.js';
import { PaymentService } from './payment/PaymentService.js';
import { OrderService } from './services/OrderService.js';
import { OrderController } from './controllers/OrderController.js';

export function createContainer() {
  const orderRepository = new InMemoryOrderRepository();

  const notificationService = new NotificationService([
    new EmailChannel(),
    new SmsChannel(),
  ]);

  const paymentService = new PaymentService(
    new Map([
      ['credit_card', new CreditCardProcessor()],
      ['paypal', new PayPalProcessor()],
    ])
  );

  const orderService = new OrderService(
    orderRepository,
    paymentService,
    notificationService
  );

  const orderController = new OrderController(orderService);

  return { orderController, paymentService };
}
