# BookingPitchService Backend

Backend service for the football pitch booking platform, built with NestJS + TypeORM + PostgreSQL.

For architecture and delivery roadmap details, see PROJECT_SCHEDULE.md.

## 1) Tech stack

- NestJS 12
- TypeORM
- PostgreSQL 16
- JWT auth (access token + refresh token)
- ValidationPipe global + class-validator
- Morgan logging

## 2) Current status

Current modules:

- companies
- venues
- pitches
- time-slots
- bookings
- booking-items
- invoices
- recurring-schedules
- users
- auth

Notes:

- Most domain modules are currently scaffold-level (controller/service skeletons).
- Auth/users endpoints are implemented and working.

## 3) Key data model

- users and companies currently follow a 1-1 relationship:
  - each company has one representative user for registration/operations.
  - users.company_id references companies.
- bookings includes company_id and venue_id.
- recurring_schedules now uses start_time/end_time field names.

## 4) Environment requirements

Create a .env file in the backend directory with at least:

- DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DB_NAME
- DB_SSL=false
- PORT=3000
- JWT_ACCESS_SECRET=your_access_secret
- JWT_REFRESH_SECRET=your_refresh_secret
- JWT_ACCESS_EXPIRES_IN_SECONDS=900
- JWT_REFRESH_EXPIRES_IN_SECONDS=604800

Database note:

- The current TypeORM setup uses synchronize=true.
- Do not keep synchronize=true in production.

## 5) Setup and run

Install dependencies:

npm install

Run in development:

npm run dev

Build:

npm run build

Run in production (after build):

npm run start:prod

## 6) Available APIs

Auth:

- POST /auth/register
- POST /auth/login
- POST /auth/refresh
- POST /auth/logout (Bearer token)
- GET /auth/me (Bearer token)

Users (requires Bearer token):

- POST /users
- GET /users
- GET /users/:id
- PATCH /users/:id
- DELETE /users/:id

## 7) Sample payloads

Register:

{
"name": "Company Owner",
"email": "owner@example.com",
"password": "123456",
"company_id": "uuid-company-id",
"role": "venue_owner"
}

Login:

{
"email": "owner@example.com",
"password": "123456"
}

Refresh token:

{
"refreshToken": "<refresh-token>"
}

## 8) Scripts

- npm run dev: run in watch mode
- npm run build: build TypeScript
- npm run start:prod: run dist/main
- npm run lint: lint source code
- npm run test: run tests with Vitest

## 9) Related documents

- PROJECT_SCHEDULE.md: architecture, ERD, business flows, and planned API list.
