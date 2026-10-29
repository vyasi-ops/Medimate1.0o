import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { medicines, familyMembers, doseHistory } from '../data/mockData';
import { format, startOfWeek, addDays, isSameDay, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const Schedule: React.FC = () => {
  const { theme, markDoseTaken } = useApp();
  const [view, setView] = useState<'timeline' | 'calendar' | 'weekly'>('timeline');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

  const todayDoses = doseHistory.filter(d => isSameDay(new Date(d.scheduledTime), selectedDate));
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getTimeSlot = (hour: number) => {
    return todayDoses.filter(d => {
      const doseHour = new Date(d.scheduledTime).getHours();
      return doseHour >= hour && doseHour < hour + 3;
    });
  };

  const timeSlots = [6, 9, 12, 15, 18, 21];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Schedule
          </h1>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            View and manage medication schedules
          </p>
        </div>
        <div className="flex gap-2">
          {(['timeline', 'calendar', 'weekly'] as const).map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${view === v ? 'bg-primary text-white' : theme === 'dark' ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Date Navigation */}
      <div className={`flex items-center justify-between p-4 rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm`}>
        <button
          onClick={() => {
            if (view === 'weekly') setWeekStart(addDays(weekStart, -7));
            else setSelectedDate(addDays(selectedDate, -1));
          }}
          className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <ChevronLeft size={20} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
        </button>
        <h2 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {view === 'weekly'
            ? `${format(weekStart, 'MMM d')} - ${format(addDays(weekStart, 6), 'MMM d, yyyy')}`
            : format(selectedDate, 'EEEE, MMMM d, yyyy')
          }
        </h2>
        <button
          onClick={() => {
            if (view === 'weekly') setWeekStart(addDays(weekStart, 7));
            else setSelectedDate(addDays(selectedDate, 1));
          }}
          className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <ChevronRight size={20} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
        </button>
      </div>

      {/* Timeline View */}
      {view === 'timeline' && (
        <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-5`}>
          <div className="space-y-4">
            {timeSlots.map(hour => {
              const doses = getTimeSlot(hour);
              if (doses.length === 0) return null;
              return (
                <div key={hour} className="flex gap-4">
                  <div className={`w-16 text-right ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    <span className="text-sm font-medium">
                      {hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                    </span>
                  </div>
                  <div className="flex-1 space-y-2">
                    {doses.map(dose => {
                      const med = medicines.find(m => m.id === dose.medicineId);
                      const member = familyMembers.find(f => f.id === dose.familyMemberId);
                      return (
                        <div
                          key={dose.id}
                          className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                            dose.status === 'taken'
                              ? theme === 'dark' ? 'bg-green-900/20 border-green-800/30' : 'bg-green-50 border-green-100'
                              : dose.status === 'missed' || dose.status === 'overdue'
                                ? theme === 'dark' ? 'bg-red-900/20 border-red-800/30' : 'bg-red-50 border-red-100'
                                : theme === 'dark' ? 'bg-gray-700/50 border-gray-600/30' : 'bg-gray-50 border-gray-100'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                              style={{ backgroundColor: med?.color + '20' }}
                            >
                              {med?.icon}
                            </div>
                            <div>
                              <p className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {dose.medicineName}
                              </p>
                              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                {med?.strength} • {member?.avatar} {member?.name.split(' ')[0]} • {format(new Date(dose.scheduledTime), 'h:mm a')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {dose.status === 'taken' && <CheckCircle size={18} className="text-green-500" />}
                            {(dose.status === 'missed' || dose.status === 'overdue') && <AlertCircle size={18} className="text-red-500" />}
                            {dose.status === 'upcoming' && (
                              <button
                                onClick={() => markDoseTaken(dose.id)}
                                className="px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary-dark transition-colors"
                              >
                                Take
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Weekly View */}
      {view === 'weekly' && (
        <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm overflow-hidden`}>
          <div className="grid grid-cols-7">
            {weekDays.map(day => {
              const dayDoses = doseHistory.filter(d => isSameDay(new Date(d.scheduledTime), day));
              const takenCount = dayDoses.filter(d => d.status === 'taken').length;
              const totalCount = dayDoses.length;
              const adherence = totalCount > 0 ? Math.round((takenCount / totalCount) * 100) : 0;

              return (
                <div
                  key={day.toISOString()}
                  className={`p-3 border-r last:border-r-0 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'} ${isToday(day) ? (theme === 'dark' ? 'bg-primary/10' : 'bg-primary/5') : ''}`}
                >
                  <div className="text-center mb-2">
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {format(day, 'EEE')}
                    </p>
                    <p className={`text-lg font-bold ${isToday(day) ? 'text-primary' : theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {format(day, 'd')}
                    </p>
                  </div>
                  <div className="space-y-1">
                    {dayDoses.slice(0, 4).map(dose => {
                      const med = medicines.find(m => m.id === dose.medicineId);
                      return (
                        <div
                          key={dose.id}
                          className={`w-full h-6 rounded text-xs flex items-center justify-center ${
                            dose.status === 'taken' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                            dose.status === 'missed' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                            'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                          }`}
                          title={`${dose.medicineName} - ${dose.status}`}
                        >
                          {med?.icon}
                        </div>
                      );
                    })}
                    {dayDoses.length > 4 && (
                      <p className={`text-xs text-center ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                        +{dayDoses.length - 4} more
                      </p>
                    )}
                  </div>
                  {totalCount > 0 && (
                    <div className="mt-2 text-center">
                      <span className={`text-xs font-medium ${adherence >= 90 ? 'text-green-500' : adherence >= 70 ? 'text-amber-500' : 'text-red-500'}`}>
                        {adherence}%
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Calendar View */}
      {view === 'calendar' && (
        <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-5`}>
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className={`text-center py-2 text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }, (_, i) => {
              const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
              const startDay = firstDay.getDay();
              const date = addDays(firstDay, i - startDay);
              const dayDoses = doseHistory.filter(d => isSameDay(new Date(d.scheduledTime), date));
              const takenCount = dayDoses.filter(d => d.status === 'taken').length;
              const isCurrentMonth = date.getMonth() === selectedDate.getMonth();

              return (
                <div
                  key={i}
                  onClick={() => setSelectedDate(date)}
                  className={`
                    p-2 rounded-xl text-center cursor-pointer transition-colors min-h-[60px]
                    ${isCurrentMonth ? '' : 'opacity-30'}
                    ${isToday(date) ? 'ring-2 ring-primary' : ''}
                    ${isSameDay(date, selectedDate) ? (theme === 'dark' ? 'bg-primary/20' : 'bg-primary/10') : theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}
                  `}
                >
                  <p className={`text-sm ${isToday(date) ? 'text-primary font-bold' : theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {format(date, 'd')}
                  </p>
                  {dayDoses.length > 0 && (
                    <div className="flex gap-0.5 justify-center mt-1">
                      {takenCount === dayDoses.length && dayDoses.length > 0 ? (
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      ) : takenCount > 0 ? (
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
