import React from 'react';
import { format } from 'date-fns';
import { X, MessageSquare } from 'lucide-react';
import { Communication } from '../../../types/communication';
import { companyStorage } from '../../../utils/companyStorage';

interface CommunicationDetailsProps {
  date: Date;
  communications: Communication[];
  onClose: () => void;
}

export const CommunicationDetails: React.FC<CommunicationDetailsProps> = ({
  date,
  communications,
  onClose,
}) => {
  const getCompanyName = (companyId: string) => {
    const company = companyStorage.getCompanies().find(c => c.id === companyId);
    return company?.name || 'Unknown Company';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">
          Communications for {format(date, 'MMMM d, yyyy')}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {communications.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No communications scheduled for this date
        </p>
      ) : (
        <div className="space-y-4">
          {communications.map(comm => (
            <div
              key={comm.id}
              className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg"
            >
              <MessageSquare className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <div className="font-medium text-gray-900">
                  {getCompanyName(comm.companyId)}
                </div>
                <div className="text-sm text-gray-500">
                  {comm.type}
                </div>
                {comm.notes && (
                  <div className="mt-1 text-sm text-gray-700">
                    {comm.notes}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};