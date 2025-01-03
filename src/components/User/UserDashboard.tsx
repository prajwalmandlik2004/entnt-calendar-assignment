import React, { useState, useEffect } from 'react';
import { MessageSquare, LayoutGrid, List } from 'lucide-react';
import { CompanyWithCommunications } from '../../types/communication';
import { companyStorage } from '../../utils/companyStorage';
import { communicationStorage } from '../../utils/communicationStorage';
import { enrichCompanyWithCommunications } from '../../utils/communicationUtils';
import { CompanyTable } from './Dashboard/CompanyTable';
import { CompanyGrid } from './Dashboard/CompanyGrid';
import { CommunicationModal } from './CommunicationModal';

export const UserDashboard: React.FC = () => {
  const [companies, setCompanies] = useState<CompanyWithCommunications[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [showCommunicationModal, setShowCommunicationModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = () => {
    const allCompanies = companyStorage.getCompanies();
    const communications = communicationStorage.getCommunications();
    
    const enrichedCompanies = allCompanies.map(company => 
      enrichCompanyWithCommunications(company, communications)
    );
    
    setCompanies(enrichedCompanies);
  };

  const handleSelectCompany = (companyId: string) => {
    setSelectedCompanies(prev =>
      prev.includes(companyId)
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    );
  };

  const handleCloseCommunicationModal = () => {
    setShowCommunicationModal(false);
    setSelectedCompanies([]);
    loadCompanies();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-gray-900">Company Communications</h1>
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${
                viewMode === 'grid' ? 'bg-white shadow' : 'hover:bg-white/50'
              }`}
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded ${
                viewMode === 'table' ? 'bg-white shadow' : 'hover:bg-white/50'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
        <button
          onClick={() => setShowCommunicationModal(true)}
          disabled={selectedCompanies.length === 0}
          className={`flex items-center px-4 py-2 rounded-md ${
            selectedCompanies.length > 0
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <MessageSquare className="h-5 w-5 mr-2" />
          Log Communication
          {selectedCompanies.length > 0 && ` (${selectedCompanies.length})`}
        </button>
      </div>

      {viewMode === 'grid' ? (
        <CompanyGrid
          companies={companies}
          selectedCompanies={selectedCompanies}
          onSelectCompany={handleSelectCompany}
        />
      ) : (
        <CompanyTable
          companies={companies}
          selectedCompanies={selectedCompanies}
          onSelectCompany={handleSelectCompany}
        />
      )}

      {showCommunicationModal && (
        <CommunicationModal
          selectedCompanies={selectedCompanies}
          onClose={handleCloseCommunicationModal}
        />
      )}
    </div>
  );
};