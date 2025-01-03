import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Communication } from '../../../types/communication';
import { communicationStorage } from '../../../utils/communicationStorage';
import { CalendarDay } from './CalendarDay';
import { CommunicationDetails } from './CommunicationDetails';

export const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    loadCommunications();
  }, []);

  const loadCommunications = () => {
    const allCommunications = communicationStorage.getCommunications();
    setCommunications(allCommunications);
  };

  const getDaysInMonth = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  };

  const getCommunicationsForDate = (date: Date) => {
    return communications.filter(comm => 
      isSameDay(new Date(comm.date), date)
    );
  };

  const nextMonth = () => {
    setCurrentDate(prev => new Date(prev.setMonth(prev.getMonth() + 1)));
  };

  const prevMonth = () => {
    setCurrentDate(prev => new Date(prev.setMonth(prev.getMonth() - 1)));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 flex items-center">
          <CalendarIcon className="h-6 w-6 mr-2" />
          Communication Calendar
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-lg font-medium">
            {format(currentDate, 'MMMM yyyy')}
          </span>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">

        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div
              key={day}
              className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {getDaysInMonth().map(date => {
            const dayComms = getCommunicationsForDate(date);
            return (
              <CalendarDay
                key={date.toISOString()}
                date={date}
                communications={dayComms}
                isSelected={selectedDate ? isSameDay(date, selectedDate) : false}
                onSelect={() => setSelectedDate(date)}
              />
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <CommunicationDetails
          date={selectedDate}
          communications={getCommunicationsForDate(selectedDate)}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
};