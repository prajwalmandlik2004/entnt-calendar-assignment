import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Calendar, Phone, Mail } from 'lucide-react';
import { companyStorage } from '../../utils/companyStorage';

export const CompanyOverview: React.FC = () => {
  const navigate = useNavigate();
  const companies = companyStorage.getCompanies();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Companies Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div
            key={company.id}
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/companies/${company.id}/communications`)}
          >
            <div className="p-6">
              <div className="flex items-center">
                <Building2 className="h-8 w-8 text-blue-500" />
                <h3 className="ml-3 text-lg font-medium text-gray-900">
                  {company.name}
                </h3>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Every {company.communicationPeriodicity} days</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{company.emails[0]}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{company.phoneNumbers[0]}</span>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
              <div className="text-sm text-blue-600 hover:text-blue-800">
                View Communication History →
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};