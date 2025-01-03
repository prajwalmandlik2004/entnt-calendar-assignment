import { CommunicationMethod } from '../types/communicationMethod';

const STORAGE_KEY = 'communicationMethods';

const DEFAULT_METHODS: Omit<CommunicationMethod, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'LinkedIn Post',
    description: 'Share updates on LinkedIn company page',
    sequence: 1,
    isMandatory: true,
  },
  {
    name: 'LinkedIn Message',
    description: 'Direct message on LinkedIn',
    sequence: 2,
    isMandatory: true,
  },
  {
    name: 'Email',
    description: 'Email communication',
    sequence: 3,
    isMandatory: true,
  },
  {
    name: 'Phone Call',
    description: 'Direct phone communication',
    sequence: 4,
    isMandatory: false,
  },
  {
    name: 'Other',
    description: 'Other communication methods',
    sequence: 5,
    isMandatory: false,
  },
];

export const communicationMethodStorage = {
  initialize: () => {
    const methods = communicationMethodStorage.getMethods();
    if (methods.length === 0) {
      DEFAULT_METHODS.forEach(method => {
        communicationMethodStorage.addMethod(method);
      });
    }
  },

  getMethods: (): CommunicationMethod[] => {
    const methods = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return methods.sort((a: CommunicationMethod, b: CommunicationMethod) => a.sequence - b.sequence);
  },

  addMethod: (method: Omit<CommunicationMethod, 'id' | 'createdAt' | 'updatedAt'>): CommunicationMethod => {
    const methods = communicationMethodStorage.getMethods();
    const newMethod: CommunicationMethod = {
      ...method,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    methods.push(newMethod);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(methods));
    return newMethod;
  },

  updateMethod: (id: string, updates: Partial<Omit<CommunicationMethod, 'id' | 'createdAt'>>): CommunicationMethod | null => {
    const methods = communicationMethodStorage.getMethods();
    const index = methods.findIndex(m => m.id === id);
    
    if (index !== -1) {
      methods[index] = {
        ...methods[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(methods));
      return methods[index];
    }
    return null;
  },

  deleteMethod: (id: string): boolean => {
    const methods = communicationMethodStorage.getMethods();
    const filteredMethods = methods.filter(m => m.id !== id);
    
    if (filteredMethods.length !== methods.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredMethods));
      return true;
    }
    return false;
  },
};