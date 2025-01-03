import React, { useState } from 'react';
import { format } from 'date-fns';
import { MessageSquare, AlertCircle } from 'lucide-react';
import { CompanyWithCommunications } from '../../../types/communication';
import { CommunicationTooltip } from './CommunicationTooltip';

interface CompanyRowProps {
  company: CompanyWithCommunications;
  onSelect: () => void;
  isSelected: boolean;
}

export const CompanyRow: React.FC<CompanyRowProps> = ({ company, onSelect, isSelected }) => {
  const [hoveredComm, setHoveredComm] = useState<string | null>(null);

  const getStatusStyles = (status: CompanyWithCommunications['status']) => {
    switch (status) {
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'due':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <tr
      onClick={onSelect}
      className={`hover:bg-gray-50 cursor-pointer ${isSelected ? 'bg-blue-50' : ''}`}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{company.name}</div>
      </td>
      
      <td className="px-6 py-4">
        <div className="space-y-1">
          {company.lastCommunications.map((comm) => (
            <div
              key={comm.id}
              className="flex items-center text-sm group relative"
              onMouseEnter={() => setHoveredComm(comm.id)}
              onMouseLeave={() => setHoveredComm(null)}
            >
              <MessageSquare className="h-4 w-4 mr-2 text-gray-400" />
              <span>{comm.type} - {format(new Date(comm.date), 'MMM d')}</span>
              {hoveredComm === comm.id && comm.notes && (
                <CommunicationTooltip communication={comm} />
              )}
            </div>
          ))}
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        {company.nextCommunication && (
          <div className={`flex items-center p-2 rounded ${getStatusStyles(company.status)}`}>
            {company.status === 'overdue' && (
              <AlertCircle className="h-4 w-4 mr-2" />
            )}
            {company.nextCommunication.type} - {format(new Date(company.nextCommunication.date), 'MMM d')}
          </div>
        )}
      </td>
    </tr>
  );
};