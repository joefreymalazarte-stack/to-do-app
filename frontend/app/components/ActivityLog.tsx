'use client';

import React, { useState, useEffect } from 'react';

interface ActivityLogEntry {
  _id: string;
  taskId: string;
  action: string;
  details?: string;
  createdAt: string;
}

interface ActivityLogProps {
  logs: ActivityLogEntry[];
}

export default function ActivityLog({ logs }: ActivityLogProps) {
  const [displayLogs, setDisplayLogs] = useState<ActivityLogEntry[]>([]);

  useEffect(() => {
    setDisplayLogs(logs);
  }, [logs]);

  const actionLabels: Record<string, string> = {
    created: '✨ Created',
    status_changed: '🔄 Status Changed',
    updated: '✏️ Updated',
    deleted: '🗑️ Deleted',
  };

  return (
    <div className="w-full flex flex-col h-full">
      <h2 className="text-lg font-bold mb-2 text-white">Activity Log</h2>

      {displayLogs.length === 0 ? (
        <p className="text-indigo-200 text-sm">No activities yet</p>
      ) : (
        <div className="space-y-1 overflow-y-auto flex-1 min-h-0 pr-2">
          {displayLogs.slice(0, 20).map((log) => (
            <div key={log._id} className="border-l-2 border-orange-300 pl-2 py-1">
              <p className="text-xs font-semibold text-white">
                {actionLabels[log.action] || log.action}
              </p>
              {log.details && (
                <p className="text-xs text-indigo-100">{log.details}</p>
              )}
              <p className="text-xs text-indigo-300">
                {new Date(log.createdAt).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
