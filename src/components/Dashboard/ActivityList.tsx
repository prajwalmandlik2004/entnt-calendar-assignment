import React from 'react';
import { User } from 'lucide-react';
import { storage } from '../../utils/storage';
// import { Activity } from '../../types';

export const ActivityList: React.FC = () => {
  const activities = storage.getActivities();
  const users = storage.getUsers();

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user?.name || 'Unknown User';
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
      <div className="bg-white shadow rounded-lg">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={`px-6 py-4 ${
              index !== activities.length - 1 ? 'border-b border-gray-200' : ''
            }`}
          >
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">
                  {activity.message}
                </p>
                <p className="text-sm text-gray-500">
                  {getUserName(activity.userId)} • {formatDate(activity.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};