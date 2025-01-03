import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  User,
  LogOut,
  Building2,
  MessageSquare,
  LayoutGrid,
  Users,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = user?.role === 'admin' ? [
    { to: '/', icon: LayoutGrid, label: 'Dashboard' },
    { to: '/admin/companies', icon: Building2, label: 'Companies' },
    { to: '/admin/methods', icon: MessageSquare, label: 'Communication Methods' },
    { to: '/admin/users', icon: Users, label: 'User Management' }
  ] : [
    { to: '/user/dashboard', icon: LayoutGrid, label: 'Dashboard' },
    { to: '/user/companies', icon: Building2, label: 'Companies' },
    { to: '/user/calendar', icon: Calendar, label: 'Calendar' },
    { to: '/user/communications', icon: MessageSquare, label: 'Communications' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button className="p-2 rounded-md hover:bg-gray-100 lg:hidden">
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
              <div className="ml-4 font-semibold text-xl text-gray-800">
                Communication Manager
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">{user?.name}</span>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <User className="h-6 w-6 text-gray-600" />
                </button>
                <button 
                  onClick={handleLogout}
                  className="p-2 rounded-full hover:bg-gray-100 text-red-500"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg pt-16">
        <nav className="mt-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50
                ${isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''}
              `}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <main className="pl-64 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};


