import React from 'react';
import { CompanyWithCommunications } from '../../../types/communication';
import { CompanyRow } from './CompanyRow';

interface CompanyTableProps {
  companies: CompanyWithCommunications[];
  selectedCompanies: string[];
  onSelectCompany: (companyId: string) => void;
}

export const CompanyTable: React.FC<CompanyTableProps> = ({
  companies,
  selectedCompanies,
  onSelectCompany,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Communications
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Next Communication
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {companies.map((company) => (
            <CompanyRow
              key={company.id}
              company={company}
              isSelected={selectedCompanies.includes(company.id)}
              onSelect={() => onSelectCompany(company.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};