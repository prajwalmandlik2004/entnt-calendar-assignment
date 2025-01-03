import { Company } from '../types/company';

const STORAGE_KEY = 'companies';

export const companyStorage = {
  getCompanies: (): Company[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  },

  addCompany: (company: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>): Company => {
    const companies = companyStorage.getCompanies();
    const newCompany: Company = {
      ...company,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    companies.push(newCompany);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
    return newCompany;
  },

  updateCompany: (id: string, updates: Partial<Omit<Company, 'id' | 'createdAt'>>): Company | null => {
    const companies = companyStorage.getCompanies();
    const index = companies.findIndex(c => c.id === id);
    
    if (index !== -1) {
      companies[index] = {
        ...companies[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
      return companies[index];
    }
    return null;
  },

  deleteCompany: (id: string): boolean => {
    const companies = companyStorage.getCompanies();
    const filteredCompanies = companies.filter(c => c.id !== id);
    
    if (filteredCompanies.length !== companies.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredCompanies));
      return true;
    }
    return false;
  },
};