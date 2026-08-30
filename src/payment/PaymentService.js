/**
 * S — Single Responsibility Principle
 * Resolves the correct payment processor and delegates charging.
 * Order business rules live in OrderService, not here.
 */
export class PaymentService {
  /** @param {Map<string, import('../interfaces/IPaymentProcessor.js').IPaymentProcessor>} processors */
  constructor(processors) {
    this.processors = processors;
  }

  async charge(provider, amount, paymentDetails) {
    const processor = this.processors.get(provider);
    if (!processor) {
      return { success: false, error: `Unsupported payment provider: ${provider}` };
    }

    // L — Liskov Substitution: any processor satisfies the same contract
    return processor.charge(amount, paymentDetails);
  }

  listProviders() {
    return [...this.processors.keys()];
  }
}
