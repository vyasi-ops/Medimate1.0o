import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { weeklyAdherence, monthlyAdherence, medicineUsage } from '../data/mockData';
import { BarChart3, TrendingUp, Calendar, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';

const Reports: React.FC = () => {
  const { theme } = useApp();
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');

  const chartTextColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Health Reports
          </h1>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Track medication adherence and health trends
          </p>
        </div>
        <div className="flex gap-2">
          {(['weekly', 'monthly', 'yearly'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${period === p ? 'bg-primary text-white' : theme === 'dark' ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
          <button className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border ${theme === 'dark' ? 'border-gray-700 text-gray-300 hover:bg-gray-800' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Adherence Rate', value: '93%', trend: '+5%', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Doses Taken', value: '127', trend: 'This month', icon: BarChart3, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Missed Doses', value: '8', trend: '-3 from last', icon: Calendar, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Active Meds', value: '5', trend: 'All on track', icon: BarChart3, color: 'text-purple-500', bg: 'bg-purple-50' },
        ].map((card, i) => (
          <div key={i} className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-4`}>
            <div className={`w-10 h-10 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : card.bg} flex items-center justify-center mb-3`}>
              <card.icon size={18} className={card.color} />
            </div>
            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{card.value}</p>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{card.label}</p>
            <p className={`text-xs mt-1 ${card.color}`}>{card.trend}</p>
          </div>
        ))}
      </div>

      {/* Adherence Chart */}
      <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-5`}>
        <h3 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Medication Adherence
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={period === 'weekly' ? weeklyAdherence : monthlyAdherence}>
              <defs>
                <linearGradient id="colorAdherence" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey={period === 'weekly' ? 'day' : 'week'} tick={{ fill: chartTextColor, fontSize: 12 }} />
              <YAxis tick={{ fill: chartTextColor, fontSize: 12 }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1f2937' : '#fff',
                  border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '12px',
                  color: theme === 'dark' ? '#fff' : '#000'
                }}
              />
              <Area type="monotone" dataKey="adherence" stroke="#4CAF50" strokeWidth={2} fill="url(#colorAdherence)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Medicine Usage */}
        <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-5`}>
          <h3 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Medicine Usage
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={medicineUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="name" tick={{ fill: chartTextColor, fontSize: 10 }} />
                <YAxis tick={{ fill: chartTextColor, fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#1f2937' : '#fff',
                    border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '12px',
                    color: theme === 'dark' ? '#fff' : '#000'
                  }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {medicineUsage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Missed Doses Chart */}
        <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-5`}>
          <h3 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Missed Doses Trend
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyAdherence}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="day" tick={{ fill: chartTextColor, fontSize: 12 }} />
                <YAxis tick={{ fill: chartTextColor, fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#1f2937' : '#fff',
                    border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '12px',
                    color: theme === 'dark' ? '#fff' : '#000'
                  }}
                />
                <Line type="monotone" dataKey="missed" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Family Adherence */}
      <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-5`}>
        <h3 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Family Member Adherence
        </h3>
        <div className="space-y-4">
          {[
            { name: 'Sarah Johnson', avatar: '👩', adherence: 98, streak: 30 },
            { name: 'Michael Johnson', avatar: '👨', adherence: 91, streak: 14 },
            { name: 'Eleanor Johnson', avatar: '👵', adherence: 85, streak: 7 },
            { name: 'Lily Johnson', avatar: '👧', adherence: 95, streak: 21 },
          ].map((member, i) => (
            <div key={i} className={`flex items-center gap-4 p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
              <span className="text-2xl">{member.avatar}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {member.name}
                  </p>
                  <span className={`text-sm font-bold ${member.adherence >= 90 ? 'text-green-500' : member.adherence >= 70 ? 'text-amber-500' : 'text-red-500'}`}>
                    {member.adherence}%
                  </span>
                </div>
                <div className={`w-full h-2 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                  <div
                    className={`h-full rounded-full ${member.adherence >= 90 ? 'bg-green-500' : member.adherence >= 70 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${member.adherence}%` }}
                  />
                </div>
              </div>
              <div className="text-right">
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Streak</p>
                <p className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  🔥 {member.streak}d
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
