import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { storage } from '../utils/storage';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  register: (userData: { email: string; password: string; name: string }) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    storage.initialize();
    const currentUser = storage.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const users = storage.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    storage.setCurrentUser(user);
    setUser(user);
    return user;
  };

  const logout = () => {
    storage.setCurrentUser(null);
    setUser(null);
  };

  const register = async (userData: { email: string; password: string; name: string }) => {
    const users = storage.getUsers();
    if (users.some(u => u.email === userData.email)) {
      throw new Error('Email already exists');
    }
    
    const newUser = storage.addUser({
      ...userData,
      role: 'user',
    });
    
    return newUser;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};