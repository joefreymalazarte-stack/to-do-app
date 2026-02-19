# MongoDB Setup Options

This project can run with MongoDB in three different ways:

## Option 1: Docker (Recommended for Windows)

### Prerequisites
- Docker Desktop installed on your system
- Download from: https://www.docker.com/products/docker-desktop

### Steps
1. Ensure Docker Desktop is running
2. Run the following command in the project root:
```bash
docker compose up -d
```
3. MongoDB will automatically start with:
   - Username: `admin`
   - Password: `password`
   - Database: `todo_db`
   - Connection string: `mongodb://admin:password@localhost:27017/todo_db?authSource=admin`

4. To verify it's running:
```bash
docker ps
```

5. To stop MongoDB:
```bash
docker compose down
```

## Option 2: Local MongoDB Installation

### Prerequisites
- Download MongoDB Community Edition: https://www.mongodb.com/try/download/community
- Choose Windows installer and follow the installation wizard
- MongoDB will automatically install as a Windows Service

### Steps
1. Install MongoDB Community Edition
2. MongoDB will start automatically as a service
3. Default connection string: `mongodb://localhost:27017/todo_db`
4. The `.env` file is already configured for local MongoDB

### Verify MongoDB is Running
- Open PowerShell and run:
```bash
mongo
```
- Or check Services tab in Windows (search "Services")

## Option 3: MongoDB Atlas (Cloud)

### Steps
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Update `backend/.env` with your connection string:
```
MONGODB_URI=your_atlas_connection_string
```

## Recommended for Windows Users

**Docker** is recommended because:
- No local installation needed
- Consistent environment
- Easy to start/stop
- Isolated from your system

If you don't have Docker, **Local MongoDB Installation** is the easiest alternative.

## Troubleshooting

### MongoDB Connection Errors
1. Check that MongoDB is actually running
2. Verify the connection string in `backend/.env`
3. Make sure port 27017 is not blocked by firewall

### Port Already in Use
If port 27017 is in use by another MongoDB instance:
- Option 1: Stop the other MongoDB instance
- Option 2: Change the connection string to use a different port
- Option 3: Use MongoDB Atlas instead

### Docker-specific Issues
- `docker compose: command not found` - Update Docker Desktop to latest version
- `docker: daemon not running` - Start Docker Desktop application
