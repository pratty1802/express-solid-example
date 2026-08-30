# Express SOLID Principles — Real-World Example

A small **order management API** built with Express.js. Each SOLID principle maps to a concrete design decision in the codebase.

## Domain

Customers place orders with line items. The system charges a payment provider, persists the order, and sends confirmation notifications.

```
HTTP Request → Controller → Service → Repository / Payment / Notifications
```

## SOLID in This Project

| Principle | Where it shows up |
|-----------|-------------------|
| **S** — Single Responsibility | `OrderController` (HTTP), `OrderService` (business rules), `InMemoryOrderRepository` (persistence), `PaymentService` (charging), `NotificationService` (alerts) |
| **O** — Open/Closed | Add a new payment method by creating `StripeProcessor extends IPaymentProcessor` and registering it in `container.js` — no changes to `OrderService` |
| **L** — Liskov Substitution | `CreditCardProcessor` and `PayPalProcessor` are interchangeable wherever `IPaymentProcessor` is expected |
| **I** — Interface Segregation | Small contracts: `IOrderRepository`, `INotificationChannel`, `IPaymentProcessor` instead of one god-interface |
| **D** — Dependency Inversion | `OrderService` receives abstractions via constructor; `container.js` binds implementations |

## Quick Start

```bash
npm install
npm start
```

Server runs at `http://localhost:3000`.

## API Examples

**Health check**

```bash
curl http://localhost:3000/health
```

**List payment providers**

```bash
curl http://localhost:3000/payment-providers
```

**Place an order (credit card)**

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer": { "id": "c1", "name": "Alice", "contact": "alice@example.com" },
    "items": [
      { "name": "Mechanical Keyboard", "price": 129.99, "quantity": 1 },
      { "name": "USB-C Hub", "price": 49.99, "quantity": 2 }
    ],
    "paymentProvider": "credit_card",
    "paymentDetails": { "cardNumber": "4111111111111111", "cvv": "123" }
  }'
```

**Place an order (PayPal)**

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer": { "id": "c2", "name": "Bob", "contact": "+15551234567" },
    "items": [{ "name": "Monitor Stand", "price": 79.00, "quantity": 1 }],
    "paymentProvider": "paypal",
    "paymentDetails": { "email": "bob@paypal.com" }
  }'
```

**List orders**

```bash
curl http://localhost:3000/api/orders
```

## Extending Without Breaking SOLID

### Add Stripe payments (Open/Closed)

1. Create `src/payment/StripeProcessor.js` implementing `IPaymentProcessor`
2. Register in `container.js`: `['stripe', new StripeProcessor()]`
3. Clients send `"paymentProvider": "stripe"` — `OrderService` stays unchanged

### Swap in PostgreSQL (Dependency Inversion)

1. Create `PostgresOrderRepository extends IOrderRepository`
2. Replace the binding in `container.js`
3. No changes to `OrderService` or `OrderController`

### Add push notifications (Interface Segregation)

1. Create `PushChannel extends INotificationChannel`
2. Add it to the channels array in `container.js`

## Project Structure

```
src/
├── interfaces/          # Abstractions (I, D, L)
├── repositories/        # Persistence (S)
├── payment/             # Payment strategies (O, L)
├── notifications/       # Notification channels (I, S)
├── services/            # Business logic (S, D)
├── controllers/         # HTTP layer (S)
├── routes/
├── middleware/
├── container.js         # Composition root (D)
├── app.js
└── server.js
```
