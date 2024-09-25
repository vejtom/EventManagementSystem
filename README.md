# Event Management System

The Event Management System is a full-stack web application designed to help users organize and manage events. The backend is built using Node.js, Express, TypeScript, and Prisma for database interactions with PostgreSQL. The frontend is built with React, Vite, TypeScript, and Tailwind CSS for the UI. The project uses Docker for easy database management and supports both development and production environments.

## General Setup (Development & Production)
Follow these steps to set up the project for both development and production. Specific instructions for each environment are provided in the later sections.

### 1. Install Dependencies:
Run the following command __in the frontend & backend directories__ to install all the necessary dependencies.

```bash
npm install
```


### 2. Set Up Environment Variables:
Rename the `.env.example` file to `.env` in both __frontend and backend directories__.

In `.env` file for the backend, configure the `DATABASE_URL` – replace user, password, port & database name with your own values. Also, depending on the environment, set `NODE_ENV` to either `development` or `production.`
```env
NODE_ENV=development

DATABASE_URL=postgresql://user:password@localhost:5432/event_management_system
```

### 3. Run PostgreSQL in Docker:
Ensure that no other PostgreSQL instance is running on port 5432 (or the one you specified in .env). Start the PostgreSQL container by running (replace with proper user, password, database name & port if you changed it in your .env):

```bash
docker run --name event-management-db -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=event_management_system -p 5432:5432 -d postgres
```

## Additional Development Environment Setup
If you followed the [General Setup](#general-setup-development--production) continue with the steps below.

### 1. Set Up Prisma:
In the __backend__ apply database migrations and generate the Prisma client:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 2. Start the Development Servers:
You can run both frontend and backend servers in development mode concurrently. Open two terminal windows or tabs and use the command below in __backend and frontend directories__:

```bash
npm run dev
```

After this, you should be able to access the backend API at [http://localhost:3000](http://localhost:3000) and the frontend at [http://localhost:5173](http://localhost:5173) (or as specified in your setup).

### Development-Specific Scripts
You can run these scripts in both Frontend & Backend directories:
* `npm run dev` -> Run the server in development mode (with hot reloading).
* `npm run lint` -> Lint files using ESLint to enforce code quality standards.
* `npm run typecheck` -> Perform TypeScript type checking to ensure type safety.

## Production Environment Setup
If you followed the [General Setup](#general-setup-development--production) continue with the steps below.

### 1. Set Up Prisma:
In the __backend__ apply database migrations and generate the Prisma client for production:

```bash
npx prisma migrate deploy
npx prisma generate
```

### 2. Build the Application:
Before running the production app, build both the frontend and backend. Run the following commands in the __backend and frontend directories__:

```bash
npm run build
```

### 3. Run the Application:
Run the following commands to run the application:

Backend:
```bash
node dist/index.js # In case of dist folder change, replace with a different folder name
```

Frontend:
```bash
npm run preview
```
If you don't want to use Vite Preview, copy the static files from `frontend/dist` to a web server like Apache, Nginx, or Vercel.

After this, you should be able to access the backend API at [http://localhost:3000](http://localhost:3000) and the frontend at [http://localhost:4173](http://localhost:4173) (or as specified in your setup).


### Production-Specific Scripts
* `npm run build` -> Build the application for production.
* `npm run preview` -> Preview the production build of the frontend.