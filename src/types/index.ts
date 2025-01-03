export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'archived';
  userId: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  type: 'user_registered' | 'project_created' | 'project_updated';
  message: string;
  userId: string;
  createdAt: string;
}