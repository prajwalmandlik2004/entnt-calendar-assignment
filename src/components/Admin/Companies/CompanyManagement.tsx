import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Company } from '../../../types/company';
import { companyStorage } from '../../../utils/companyStorage';
import { CompanyList } from './CompanyList';
import { CompanyForm } from './CompanyForm';

export const CompanyManagement: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | undefined>();

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = () => {
    const loadedCompanies = companyStorage.getCompanies();
    setCompanies(loadedCompanies);
  };

  const handleSubmit = (data: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingCompany) {
      companyStorage.updateCompany(editingCompany.id, data);
    } else {
      companyStorage.addCompany(data);
    }
    loadCompanies();
    handleCancel();
  };

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      companyStorage.deleteCompany(id);
      loadCompanies();
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCompany(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Company Management</h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Company
          </button>
        )}
      </div>

      {showForm ? (
        <CompanyForm
          company={editingCompany}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <CompanyList
          companies={companies}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};