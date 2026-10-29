import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { familyMembers, medicines } from '../data/mockData';
import { UserPlus, Edit2, Heart, AlertTriangle, Shield, X } from 'lucide-react';

const Family: React.FC = () => {
  const { theme, setActiveFamilyMember, activeFamilyMember } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const getMemberMedicines = (memberId: string) => medicines.filter(m => m.familyMemberId === memberId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Family
          </h1>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage family members and their medications
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors shadow-sm"
        >
          <UserPlus size={18} />
          Add Member
        </button>
      </div>

      {/* Family Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {familyMembers.map(member => {
          const memberMeds = getMemberMedicines(member.id);
          const isSelected = selectedMember === member.id;

          return (
            <div
              key={member.id}
              onClick={() => setSelectedMember(isSelected ? null : member.id)}
              className={`rounded-2xl border p-5 cursor-pointer transition-all ${
                isSelected
                  ? theme === 'dark' ? 'border-primary/50 bg-primary/5' : 'border-primary/30 bg-primary/5'
                  : theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50 hover:border-gray-600' : 'bg-white border-gray-100 hover:border-gray-200'
              } shadow-sm`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    {member.avatar}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {member.name}
                    </h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {member.age} years • {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                    </p>
                  </div>
                </div>
                <button className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                  <Edit2 size={14} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                </button>
              </div>

              {/* Info Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`text-xs px-2 py-1 rounded-full ${theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-700'}`}>
                  🩸 {member.bloodType}
                </span>
                {member.conditions.map(c => (
                  <span key={c} className={`text-xs px-2 py-1 rounded-full ${theme === 'dark' ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-50 text-purple-700'}`}>
                    {c}
                  </span>
                ))}
                {member.allergies.map(a => (
                  <span key={a} className={`text-xs px-2 py-1 rounded-full ${theme === 'dark' ? 'bg-red-900/30 text-red-300' : 'bg-red-50 text-red-700'}`}>
                    ⚠️ {a}
                  </span>
                ))}
              </div>

              {/* Medicines */}
              <div className={`pt-3 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
                <p className={`text-xs font-medium mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Active Medications ({memberMeds.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {memberMeds.map(med => (
                    <div
                      key={med.id}
                      className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-700"
                    >
                      <span className="text-xs">{med.icon}</span>
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {med.name}
                      </span>
                    </div>
                  ))}
                  {memberMeds.length === 0 && (
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                      No medications added yet
                    </p>
                  )}
                </div>
              </div>

              {/* Doctor */}
              <div className={`mt-3 flex items-center gap-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                <Shield size={12} />
                <span className="text-xs">{member.doctor}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Caregiver Sync Info */}
      <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-r from-primary/10 to-primary-dark/10 border-primary/20' : 'bg-gradient-to-r from-primary/5 to-primary-light/30 border-primary/20'} border p-5`}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <span className="text-xl">🔄</span>
          </div>
          <div>
            <h3 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Real-Time Family Sync
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              When any family member marks a medicine as taken, everyone sees the update instantly. This prevents duplicate doses and keeps everyone informed.
            </p>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className={`text-xs ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                All family members synced • Last update: Just now
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Overdose Protection */}
      <div className={`rounded-2xl ${theme === 'dark' ? 'bg-red-900/10 border-red-800/30' : 'bg-red-50/50 border-red-100'} border p-5`}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
            <AlertTriangle size={20} className="text-red-500" />
          </div>
          <div>
            <h3 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Overdose Protection Active
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              The system monitors all dose recordings and will alert you if a medicine is about to be taken twice within the safe window. Last check: 2 minutes ago.
            </p>
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
            <div className={`flex items-center justify-between p-5 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
              <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Add Family Member
              </h2>
              <button onClick={() => setShowAddModal(false)} className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <X size={18} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
                <input type="text" placeholder="Full name" className={`w-full px-3 py-2 rounded-xl text-sm border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-primary/30`} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Age</label>
                  <input type="number" placeholder="Age" className={`w-full px-3 py-2 rounded-xl text-sm border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-primary/30`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Role</label>
                  <select className={`w-full px-3 py-2 rounded-xl text-sm border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-primary/30`}>
                    <option>Member</option>
                    <option>Caregiver</option>
                    <option>Parent</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Conditions</label>
                <input type="text" placeholder="e.g., Diabetes, Hypertension" className={`w-full px-3 py-2 rounded-xl text-sm border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-primary/30`} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Allergies</label>
                <input type="text" placeholder="e.g., Penicillin, Peanuts" className={`w-full px-3 py-2 rounded-xl text-sm border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-primary/30`} />
              </div>
            </div>
            <div className={`flex gap-3 p-5 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
              <button onClick={() => setShowAddModal(false)} className={`flex-1 py-2.5 rounded-xl text-sm font-medium border ${theme === 'dark' ? 'border-gray-600 text-gray-300' : 'border-gray-200 text-gray-700'}`}>
                Cancel
              </button>
              <button onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors">
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Family;
