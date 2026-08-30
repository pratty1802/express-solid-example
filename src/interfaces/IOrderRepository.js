/**
 * I — Interface Segregation Principle
 * Small, focused contract. Consumers only depend on order persistence,
 * not on unrelated concerns like notifications or payments.
 */
export class IOrderRepository {
  async findById(_id) {
    throw new Error('IOrderRepository.findById must be implemented');
  }

  async findAll() {
    throw new Error('IOrderRepository.findAll must be implemented');
  }

  async save(_order) {
    throw new Error('IOrderRepository.save must be implemented');
  }
}
