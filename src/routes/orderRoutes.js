import { Router } from 'express';

export function createOrderRoutes(orderController) {
  const router = Router();

  router.get('/', orderController.list);
  router.get('/:id', orderController.getById);
  router.post('/', orderController.create);

  return router;
}
