import React from 'react';
import { format, isToday, isPast, isFuture } from 'date-fns';
import { Communication } from '../../../types/communication';

interface CalendarDayProps {
  date: Date;
  communications: Communication[];
  isSelected: boolean;
  onSelect: () => void;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({
  date,
  communications,
  isSelected,
  onSelect,
}) => {
  const dayClasses = [
    'min-h-[100px] p-2 bg-white hover:bg-gray-50 cursor-pointer',
    isSelected ? 'ring-2 ring-blue-500' : '',
    isToday(date) ? 'bg-blue-50' : '',
  ].join(' ');

  return (
    <div className={dayClasses} onClick={onSelect}>
      <div className="flex justify-between items-start">
        <span className={`text-sm ${
          isToday(date) ? 'font-bold text-blue-600' : 'text-gray-700'
        }`}>
          {format(date, 'd')}
        </span>
        {communications.length > 0 && (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
            {communications.length}
          </span>
        )}
      </div>
      
      <div className="mt-2 space-y-1">
        {communications.slice(0, 2).map(comm => (
          <div
            key={comm.id}
            className={`text-xs truncate ${
              isPast(new Date(comm.date))
                ? 'text-gray-500'
                : isFuture(new Date(comm.date))
                ? 'text-blue-600 font-medium'
                : 'text-green-600 font-medium'
            }`}
          >
            {comm.type}
          </div>
        ))}
        {communications.length > 2 && (
          <div className="text-xs text-gray-500">
            +{communications.length - 2} more
          </div>
        )}
      </div>
    </div>
  );
};