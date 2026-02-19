'use client';

import React, { useState } from 'react';
import TaskCard from './TaskCard';

interface Task {
  _id: string;
  title: string;
  status: string;
  priority?: number;
}

interface ColumnProps {
  status: string;
  tasks: Task[];
  onTaskUpdated: () => void;
  allTasks: Task[];
}

export default function Column({ status, tasks, onTaskUpdated, allTasks }: ColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  
  const columnNames: Record<string, string> = {
    todo: 'To Do',
    'in-progress': 'In Progress',
    done: 'Done',
  };

  const columnColors: Record<string, string> = {
    todo: 'bg-red-100 border-red-300',
    'in-progress': 'bg-yellow-100 border-yellow-300',
    done: 'bg-green-100 border-green-300',
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const taskId = e.dataTransfer.getData('taskId');
    if (!taskId) return;

    const task = allTasks.find((t) => t._id === taskId);
    if (!task) return;

    // Only update if task is moving to a different status
    if (task.status === status) return;

    try {
      const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: task.title,
          status,
          priority: task.priority,
        }),
      });

      if (response.ok) {
        // Task was updated successfully, create activity log
        await fetch('http://localhost:3001/activity-logs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            taskId,
            action: 'status_changed',
            details: {
              from: task.status,
              to: status,
            },
          }),
        });

        onTaskUpdated();
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div
      className={`rounded-lg border-2 p-3 transition-all flex flex-col h-full overflow-hidden ${columnColors[status]} ${
        isDragOver ? 'scale-105 opacity-75 border-blue-500' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h2 className="text-lg font-bold mb-3 text-gray-800">
        {columnNames[status]}
      </h2>
      <div className="space-y-2 overflow-y-auto flex-1 min-h-0">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            status={status}
            onTaskUpdated={onTaskUpdated}
          />
        ))}
        {tasks.length === 0 && (
          <p className="text-gray-500 text-center py-4 text-sm">No tasks</p>
        )}
      </div>
    </div>
  );
}
