# FoodBridge

FoodBridge is a microservices-based platform designed with a modern full-stack architecture.
The project uses a **monorepo structure** combining a React frontend, a Node.js API gateway, and a Spring Boot backend service. All services run using Docker and are orchestrated with Docker Compose.

The architecture is designed to mimic real-world production systems where a gateway layer handles routing and security while backend services manage core business logic.

---

# Architecture Overview

The application follows a layered microservice architecture:

Client → NGINX → Node API Gateway → Spring Boot Service → PostgreSQL

Components:

Frontend (React + Vite)
Serves the user interface.

NGINX Reverse Proxy
Routes traffic to appropriate services.

Node Gateway (Express + TypeScript)
Acts as an API gateway handling authentication, aggregation, and websocket connections.

Spring Boot Service
Contains core business logic and database interaction.

PostgreSQL Database
Stores persistent application data.

---

# Monorepo Structure

FoodBridge

```
FoodBridge
│
├── apps
│   ├── web                # React + Vite frontend
│   ├── api-node           # Node.js API Gateway (TypeScript)
│   └── api-spring         # Spring Boot backend service
│
├── nginx                  # NGINX reverse proxy configuration
│   └── nginx.conf
│
├── packages               # Shared packages (optional utilities)
│
├── docker-compose.yml     # Multi-service orchestration
├── pnpm-workspace.yaml    # Monorepo configuration
├── package.json
└── README.md
```

---

# Technology Stack

Frontend

* React
* Vite
* TypeScript

Backend

* Node.js
* Express.js
* TypeScript

Microservice

* Spring Boot
* Spring Data JPA

Database

* PostgreSQL

Infrastructure

* Docker
* Docker Compose
* NGINX

Package Management

* pnpm (monorepo workspace)

---

# Prerequisites

Before running the project, ensure the following tools are installed:

Node.js (>= 20)
pnpm
Docker
Docker Compose
Java 21
Maven

---

# Local Development Setup

Clone the repository

```
git clone https://github.com/yourusername/foodbridge.git
cd foodbridge
```

Install dependencies

```
pnpm install
```

---

# Running the System Using Docker

Build and start all services:

```
docker compose up --build
```

Services started:

NGINX → http://localhost
Frontend → http://localhost
Node Gateway → http://localhost/api
Spring Boot → internal service
PostgreSQL → port 5432

---

# Service Details

Frontend (apps/web)

Built using Vite and React.

Development

```
pnpm --filter web dev
```

Production build

```
pnpm --filter web build
```

---

Node API Gateway (apps/api-node)

Handles:

API routing
Authentication layer
WebSocket communication
Communication with Spring services

Run locally

```
pnpm --filter api-node dev
```

---

Spring Boot Service (apps/api-spring)

Responsible for:

Core business logic
Database interaction
JPA repositories

Run locally

```
cd apps/api-spring
mvn spring-boot:run
```

---

PostgreSQL

Configured in docker-compose.

Default credentials:

Database: foodbridge
User: foodbridge
Password: foodbridge

---

# NGINX Reverse Proxy

NGINX routes incoming requests:

/ → Frontend
/api → Node Gateway
/socket → WebSocket connections

Configuration file:

```
nginx/nginx.conf
```

---

# Environment Variables

Spring Boot service requires database configuration:

```
SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/foodbridge
SPRING_DATASOURCE_USERNAME=foodbridge
SPRING_DATASOURCE_PASSWORD=foodbridge
```

---

# Docker Services

Defined in `docker-compose.yml`

Containers created:

foodbridge-nginx
foodbridge-web
foodbridge-api-node
foodbridge-api-spring
foodbridge-postgres

---

# API Gateway Pattern

The Node service acts as an API gateway.

Benefits:

Central authentication
Rate limiting
Service aggregation
Security layer
Single entry point for APIs

Spring services remain internal and are not exposed publicly.

---

# Development Workflow

Typical development flow:

1. Modify service code
2. Rebuild containers

```
docker compose build
docker compose up
```

For faster development, services can be run locally outside Docker.

---

# Future Improvements

Authentication service (JWT / OAuth)
Redis caching layer
Kafka / RabbitMQ for event processing
CI/CD pipeline
Kubernetes deployment

---

# License

This project is licensed under the MIT License.

---

# Contributors

FoodBridge Development Team
