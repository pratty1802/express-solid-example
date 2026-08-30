import { IPaymentProcessor } from '../interfaces/IPaymentProcessor.js';

export class CreditCardProcessor extends IPaymentProcessor {
  get providerName() {
    return 'credit_card';
  }

  async charge(amount, { cardNumber, cvv }) {
    if (!cardNumber || cardNumber.length < 13) {
      return { success: false, error: 'Invalid card number' };
    }
    if (!cvv || cvv.length < 3) {
      return { success: false, error: 'Invalid CVV' };
    }

    return {
      success: true,
      transactionId: `cc_${Date.now()}`,
      provider: this.providerName,
      amount,
    };
  }
}
