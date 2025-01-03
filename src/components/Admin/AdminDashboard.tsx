import React from 'react';
import { Stats } from '../Dashboard/Stats';
import { ActivityList } from '../Dashboard/ActivityList';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <Stats />
      <ActivityList />
    </div>
  );
};