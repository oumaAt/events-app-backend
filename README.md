# Event Manager — Backend

A REST API for managing events with authentication, image upload, filtering and dashboard statistics.

📄 **Swagger UI:** http://localhost:3000/api-docs

## Features

- **Authentication** — register and login with bcrypt password hashing and JWT generation, route protection middleware
- **Event management** — create, list and delete events with filters by title, location, date and status
- **Image upload** — handled via Multer
- **Dashboard** — statistics by status, by location and events scheduled for today
- **Validation** — schema-based validation with Zod
- **Tests** — unit and integration tests with Jest and Supertest
- **Documentation** — full API docs via Swagger UI (OpenAPI 3.0)

## Tech Stack

- **Node.js + Express**
- **MongoDB + Mongoose**
- **Zod** — request validation
- **JWT + bcrypt** — authentication
- **Multer** — file uploads
- **Jest + Supertest** — testing
- **Swagger (OpenAPI 3.0)** — API documentation

## Getting Started

```bash
git clone https://github.com/oumaAt/events-app-backend.git
cd events-app-backend
npm install
```

### Environment Variables

Copy `.env.example` and fill in your values:

```bash
cp .env.example .env
```

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/events_db
JWT_SECRET=your_jwt_secret
```

### Run the app

```bash
npm start
```

### Run tests

```bash
npm run test
```

## API Documentation

Swagger UI is available at:

```
http://localhost:3000/api-docs
```
