import { User, Project, Activity } from '../types';

const STORAGE_KEYS = {
  USERS: 'users',
  PROJECTS: 'projects',
  ACTIVITIES: 'activities',
  CURRENT_USER: 'currentUser',
} as const;

const initializeStorage = () => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  if (!users) {
    const adminUser: User = {
      id: '1',
      email: 'admin@example.com',
      password: 'admin123', 
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([adminUser]));
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify([]));
  }
};

export const storage = {
  initialize: initializeStorage,
  
  getUsers: (): User[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  },
  
  getCurrentUser: (): User | null => {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },
  
  setCurrentUser: (user: User | null) => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },
  
  addUser: (userData: Omit<User, 'id' | 'createdAt'>) => {
    const users = storage.getUsers();
    if (users.some(u => u.email === userData.email)) {
      throw new Error('Email already exists');
    }
    
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    
    storage.addActivity({
      type: 'user_registered',
      message: `New user ${newUser.name} registered`,
      userId: newUser.id,
    });
    
    return newUser;
  },

  updateUser: (id: string, updates: Partial<User>) => {
    const users = storage.getUsers();
    const index = users.findIndex(u => u.id === id);
    
    if (index === -1) {
      throw new Error('User not found');
    }
    
    if (updates.email && updates.email !== users[index].email) {
      if (users.some(u => u.id !== id && u.email === updates.email)) {
        throw new Error('Email already exists');
      }
    }
    
    users[index] = { ...users[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return users[index];
  },

  deleteUser: (id: string) => {
    const users = storage.getUsers();
    const currentUser = storage.getCurrentUser();
    
    if (currentUser?.id === id) {
      throw new Error('Cannot delete your own account');
    }
    
    const filteredUsers = users.filter(u => u.id !== id);
    if (filteredUsers.length === users.length) {
      throw new Error('User not found');
    }
    
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(filteredUsers));
    return true;
  },
  
  getProjects: (): Project[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS) || '[]');
  },
  
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => {
    const projects = storage.getProjects();
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    projects.push(newProject);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    
    storage.addActivity({
      type: 'project_created',
      message: `New project "${newProject.title}" created`,
      userId: newProject.userId,
    });
    
    return newProject;
  },
  
  updateProject: (id: string, updates: Partial<Project>) => {
    const projects = storage.getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));

      storage.addActivity({
        type: 'project_updated',
        message: `Project "${projects[index].title}" updated`,
        userId: projects[index].userId,
      });
      
      return projects[index];
    }
    return null;
  },
  
  getActivities: (): Activity[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVITIES) || '[]');
  },
  
  addActivity: (activity: Omit<Activity, 'id' | 'createdAt'>) => {
    const activities = storage.getActivities();
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    activities.unshift(newActivity); 
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
    return newActivity;
  },
};