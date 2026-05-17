# Express Store Sales API

RESTful API for store sales tracking.

## Stack

- Node.js + Express
- MongoDB + Mongoose

## Features

- Soft delete - deleted records remain in DB with status `0`
- Request body validation
- NoSQL injection protection
- Centralized error handling

## Setup

1. Clone the repository
2. Install dependencies:
```bash
   npm install
```
3. Create `.env` file based on `.env.example`.
4. Start the server:
```bash
   npm run dev
```

## Endpoints

### Sellers
| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/v1/sellers | Get all sellers |
| GET | /api/v1/sellers/:id | Get seller by id |
| POST | /api/v1/sellers | Create seller |
| PATCH | /api/v1/sellers/:id | Update seller |
| DELETE | /api/v1/sellers/:id | Delete seller |

### Stores
| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/v1/stores | Get all stores |
| GET | /api/v1/stores/:id | Get store by id |
| POST | /api/v1/stores | Create store |
| PATCH | /api/v1/stores/:id | Update store |
| DELETE | /api/v1/stores/:id | Delete store |

### Sales
| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/v1/sales | Get all sales |
| GET | /api/v1/sales/:id | Get sale by id |
| POST | /api/v1/sales | Create sale |
| PATCH | /api/v1/sales/:id | Update sale |
| DELETE | /api/v1/sales/:id | Delete sale |