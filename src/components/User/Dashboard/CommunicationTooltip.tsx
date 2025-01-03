import React from 'react';
import { format } from 'date-fns';
import { Communication } from '../../../types/communication';

interface CommunicationTooltipProps {
  communication: Communication;
}

export const CommunicationTooltip: React.FC<CommunicationTooltipProps> = ({ communication }) => {
  return (
    <div className="absolute z-10 w-64 p-4 mt-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg">
      <div className="font-medium">{communication.type}</div>
      <div className="text-gray-300 text-xs mt-1">
        {format(new Date(communication.date), 'PPP')}
      </div>
      {communication.notes && (
        <div className="mt-2 text-gray-200">{communication.notes}</div>
      )}
    </div>
  );
};