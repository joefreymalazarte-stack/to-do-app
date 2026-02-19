'use client';

import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import ActivityLog from './components/ActivityLog';

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: string;
  priority?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface ActivityLogEntry {
  _id: string;
  taskId: string;
  action: string;
  details?: string;
  createdAt: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLogEntry[]>([]);

  useEffect(() => {
    fetchTasks();
    fetchActivityLogs();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3001/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const fetchActivityLogs = async () => {
    try {
      const response = await fetch('http://localhost:3001/activity-logs');
      const data = await response.json();
      setActivityLogs(data);
    } catch (error) {
      console.error('Failed to fetch activity logs:', error);
    }
  };

  const handleTaskAdded = () => {
    fetchTasks();
    fetchActivityLogs();
  };

  const handleTaskUpdated = () => {
    fetchTasks();
    fetchActivityLogs();
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-4 shadow-md flex items-center justify-between">
        <h1 className="text-3xl font-bold">Kanban Board</h1>
        <p className="text-sm font-medium">Let's keep track of how our projects and tasks are faring</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto px-6 py-4">
        <KanbanBoard 
          tasks={tasks} 
          onTaskAdded={handleTaskAdded}
          onTaskUpdated={handleTaskUpdated}
        />
      </div>
      
      {/* Activity Log Footer */}
      <div className="bg-indigo-600 text-white border-t border-indigo-700 px-6 py-3 h-40 flex flex-col flex-shrink-0 overflow-hidden">
        <ActivityLog logs={activityLogs} onLogsCleared={handleTaskUpdated} />
      </div>
    </div>
  );
}
