import { IPaymentProcessor } from '../interfaces/IPaymentProcessor.js';

/**
 * O — Open/Closed Principle
 * Adding PayPal did not require changing CreditCardProcessor or OrderService.
 */
export class PayPalProcessor extends IPaymentProcessor {
  get providerName() {
    return 'paypal';
  }

  async charge(amount, { email }) {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Invalid PayPal email' };
    }

    return {
      success: true,
      transactionId: `pp_${Date.now()}`,
      provider: this.providerName,
      amount,
    };
  }
}
