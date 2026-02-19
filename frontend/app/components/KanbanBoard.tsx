'use client';

import React, { useState } from 'react';
import Column from './Column';
import TaskForm from './TaskForm';

interface Task {
  _id: string;
  title: string;
  status: string;
  priority?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface KanbanBoardProps {
  tasks: Task[];
  onTaskAdded: () => void;
  onTaskUpdated: () => void;
}

export default function KanbanBoard({ tasks, onTaskAdded, onTaskUpdated }: KanbanBoardProps) {
  const statuses = ['todo', 'in-progress', 'done'];

  const getTasksByStatus = (status: string) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="flex flex-col h-full gap-3">
      <TaskForm onTaskAdded={onTaskAdded} />

      <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
        {statuses.map((status) => (
          <Column
            key={status}
            status={status}
            tasks={getTasksByStatus(status)}
            onTaskUpdated={onTaskUpdated}
            allTasks={tasks}
          />
        ))}
      </div>
    </div>
  );
}
