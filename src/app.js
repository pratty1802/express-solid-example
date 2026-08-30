import express from 'express';
import { createContainer } from './container.js';
import { createOrderRoutes } from './routes/orderRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();
  const { orderController, paymentService } = createContainer();

  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/payment-providers', (_req, res) => {
    res.json({ providers: paymentService.listProviders() });
  });

  app.use('/api/orders', createOrderRoutes(orderController));
  app.use(errorHandler);

  return app;
}
