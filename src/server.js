import { createApp } from './app.js';

const PORT = process.env.PORT ?? 3000;
const app = createApp();

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Try: POST /api/orders with a sample order body');
});
