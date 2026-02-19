# To-Do Web App

A full-stack to-do application with drag-and-drop functionality, built with Next.js, NestJS, and MongoDB.

## Features

- ✨ **Drag & Drop Kanban Board** - Move tasks between To Do, In Progress, and Done columns
- 📝 **Create/Edit/Delete Tasks** - Full task management capabilities
- 📊 **Activity Logging** - Track all changes with timestamps
- 🎯 **Responsive Design** - Works on desktop and mobile devices
- 🔄 **Real-time Updates** - View changes instantly

## Project Structure

```
to-do-app/
├── frontend/          # Next.js React application
├── backend/           # NestJS API server
├── docker-compose.yml # MongoDB setup
└── .github/
    └── copilot-instructions.md
```

## Tech Stack

### Frontend
- **Next.js 15+** - React framework
- **React 19** - UI library
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

### Backend
- **NestJS** - Node.js framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **TypeScript** - Type safety

### Database
- **MongoDB 7.0** - Running in Docker

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Docker & Docker Compose (for MongoDB)

### Installation

1. **Start MongoDB**
   ```bash
   docker-compose up -d
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   npm run start:dev
   ```
   Backend runs on `http://localhost:3001`

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend runs on `http://localhost:3000`

## API Endpoints

### Tasks
- `GET /tasks` - Get all tasks
- `POST /tasks` - Create a new task
- `GET /tasks/:id` - Get a specific task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task
- `GET /tasks/status/:status` - Get tasks by status

### Activity Logs
- `GET /activity-logs` - Get all activity logs
- `POST /activity-logs` - Create an activity log
- `GET /activity-logs/task/:taskId` - Get logs for a specific task
- `DELETE /activity-logs/:id` - Delete an activity log

## Development

### Backend Development
```bash
cd backend
npm run start:dev  # Run with hot reload
npm run build      # Build for production
npm test           # Run tests
```

### Frontend Development
```bash
cd frontend
npm run dev        # Run with hot reload
npm run build      # Build for production
npm run lint       # Run ESLint
```

## Database Schema

### Task
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  status: Enum['todo', 'in-progress', 'done'],
  priority: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### ActivityLog
```javascript
{
  _id: ObjectId,
  taskId: ObjectId (required),
  action: String (required),
  details: String,
  createdAt: Date
}
```

## Environment Variables

### Backend (.env)
```
PORT=3001
MONGODB_URI=mongodb://admin:password@localhost:27017/todo_db?authSource=admin
NODE_ENV=development
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

## Docker Compose Configuration

The `docker-compose.yml` provides:
- MongoDB 7.0 service
- Authentication with admin/password
- Data persistence with named volume
- Network isolation

## Future Enhancements

- [ ] User authentication & authorization
- [ ] Task filtering and sorting
- [ ] Due dates and reminders
- [ ] Task categories/tags
- [ ] Real-time WebSocket updates
- [ ] File attachments
- [ ] Task comments and collaboration
- [ ] Dark mode toggle

## Troubleshooting

### MongoDB Connection Issues
- Ensure Docker is running: `docker ps`
- Check MongoDB logs: `docker logs to-do-mongodb`
- Verify connection string in `.env`

### CORS Errors
- Check backend is running on port 3001
- Verify CORS is enabled in backend `main.ts`
- Check frontend API base URL

### Port Conflicts
- Backend: Change PORT in backend/.env
- Frontend: Use `npm run dev -- -p 3000` to specify port
- MongoDB: Change port in docker-compose.yml

## License

MIT

## Author

Created for educational purposes.
