/**
 * S — Single Responsibility Principle
 * Translates HTTP requests/responses. No business logic or database access here.
 */
export class OrderController {
  /** @param {import('../services/OrderService.js').OrderService} orderService */
  constructor(orderService) {
    this.orderService = orderService;
  }

  list = async (_req, res, next) => {
    try {
      const orders = await this.orderService.listOrders();
      res.json({ data: orders });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const order = await this.orderService.getOrder(req.params.id);
      res.json({ data: order });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const order = await this.orderService.placeOrder(req.body);
      res.status(201).json({ data: order });
    } catch (error) {
      next(error);
    }
  };
}
