import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { notifications } from '../data/mockData';
import { Bell, Check, CheckCheck, Filter } from 'lucide-react';

const Notifications: React.FC = () => {
  const { theme, markNotificationRead } = useApp();
  const [filter, setFilter] = useState<'all' | 'unread' | 'due' | 'missed' | 'refill'>('all');

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'all') return true;
    return n.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Notifications
          </h1>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            {unreadCount} unread notifications
          </p>
        </div>
        {unreadCount > 0 && (
          <button className="flex items-center gap-2 px-4 py-2 text-primary text-sm font-medium hover:bg-primary/5 rounded-xl transition-colors">
            <CheckCheck size={16} />
            Mark all as read
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { key: 'all', label: 'All' },
          { key: 'unread', label: 'Unread' },
          { key: 'due', label: 'Due Soon' },
          { key: 'missed', label: 'Missed' },
          { key: 'refill', label: 'Refills' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key as typeof filter)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              filter === f.key
                ? 'bg-primary text-white'
                : theme === 'dark' ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filteredNotifications.map(notif => (
          <div
            key={notif.id}
            onClick={() => markNotificationRead(notif.id)}
            className={`
              flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all
              ${!notif.read
                ? theme === 'dark' ? 'bg-primary/5 border-primary/20' : 'bg-primary/5 border-primary/20'
                : theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'
              } shadow-sm hover:shadow-md
            `}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
              notif.type === 'due' ? 'bg-blue-100' :
              notif.type === 'missed' ? 'bg-red-100' :
              notif.type === 'refill' ? 'bg-amber-100' :
              notif.type === 'safety' ? 'bg-orange-100' :
              notif.type === 'family' ? 'bg-purple-100' :
              'bg-green-100'
            }`}>
              {notif.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {notif.title}
                </p>
                {!notif.read && (
                  <div className="w-2 h-2 rounded-full bg-primary" />
                )}
              </div>
              <p className={`text-sm mt-0.5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {notif.message}
              </p>
              <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                {new Date(notif.time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            {notif.type === 'missed' && (
              <button className="px-3 py-1.5 bg-red-100 text-red-700 text-xs font-medium rounded-lg hover:bg-red-200 transition-colors whitespace-nowrap">
                View
              </button>
            )}
            {notif.type === 'refill' && (
              <button className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-lg hover:bg-primary/20 transition-colors whitespace-nowrap">
                Refill
              </button>
            )}
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className={`text-center py-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            <Bell size={40} className="mx-auto mb-3 opacity-50" />
            <p className="font-medium">No notifications</p>
            <p className="text-sm mt-1">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
