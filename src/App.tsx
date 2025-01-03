import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/Auth/LoginForm';
import { DashboardLayout } from './components/Layout/DashboardLayout';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { UserDashboard } from './components/User/UserDashboard';
import { CompanyManagement } from './components/Admin/Companies/CompanyManagement';
import { MethodManagement } from './components/Admin/CommunicationMethods/MethodManagement';
import { UserManagement } from './components/Admin/Users/UserManagement';
import { CompanyOverview } from './components/User/CompanyOverview';
import { CommunicationLog } from './components/User/CommunicationLog';
import { CalendarView } from './components/User/Calendar/CalendarView';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole && !(requiredRole === 'user' && user.role === 'admin')) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!user ? <LoginForm /> : <Navigate to="/" replace />} />
      
      <Route element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={user?.role === 'admin' ? <AdminDashboard /> : <UserDashboard />} />
        
        <Route path="admin">
          <Route path="companies" element={
            <ProtectedRoute requiredRole="admin">
              <CompanyManagement />
            </ProtectedRoute>
          } />
          <Route path="methods" element={
            <ProtectedRoute requiredRole="admin">
              <MethodManagement />
            </ProtectedRoute>
          } />
          <Route path="users" element={
            <ProtectedRoute requiredRole="admin">
              <UserManagement />
            </ProtectedRoute>
          } />
        </Route>

      
        <Route path="user">
          <Route path="dashboard" element={
            <ProtectedRoute requiredRole="user">
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route path="calendar" element={
            <ProtectedRoute requiredRole="user">
              <CalendarView />
            </ProtectedRoute>
          } />
          <Route path="companies" element={
            <ProtectedRoute requiredRole="user">
              <CompanyOverview />
            </ProtectedRoute>
          } />
          <Route path="companies/:companyId/communications" element={
            <ProtectedRoute requiredRole="user">
              <CommunicationLog />
            </ProtectedRoute>
          } />
        </Route>
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}