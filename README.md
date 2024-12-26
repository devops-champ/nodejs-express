# Skills Demonstrated

- Container Orchestration: Effective use of Docker Compose to manage multi-container applications.

- Environment-specific Configurations: Separate configurations for production and development environments.


## Dockerized Full-Stack Application

This repository demonstrates a containerized full-stack application setup using Docker. The stack includes:

- Node.js: The backend server.

- MongoDB: A NoSQL database.

- Redis: An in-memory data structure store, used as a cache and message broker.

- Nginx: Acts as a reverse proxy for serving the application.

## Docker Compose Setup 

Docker compose is configured to use a base configuration file and override files for development and production environments. This approach ensures modularity, flexibility, and environment-specific optimizations.

**Base Configuration (`docker-compose.yml`):**

The base file defines the core services (nginx, node-app, mongo, and redis) along with shared configurations such as volumes, networks, and basic environment variables. This file provides the foundation for the application and serves as a common starting point for all environments.

**Development Override (`docker-compose.dev.yml`):**

The override file for development extends the base configuration to include:

- Volume mounts for live code reloading (./:/app and /app/node_modules).
- Development-specific environment variables (NODE_ENV=development, SESSION_SECRET=secret).

**Production Override (`docker-compose.prod.yml`):**
The override file for production optimizes the setup by:

- Setting the environment to production (NODE_ENV=production).
- Running the application with a production-specific command (node index.js).