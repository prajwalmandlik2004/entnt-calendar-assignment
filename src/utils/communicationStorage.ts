import { Communication } from '../types/communication';

const STORAGE_KEY = 'communications';

export const communicationStorage = {
  getCommunications: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as Communication[];
  },

  addCommunication: (communication: Omit<Communication, 'id' | 'createdAt'>) => {
    const communications = communicationStorage.getCommunications();
    const newCommunication = {
      ...communication,
      id: `comm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    
    communications.push(newCommunication);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(communications));
    return newCommunication;
  },

  getCompanyCommunications: (companyId: string) => {
    const communications = communicationStorage.getCommunications();
    return communications
      .filter(comm => comm.companyId === companyId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  getCommunicationsForDate: (date: Date) => {
    const communications = communicationStorage.getCommunications();
    return communications.filter(comm => {
      const commDate = new Date(comm.date);
      return (
        commDate.getDate() === date.getDate() &&
        commDate.getMonth() === date.getMonth() &&
        commDate.getFullYear() === date.getFullYear()
      );
    });
  },
};