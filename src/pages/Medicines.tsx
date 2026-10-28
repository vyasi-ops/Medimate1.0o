import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { medicines as initialMedicines, familyMembers } from '../data/mockData';
import { Medicine } from '../data/mockData';
import { Plus, Search, Edit2, Trash2, Archive, X, Clock, Calendar } from 'lucide-react';

const Medicines: React.FC = () => {
  const { theme, addMedicine, updateMedicine, deleteMedicine } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'archived'>('all');

  const [formData, setFormData] = useState({
    name: '', genericName: '', brandName: '', strength: '', dose: '',
    frequency: 'Once daily', instructions: '', doctor: '',
    startDate: '', endDate: '', familyMemberId: 'fm1',
    scheduleType: 'daily' as 'daily' | 'weekly' | 'monthly' | 'custom', scheduleTimes: ['08:00'],
    color: '#4CAF50', icon: '💊'
  });

  const filteredMedicines = initialMedicines.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleSubmit = () => {
    const newMedicine: Medicine = {
      id: editingMedicine?.id || `med${Date.now()}`,
      name: formData.name,
      genericName: formData.genericName,
      brandName: formData.brandName,
      strength: formData.strength,
      dose: formData.dose,
      frequency: formData.frequency,
      instructions: formData.instructions,
      doctor: formData.doctor,
      startDate: formData.startDate,
      endDate: formData.endDate,
      color: formData.color,
      icon: formData.icon,
      familyMemberId: formData.familyMemberId,
      inventory: { currentQuantity: 30, totalQuantity: 30, refillsRemaining: 3, daysRemaining: 30 },
      schedule: { times: formData.scheduleTimes, type: formData.scheduleType }
    };

    if (editingMedicine) {
      updateMedicine(newMedicine);
    } else {
      addMedicine(newMedicine);
    }
    setShowAddModal(false);
    setEditingMedicine(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '', genericName: '', brandName: '', strength: '', dose: '',
      frequency: 'Once daily', instructions: '', doctor: '',
      startDate: '', endDate: '', familyMemberId: 'fm1',
      scheduleType: 'daily', scheduleTimes: ['08:00'],
      color: '#4CAF50', icon: '💊'
    });
  };

  const openEdit = (med: Medicine) => {
    setEditingMedicine(med);
    setFormData({
      name: med.name, genericName: med.genericName, brandName: med.brandName,
      strength: med.strength, dose: med.dose, frequency: med.frequency,
      instructions: med.instructions, doctor: med.doctor,
      startDate: med.startDate, endDate: med.endDate,
      familyMemberId: med.familyMemberId,
      scheduleType: med.schedule.type, scheduleTimes: med.schedule.times,
      color: med.color, icon: med.icon
    });
    setShowAddModal(true);
  };

  const colors = ['#4CAF50', '#42A5F5', '#FFB74D', '#AB47BC', '#EC407A', '#26A69A', '#EF5350', '#5C6BC0'];
  const icons = ['💊', '💉', '🩹', '💨', '🧴', '☀️', '💙', '💜', '🦴', '❤️'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Medicines
          </h1>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage all medications for your family
          </p>
        </div>
        <button
          onClick={() => { resetForm(); setShowAddModal(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors shadow-sm"
        >
          <Plus size={18} />
          Add Medicine
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search medicines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary`}
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'active', 'archived'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === f ? 'bg-primary text-white' : theme === 'dark' ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Medicine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredMedicines.map(med => {
          const member = familyMembers.find(f => f.id === med.familyMemberId);
          return (
            <div
              key={med.id}
              className={`rounded-2xl border p-5 ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} shadow-sm hover:shadow-md transition-all`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                    style={{ backgroundColor: med.color + '20' }}
                  >
                    {med.icon}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {med.name}
                    </h3>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {med.genericName}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEdit(med)}
                    className={`p-1.5 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    <Edit2 size={14} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                  </button>
                  <button
                    onClick={() => deleteMedicine(med.id)}
                    className={`p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20`}
                  >
                    <Trash2 size={14} className="text-red-400" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                    {med.strength}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                    {med.frequency}
                  </span>
                </div>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {med.instructions}
                </p>
              </div>

              <div className={`flex items-center justify-between pt-3 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{member?.avatar}</span>
                  <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {member?.name.split(' ')[0]}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={12} className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
                  <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {med.schedule.times.join(', ')}
                  </span>
                </div>
              </div>

              {/* Inventory bar */}
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Stock</span>
                  <span className={`text-xs font-medium ${med.inventory.daysRemaining <= 14 ? 'text-amber-500' : theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {med.inventory.daysRemaining} days left
                  </span>
                </div>
                <div className={`w-full h-1.5 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div
                    className={`h-full rounded-full transition-all ${med.inventory.daysRemaining <= 14 ? 'bg-amber-500' : 'bg-primary'}`}
                    style={{ width: `${(med.inventory.currentQuantity / med.inventory.totalQuantity) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
            <div className={`flex items-center justify-between p-5 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
              <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}
              </h2>
              <button
                onClick={() => { setShowAddModal(false); setEditingMedicine(null); }}
                className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <X size={18} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Icon & Color */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Icon</label>
                <div className="flex gap-2 flex-wrap">
                  {icons.map(icon => (
                    <button
                      key={icon}
                      onClick={() => setFormData(prev => ({ ...prev, icon }))}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${formData.icon === icon ? 'ring-2 ring-primary bg-primary/10' : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Color</label>
                <div className="flex gap-2">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setFormData(prev => ({ ...prev, color }))}
                      className={`w-8 h-8 rounded-full ${formData.color === color ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Name */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Medicine Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Amoxicillin"
                    className={`w-full px-3 py-2 rounded-xl text-sm border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-primary/30`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Generic Name</label>
                  <input
                    type="text"
                    value={formData.genericName}
                    onChange={(e) => setFormData(prev => ({ ...prev, genericName: e.target.value }))}
                    placeholder="e.g., Amoxicillin Trihydrate"
                    className={`w-full px-3 py-2 rounded-xl text-sm border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-primary/30`}
                  />
                </div>
              </div>

              {/* Strength & Dose */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Strength *</label>
                  <input
                    type="text"
                    value={formData.strength}
                    onChange={(e) => setFormData(prev => ({ ...prev, strength: e.target.value }))}
                    placeholder="e.g., 500mg"
                    className={`w-full px-3 py-2 rounded-xl text-sm border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-primary/30`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Dose</label>
                  <input
                    type="text"
                    value={formData.dose}
                    onChange={(e) => setFormData(prev => ({ ...prev, dose: e.target.value }))}
                    placeholder="e.g., 1 tablet"
                    className={`w-full px-3 py-2 rounded-xl text-sm border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-primary/30`}
                  />
                </div>
              </div>

              {/* Frequency & Family Member */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Frequency</label>
                  <select
                    value={formData.frequency}
                    onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-xl text-sm border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-primary/30`}
                  >
                    <option>Once daily</option>
                    <option>Twice daily</option>
                    <option>Three times daily</option>
                    <option>Every 6 hours</option>
                    <option>Once weekly</option>
                    <option>As needed</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>For</label>
                  <select
                    value={formData.familyMemberId}
                    onChange={(e) => setFormData(prev => ({ ...prev, familyMemberId: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-xl text-sm border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-primary/30`}
                  >
                    {familyMembers.map(m => (
                      <option key={m.id} value={m.id}>{m.avatar} {m.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Instructions */}
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Instructions</label>
                <textarea
                  value={formData.instructions}
                  onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
                  placeholder="Take with food, avoid alcohol..."
                  rows={2}
                  className={`w-full px-3 py-2 rounded-xl text-sm border resize-none ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-primary/30`}
                />
              </div>

              {/* Doctor & Dates */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Doctor</label>
                  <input
                    type="text"
                    value={formData.doctor}
                    onChange={(e) => setFormData(prev => ({ ...prev, doctor: e.target.value }))}
                    placeholder="Dr. Name"
                    className={`w-full px-3 py-2 rounded-xl text-sm border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-primary/30`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-xl text-sm border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-primary/30`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-xl text-sm border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-primary/30`}
                  />
                </div>
              </div>
            </div>

            <div className={`flex gap-3 p-5 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
              <button
                onClick={() => { setShowAddModal(false); setEditingMedicine(null); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium border ${theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors"
              >
                {editingMedicine ? 'Save Changes' : 'Add Medicine'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Medicines;
