import React from 'react';
import { CompanyWithCommunications } from '../../../types/communication';
import { CompanyGridCard } from './CompanyGridCard';

interface CompanyGridProps {
  companies: CompanyWithCommunications[];
  selectedCompanies: string[];
  onSelectCompany: (companyId: string) => void;
}

export const CompanyGrid: React.FC<CompanyGridProps> = ({
  companies,
  selectedCompanies,
  onSelectCompany,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map((company) => (
        <CompanyGridCard
          key={company.id}
          company={company}
          isSelected={selectedCompanies.includes(company.id)}
          onSelect={() => onSelectCompany(company.id)}
        />
      ))}
    </div>
  );
};