import React from 'react';
import { useApp } from '../context/AppContext';
import { familyMembers, emergencyContacts } from '../data/mockData';
import { Shield, Phone, Heart, AlertTriangle, Droplets, Stethoscope } from 'lucide-react';

const SafetyCenter: React.FC = () => {
  const { theme } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Safety Center
        </h1>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          Emergency information and medical safety data
        </p>
      </div>

      {/* Emergency Profile Card */}
      <div className={`rounded-2xl bg-gradient-to-r from-red-500 to-red-600 p-6 text-white shadow-lg`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
            <AlertTriangle size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Emergency Profile</h2>
            <p className="text-sm text-white/80">Quick access for emergency situations</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-xs text-white/70">Blood Type</p>
            <p className="text-lg font-bold">A+</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-xs text-white/70">Allergies</p>
            <p className="text-sm font-bold">Penicillin</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-xs text-white/70">Conditions</p>
            <p className="text-sm font-bold">Migraine</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-xs text-white/70">Emergency</p>
            <p className="text-sm font-bold">911</p>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-5`}>
        <div className="flex items-center gap-2 mb-4">
          <Phone size={18} className="text-primary" />
          <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Emergency Contacts
          </h3>
        </div>
        <div className="space-y-3">
          {emergencyContacts.map(contact => (
            <div
              key={contact.id}
              className={`flex items-center justify-between p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${contact.relation === 'Emergency' ? 'bg-red-100' : 'bg-primary/10'} flex items-center justify-center`}>
                  {contact.relation === 'Emergency' ? (
                    <AlertTriangle size={18} className="text-red-500" />
                  ) : (
                    <Stethoscope size={18} className="text-primary" />
                  )}
                </div>
                <div>
                  <p className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {contact.name}
                  </p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {contact.relation}
                  </p>
                </div>
              </div>
              <a
                href={`tel:${contact.phone}`}
                className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-lg hover:bg-primary/20 transition-colors"
              >
                {contact.phone}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Family Medical Info */}
      <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-5`}>
        <div className="flex items-center gap-2 mb-4">
          <Heart size={18} className="text-red-500" />
          <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Family Medical Information
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {familyMembers.map(member => (
            <div
              key={member.id}
              className={`p-4 rounded-xl border ${theme === 'dark' ? 'border-gray-700 bg-gray-700/30' : 'border-gray-100 bg-gray-50/50'}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{member.avatar}</span>
                <div>
                  <p className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {member.name}
                  </p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Age {member.age}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Droplets size={12} className="text-red-400" />
                  <span className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Blood Type: <strong>{member.bloodType}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart size={12} className="text-purple-400" />
                  <span className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Conditions: {member.conditions.join(', ')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle size={12} className="text-amber-400" />
                  <span className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Allergies: {member.allergies.join(', ')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Tips */}
      <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-5`}>
        <div className="flex items-center gap-2 mb-4">
          <Shield size={18} className="text-primary" />
          <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Safety Tips
          </h3>
        </div>
        <div className="space-y-3">
          {[
            { icon: '💊', tip: 'Always check medicine names before taking to avoid confusion.' },
            { icon: '⏰', tip: 'Set consistent times for daily medications to build habits.' },
            { icon: '🍽️', tip: 'Some medicines need to be taken with food - always check instructions.' },
            { icon: '📋', tip: 'Keep an updated list of all medications for emergency situations.' },
            { icon: '🚫', tip: 'Never share prescription medications with others.' },
          ].map((item, i) => (
            <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
              <span className="text-lg">{item.icon}</span>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {item.tip}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SafetyCenter;
