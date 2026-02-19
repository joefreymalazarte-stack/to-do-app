'use client';

import React, { useState } from 'react';

interface Task {
  _id: string;
  title: string;
  status: string;
  priority?: number;
}

interface TaskCardProps {
  task: Task;
  status: string;
  onTaskUpdated: () => void;
}

export default function TaskCard({ task, status, onTaskUpdated }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [isDragging, setIsDragging] = useState(false);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, status }),
      });

      if (response.ok) {
        setIsEditing(false);
        onTaskUpdated();
      }
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${task._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onTaskUpdated();
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('taskId', task._id);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg p-3 shadow">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2 px-2 py-1 border rounded text-sm"
        />
        <div className="flex gap-2">
          <button
            onClick={handleUpdate}
            className="flex-1 bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="flex-1 bg-gray-400 text-white px-2 py-1 rounded text-sm hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`bg-white rounded p-2 shadow hover:shadow-md transition-all cursor-grab active:cursor-grabbing text-xs ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <h3 className="font-semibold text-gray-800 text-sm break-words">{task.title}</h3>
      <div className="flex gap-1 mt-2">
        <button
          onClick={() => setIsEditing(true)}
          className="flex-1 bg-blue-500 text-white px-1.5 py-0.5 rounded text-xs hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 bg-red-500 text-white px-1.5 py-0.5 rounded text-xs hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
