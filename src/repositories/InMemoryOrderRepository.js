import { IOrderRepository } from '../interfaces/IOrderRepository.js';

/**
 * S — Single Responsibility Principle
 * This class only handles order persistence. It does not send emails,
 * validate payments, or format HTTP responses.
 */
export class InMemoryOrderRepository extends IOrderRepository {
  #orders = new Map();
  #nextId = 1;

  async findById(id) {
    return this.#orders.get(Number(id)) ?? null;
  }

  async findAll() {
    return [...this.#orders.values()];
  }

  async save(order) {
    const id = order.id ?? this.#nextId++;
    const saved = { ...order, id, updatedAt: new Date().toISOString() };
    this.#orders.set(id, saved);
    return saved;
  }
}
