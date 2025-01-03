import React from 'react';
import { storage } from '../../utils/storage';

export const Stats: React.FC = () => {
  const users = storage.getUsers();
  // const projects = storage.getProjects();
  // const activeProjects = projects.filter(p => p.status === 'active');

  const stats = [
    {
      title: 'Total Users',
      value: users.length.toString(),
      change: '+'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            <span className="ml-2 text-sm font-medium text-green-600">
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};