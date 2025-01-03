import React from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { MessageSquare } from 'lucide-react';
import { companyStorage } from '../../utils/companyStorage';

export const CommunicationLog: React.FC = () => {
  const { companyId } = useParams();
  const company = companyStorage.getCompanies().find(c => c.id === companyId);

  const communications = [
    { id: '1', type: 'LinkedIn Post', date: '2024-02-20', notes: 'Shared company update' },
    { id: '2', type: 'Email', date: '2024-02-15', notes: 'Follow-up on meeting' },
    { id: '3', type: 'LinkedIn Message', date: '2024-02-10', notes: 'Initial contact' },
  ];

  if (!company) {
    return <div>Company not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Communication History - {company.name}
        </h1>
      </div>

      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {communications.map((comm) => (
          <div key={comm.id} className="p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <MessageSquare className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{comm.type}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {format(new Date(comm.date), 'PPP')}
                </p>
                <p className="mt-2 text-sm text-gray-700">{comm.notes}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};