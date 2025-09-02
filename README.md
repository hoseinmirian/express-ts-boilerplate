# Express TypeScript Boilerplate

## Sponsor Me
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-GitHub-brightgreen)](https://github.com/sponsors/hoseinmirian)

A fully-typed, ready-to-use **Express.js boilerplate in TypeScript** for building scalable backend applications quickly. Designed for developers and teams who want a strong starting point with TypeScript, linting, testing, and modern best practices.

# 🚀 Full-Stack Boilerplate with TypeScript, Express, MongoDB, Mongoose, EJS (SSR), Vue.js, React & Service Layer Architecture

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-8BC34A?style=for-the-badge&logo=ejs&logoColor=white)
![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Server Side Rendering](https://img.shields.io/badge/SSR-EJS%20Template-blue?style=for-the-badge)
![REST API](https://img.shields.io/badge/API-REST-orange?style=for-the-badge)
![Architecture](https://img.shields.io/badge/Architecture-Service%20Layer-lightgrey?style=for-the-badge)
---

## Features

- ⚡ Express.js — fast, minimalist web framework
- 🟦 TypeScript — type safety and modern JavaScript features
- 🛡️ Security — Helmet, CORS, rate limiting, XSS/mongo injection sanitizers
- 🧰 Architecture — clear separation of routes, controllers, services, and models
- 🔑 Auth Ready — JWT authentication & cookie support
- 🧪 Testing — Jest + Supertest for unit & integration tests
- 🗃 Migrations — MongoDB migrations via migrate-mongo
- 🎨 Code Quality — ESLint + Prettier setup
- 🔄 Hot Reload — Nodemon for development


---

## Installation

```bash
# Clone the repo
git clone https://github.com/hoseinmirian/express-ts-boilerplate.git

# Install dependencies
cd express-ts-boilerplate
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Run migration up
npm run migrate:up

# Run migration down
npm run migrate:down
```

## Environment Variables

- Create a `.env` file in the root directory and add the following variables:
- The .env file as set, the application will run and setup the database connection (mongo db atlas)
- Whether defining NODE_ENV to development, production the database will be created in mongodb automatically.


```# Application
NODE_ENV=development          # Runtime environment: development | production | test
PORT=8000                     # Port number the server will listen on

# Database
DATABASE_URI=                 # MongoDB connection string (e.g. mongodb+srv://<user>:<password>@cluster0.mongodb.net)
DATABASE_NAME=                # Name of the MongoDB database to use

# Authentication (JWT)
JWT_SECRET=                   # A long, random secret key used to sign JWT tokens
JWT_EXPIRES_IN=1m             # Access token lifetime (e.g. 1m, 15m, 1h, 7d)

# Cookie settings
# Format: (number + unit). Supported units: second, minute, hour, day
JWT_COOKIE_EXPIRES_IN=1       # Cookie expiration value
JWT_COOKIE_EXPIRES_IN_UNIT=minute  

# CORS
# Allowed origins for cross-origin requests, separated by commas
ALLOW_ORIGINS=http://localhost:8000,https://example.com
```

## Project Structure

```
├── config/              # App configuration (DB, env, etc.)
├── constants/           # Global constants
├── controllers/         # Route controllers (request handlers), including both api and web controllers
├── coverage/            # Test coverage output
├── dist/                # Compiled JS (build output)
├── frontend/            # (Optional) client-side assets or integrations
├── middlewares/         # Express middlewares (auth, errors, etc.)
├── migrations/          # Database migration scripts
├── models/              # Mongoose models (schemas)
├── public/              # Static files
├── routes/              # Route definitions
├── services/            # Business logic & helpers
├── tests/               # Unit & integration tests
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── validationSchemas/   # Zod/Yup schemas for validation
├── views/               # EJS templates (if server-side rendering)
```

## Demo
<img width="1512" height="721" alt="image" src="https://github.com/user-attachments/assets/27e93b7d-0d85-4e82-b1f9-27d19d3158cf" />

