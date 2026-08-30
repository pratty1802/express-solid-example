import { IPaymentProcessor } from '../interfaces/IPaymentProcessor.js';

/**
 * O — Open/Closed Principle
 * Stripe added without modifying OrderService, PaymentService, or existing processors.
 *
 * L — Liskov Substitution Principle
 * Same charge() contract and return shape as CreditCardProcessor / PayPalProcessor.
 */
export class StripeProcessor extends IPaymentProcessor {
  get providerName() {
    return 'stripe';
  }

  async charge(amount, { paymentMethodId }) {
    if (!paymentMethodId || !paymentMethodId.startsWith('pm_')) {
      return { success: false, error: 'Invalid Stripe payment method ID' };
    }

    // In production: stripe.paymentIntents.create({ amount, payment_method: paymentMethodId, ... })
    return {
      success: true,
      transactionId: `stripe_${Date.now()}`,
      provider: this.providerName,
      amount,
    };
  }
}
