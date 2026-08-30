/**
 * O — Open/Closed Principle (via abstraction)
 * New payment methods extend this contract without modifying existing processors.
 *
 * L — Liskov Substitution Principle
 * Any implementation must honor the same contract so callers can swap processors safely.
 */
export class IPaymentProcessor {
  /**
   * @returns {{ success: boolean, transactionId?: string, error?: string }}
   */
  async charge(_amount, _paymentDetails) {
    throw new Error('IPaymentProcessor.charge must be implemented');
  }

  get providerName() {
    throw new Error('IPaymentProcessor.providerName must be implemented');
  }
}
