# Quick Start Guide

## Starting the Application

### Option 1: Run All at Once (Recommended)
Press `Ctrl+Shift+B` (or Cmd+Shift+B on Mac) to run the default task "Full Stack: Start All"

This will start:
1. MongoDB in Docker
2. NestJS backend on port 3001
3. Next.js frontend on port 3000

**Note**: This requires Docker Desktop to be installed. If you don't have Docker, use Option 2 or 3 instead.

### Option 2: Start Individual Services (with Docker)

**Terminal 1 - MongoDB:**
```bash
docker compose up -d
```

### Option 3: Start Without Docker (Local MongoDB)

**Prerequisites**: MongoDB must be installed and running on your machine
- Download MongoDB Community Edition from https://www.mongodb.com/try/download/community
- Start MongoDB service on your system

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Setup MongoDB Connection

### With Docker (Recommended)
```bash
docker compose up -d
```
MongoDB will be accessible at `mongodb://admin:password@localhost:27017/todo_db?authSource=admin`

### Local Installation
1. Install MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Start the MongoDB service on your system
3. MongoDB will be accessible at the default `mongodb://localhost:27017/todo_db`

**Note**: If using local MongoDB, update the `MONGODB_URI` in `backend/.env` to:
```
MONGODB_URI=mongodb://localhost:27017/todo_db
```

## Setup MongoDB Connection

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **MongoDB**: localhost:27017 (admin/password)

## Available Tasks in VS Code

Open Command Palette (Ctrl+Shift+P or Cmd+Shift+P) and search for "Tasks: Run Task"

- **Start MongoDB** - Starts MongoDB container
- **Stop MongoDB** - Stops MongoDB container
- **Backend: Install & Start Dev** - Installs dependencies and starts backend with hot reload
- **Frontend: Install & Start Dev** - Installs dependencies and starts frontend dev server
- **Full Stack: Start All** - Runs all three services

## Features to Test

1. **Create a Task**
   - Enter a title in the "Create New Task" form
   - Optionally add a description
   - Click "Create Task"

2. **View Tasks**
   - Tasks appear in the "To Do" column by default
   - Check the Activity Log on the right for creation events

3. **Edit a Task**
   - Click the "Edit" button on any task card
   - Modify the title or description
   - Click "Save" to update

4. **Delete a Task**
   - Click the "Delete" button on any task card
   - Task will be removed immediately

5. **View Activity Log**
   - All actions are logged with timestamps
   - Scroll through recent activities in the sidebar

## Stopping the Services

- **Stop Frontend**: Press Ctrl+C in the frontend terminal
- **Stop Backend**: Press Ctrl+C in the backend terminal
- **Stop MongoDB**: Run `docker-compose down`

## Troubleshooting

- **Connection refused errors**: Ensure MongoDB is running (`docker-compose up -d`)
- **Port already in use**: Check if services are already running on ports 3000, 3001, or 27017
- **CORS errors**: Verify backend is running on port 3001
- **Module not found**: Run `npm install` in the relevant directory

## Environment Files

- **Backend**: `.env` (MongoDB connection string)
- **Frontend**: `.env.local` (API base URL)

No changes needed unless you modify the default ports or MongoDB credentials.
