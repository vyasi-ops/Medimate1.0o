import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { medicines, familyMembers, todayDoses, healthInsights, notifications } from '../data/mockData';
import { format } from 'date-fns';
import {
  Pill, Users, CheckCircle, AlertTriangle, Package,
  Clock, ChevronRight, TrendingUp, Sparkles, Send
} from 'lucide-react';
import confetti from 'canvas-confetti';

const Dashboard: React.FC = () => {
  const { theme, markDoseTaken } = useApp();
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [showAi, setShowAi] = useState(false);

  const todayTaken = todayDoses.filter(d => d.status === 'taken').length;
  const todayMissed = todayDoses.filter(d => d.status === 'missed' || d.status === 'overdue').length;
  const todayUpcoming = todayDoses.filter(d => d.status === 'upcoming').length;
  const lowStockMeds = medicines.filter(m => m.inventory.daysRemaining <= 14);
  const nextDose = todayDoses.find(d => d.status === 'upcoming');

  const handleTakeDose = (doseId: string) => {
    markDoseTaken(doseId);
    if (todayTaken + 1 === todayDoses.length) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4CAF50', '#66BB6A', '#A8D5BA', '#FFB74D']
      });
    }
  };

  const handleAiSubmit = () => {
    if (!aiInput.trim()) return;
    const input = aiInput.toLowerCase();
    let response = "I'm your MediMate Assistant! I can help you with medication schedules, stock levels, and adherence reports. Just ask me anything!";
    
    if (input.includes('next') || input.includes('dose')) {
      response = nextDose 
        ? `Your next dose is ${nextDose.medicineName} at ${format(new Date(nextDose.scheduledTime), 'h:mm a')}.`
        : "All doses for today have been completed! Great job! 🎉";
    } else if (input.includes('low') || input.includes('stock')) {
      response = `You have ${lowStockMeds.length} medicines running low:\n${lowStockMeds.map(m => `• ${m.name} - ${m.inventory.daysRemaining} days remaining`).join('\n')}`;
    } else if (input.includes('adherence') || input.includes('streak')) {
      response = "Your family's adherence rate this week is 93%. Sarah has a perfect 30-day streak! 🏆";
    } else if (input.includes('missed')) {
      response = todayMissed > 0 
        ? `There are ${todayMissed} missed doses today. Would you like me to send reminders?`
        : "No missed doses today! Everyone is on track. ✅";
    }
    
    setAiResponse(response);
    setShowAi(true);
    setAiInput('');
  };

  const getTimeRemaining = (scheduledTime: string) => {
    const now = new Date();
    const scheduled = new Date(scheduledTime);
    const diff = scheduled.getTime() - now.getTime();
    if (diff <= 0) return 'Now';
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m`;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl lg:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}, Sarah 👋
          </h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Here's your family's medication overview for today.
          </p>
        </div>
        <div className={`text-sm px-4 py-2 rounded-xl ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'} shadow-sm`}>
          {format(new Date(), 'EEEE, MMMM d, yyyy')}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
        {[
          { icon: Pill, label: 'Medicines', value: medicines.length, color: 'bg-primary/10 text-primary', iconColor: 'text-primary' },
          { icon: Users, label: 'Family', value: familyMembers.length, color: 'bg-blue-50 text-blue-600', iconColor: 'text-blue-500' },
          { icon: CheckCircle, label: 'Taken Today', value: todayTaken, color: 'bg-green-50 text-green-600', iconColor: 'text-green-500' },
          { icon: AlertTriangle, label: 'Missed', value: todayMissed, color: 'bg-red-50 text-red-600', iconColor: 'text-red-500' },
          { icon: Package, label: 'Low Stock', value: lowStockMeds.length, color: 'bg-amber-50 text-amber-600', iconColor: 'text-amber-500' },
        ].map((stat, i) => (
          <div
            key={i}
            className={`p-4 rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon size={20} className={stat.iconColor} />
            </div>
            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Medications */}
        <div className="lg:col-span-2 space-y-4">
          <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-5`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Today's Medications
              </h2>
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {todayTaken}/{todayDoses.length} completed
              </span>
            </div>

            {/* Progress bar */}
            <div className={`w-full h-2 rounded-full mb-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${todayDoses.length ? (todayTaken / todayDoses.length) * 100 : 0}%` }}
              />
            </div>

            <div className="space-y-3">
              {todayDoses.map(dose => {
                const med = medicines.find(m => m.id === dose.medicineId);
                const member = familyMembers.find(f => f.id === dose.familyMemberId);
                return (
                  <div
                    key={dose.id}
                    className={`
                      flex items-center justify-between p-3 rounded-xl transition-all
                      ${dose.status === 'taken'
                        ? theme === 'dark' ? 'bg-green-900/20 border-green-800/30' : 'bg-green-50 border-green-100'
                        : dose.status === 'missed' || dose.status === 'overdue'
                          ? theme === 'dark' ? 'bg-red-900/20 border-red-800/30' : 'bg-red-50 border-red-100'
                          : theme === 'dark' ? 'bg-gray-700/50 border-gray-600/30' : 'bg-gray-50 border-gray-100'
                      } border
                    `}
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
                      {dose.status === 'taken' && (
                        <span className="text-green-500 text-sm font-medium flex items-center gap-1">
                          <CheckCircle size={14} /> Taken
                        </span>
                      )}
                      {(dose.status === 'missed' || dose.status === 'overdue') && (
                        <span className="text-red-500 text-sm font-medium">Missed</span>
                      )}
                      {dose.status === 'upcoming' && (
                        <button
                          onClick={() => handleTakeDose(dose.id)}
                          className="px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary-dark transition-colors"
                        >
                          Take Now
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Missed Doses */}
          {todayMissed > 0 && (
            <div className={`rounded-2xl border p-5 ${theme === 'dark' ? 'bg-red-900/10 border-red-800/30' : 'bg-red-50/50 border-red-100'}`}>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={18} className="text-red-500" />
                <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Missed Doses
                </h3>
              </div>
              {todayDoses.filter(d => d.status === 'missed' || d.status === 'overdue').map(dose => {
                const member = familyMembers.find(f => f.id === dose.familyMemberId);
                return (
                  <div key={dose.id} className={`flex items-center justify-between py-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'} border-b last:border-0`}>
                    <div>
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        {dose.medicineName}
                      </p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {member?.avatar} {member?.name} • Scheduled at {format(new Date(dose.scheduledTime), 'h:mm a')}
                      </p>
                    </div>
                    <span className="text-xs text-red-500 font-medium">Overdue</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Next Dose Card */}
          {nextDose && (
            <div className={`rounded-2xl p-5 border ${theme === 'dark' ? 'bg-gradient-to-br from-primary/20 to-primary-dark/20 border-primary/30' : 'bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20'}`}>
              <div className="flex items-center gap-2 mb-3">
                <Clock size={18} className="text-primary" />
                <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Next Dose</h3>
              </div>
              <p className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {nextDose.medicineName}
              </p>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {medicines.find(m => m.id === nextDose.medicineId)?.strength}
              </p>
              <div className={`mt-3 text-2xl font-bold text-primary`}>
                {getTimeRemaining(nextDose.scheduledTime)}
              </div>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                at {format(new Date(nextDose.scheduledTime), 'h:mm a')}
              </p>
              <button
                onClick={() => handleTakeDose(nextDose.id)}
                className="w-full mt-4 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors shadow-sm"
              >
                Take Now
              </button>
            </div>
          )}

          {/* Health Insights */}
          <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-5`}>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={18} className="text-primary" />
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Health Insights
              </h3>
            </div>
            <div className="space-y-3">
              {healthInsights.map(insight => (
                <div
                  key={insight.id}
                  className={`flex items-start gap-2 p-2 rounded-lg ${
                    insight.type === 'warning'
                      ? theme === 'dark' ? 'bg-amber-900/20' : 'bg-amber-50'
                      : insight.type === 'success'
                        ? theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'
                        : theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'
                  }`}
                >
                  <span className="text-sm">{insight.icon}</span>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {insight.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Notifications */}
          <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-5`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Recent Activity
              </h3>
              <button className="text-primary text-xs font-medium flex items-center gap-1 hover:underline">
                View all <ChevronRight size={12} />
              </button>
            </div>
            <div className="space-y-3">
              {notifications.slice(0, 4).map(notif => (
                <div key={notif.id} className="flex items-start gap-2">
                  <span className="text-sm mt-0.5">{notif.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium truncate ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                      {notif.title}
                    </p>
                    <p className={`text-xs truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {notif.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-5`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🏆</span>
            <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Achievements
            </h3>
          </div>
          <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>4/6 earned</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {[
            { icon: '🔥', name: '7 Day Streak', earned: true },
            { icon: '🏆', name: '30 Day Champion', earned: true },
            { icon: '👨‍👩‍👧', name: 'Family Hero', earned: true },
            { icon: '🌅', name: 'Early Bird', earned: true },
            { icon: '💎', name: '100 Day Legend', earned: false },
            { icon: '🩺', name: 'Caregiver Pro', earned: false },
          ].map((badge, i) => (
            <div
              key={i}
              className={`text-center p-3 rounded-xl transition-all ${
                badge.earned
                  ? theme === 'dark' ? 'bg-primary/10 border-primary/20' : 'bg-primary/5 border-primary/10'
                  : theme === 'dark' ? 'bg-gray-700/30 opacity-50' : 'bg-gray-100 opacity-50'
              } border`}
            >
              <span className="text-2xl block mb-1">{badge.icon}</span>
              <p className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {badge.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Assistant */}
      <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-5`}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
            <span className="text-sm">💊</span>
          </div>
          <div>
            <h3 className={`font-semibold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              MediMate Assistant
            </h3>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Ask me anything about your medications
            </p>
          </div>
        </div>

        {showAi && aiResponse && (
          <div className={`mb-3 p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <p className={`text-sm whitespace-pre-line ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {aiResponse}
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAiSubmit()}
            placeholder="When is my next dose?"
            className={`
              flex-1 px-4 py-2.5 rounded-xl text-sm border
              ${theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500'
                : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'
              }
              focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
            `}
          />
          <button
            onClick={handleAiSubmit}
            className="px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
          >
            <Send size={16} />
          </button>
        </div>

        <div className="flex gap-2 mt-3 flex-wrap">
          {['When is my next dose?', 'Which medicines are low?', 'Show my adherence'].map(q => (
            <button
              key={q}
              onClick={() => {
                const input = q.toLowerCase();
                let response = '';
                if (input.includes('next') || input.includes('dose')) {
                  response = nextDose 
                    ? `Your next dose is ${nextDose.medicineName} at ${format(new Date(nextDose.scheduledTime), 'h:mm a')}.`
                    : "All doses for today have been completed! Great job! 🎉";
                } else if (input.includes('low') || input.includes('stock')) {
                  response = `You have ${lowStockMeds.length} medicines running low:\n${lowStockMeds.map(m => `• ${m.name} - ${m.inventory.daysRemaining} days remaining`).join('\n')}`;
                } else if (input.includes('adherence') || input.includes('streak')) {
                  response = "Your family's adherence rate this week is 93%. Sarah has a perfect 30-day streak! 🏆";
                }
                setAiResponse(response);
                setShowAi(true);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs ${theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-colors`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
