import React, { useState } from 'react';
import { format } from 'date-fns';
import { Building2, MessageSquare, Calendar, AlertCircle } from 'lucide-react';
import { CompanyWithCommunications } from '../../../types/communication';
import { CommunicationTooltip } from './CommunicationTooltip';

interface CompanyGridCardProps {
  company: CompanyWithCommunications;
  isSelected: boolean;
  onSelect: () => void;
}

export const CompanyGridCard: React.FC<CompanyGridCardProps> = ({
  company,
  isSelected,
  onSelect,
}) => {
  const [hoveredComm, setHoveredComm] = useState<string | null>(null);

  const getStatusStyles = (status: CompanyWithCommunications['status']) => {
    switch (status) {
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'due':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-white text-gray-600 border-gray-200';
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`
        rounded-lg border-2 transition-all cursor-pointer
        ${isSelected ? 'border-blue-500 shadow-lg' : 'border-transparent shadow hover:shadow-md'}
        ${getStatusStyles(company.status)}
      `}
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <Building2 className="h-6 w-6 text-gray-400" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">
            {company.name}
          </h3>
        </div>
      </div>


      <div className="p-4 space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Last Communications</h4>
        <div className="space-y-2">
          {company.lastCommunications.slice(0, 5).map((comm) => (
            <div
              key={comm.id}
              className="flex items-center text-sm relative group"
              onMouseEnter={() => setHoveredComm(comm.id)}
              onMouseLeave={() => setHoveredComm(null)}
            >
              <MessageSquare className="h-4 w-4 mr-2 text-gray-400" />
              <span>
                {comm.type} - {format(new Date(comm.date), 'MMM d')}
              </span>
              {hoveredComm === comm.id && comm.notes && (
                <CommunicationTooltip communication={comm} />
              )}
            </div>
          ))}
        </div>
      </div>

      {company.nextCommunication && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">Next Communication</h4>
            {company.status === 'overdue' && (
              <AlertCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
          <div className="mt-2 flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span>
              {company.nextCommunication.type} - {format(new Date(company.nextCommunication.date), 'MMM d')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};