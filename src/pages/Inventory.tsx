import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { medicines, refillHistory } from '../data/mockData';
import { Package, AlertTriangle, RefreshCw, MapPin, Calendar, CheckCircle } from 'lucide-react';

const Inventory: React.FC = () => {
  const { theme } = useApp();
  const [showRefillModal, setShowRefillModal] = useState(false);

  const sortedMeds = [...medicines].sort((a, b) => a.inventory.daysRemaining - b.inventory.daysRemaining);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Inventory
          </h1>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Track medicine stock levels and manage refills
          </p>
        </div>
        <button
          onClick={() => setShowRefillModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors shadow-sm"
        >
          <RefreshCw size={18} />
          Request Refill
        </button>
      </div>

      {/* Stock Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-5`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <CheckCircle size={20} className="text-green-500" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {medicines.filter(m => m.inventory.daysRemaining > 14).length}
              </p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Well Stocked</p>
            </div>
          </div>
        </div>
        <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-5`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <AlertTriangle size={20} className="text-amber-500" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {medicines.filter(m => m.inventory.daysRemaining <= 14 && m.inventory.daysRemaining > 3).length}
              </p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Low Stock</p>
            </div>
          </div>
        </div>
        <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-5`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <Package size={20} className="text-red-500" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {medicines.filter(m => m.inventory.daysRemaining <= 3).length}
              </p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Critical</p>
            </div>
          </div>
        </div>
      </div>

      {/* Medicine Stock List */}
      <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-5`}>
        <h3 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Medicine Stock Levels
        </h3>
        <div className="space-y-4">
          {sortedMeds.map(med => {
            const percentage = (med.inventory.currentQuantity / med.inventory.totalQuantity) * 100;
            const isLow = med.inventory.daysRemaining <= 14;
            const isCritical = med.inventory.daysRemaining <= 3;

            return (
              <div key={med.id} className={`p-4 rounded-xl border ${theme === 'dark' ? 'border-gray-700 bg-gray-700/30' : 'border-gray-100 bg-gray-50/50'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                      style={{ backgroundColor: med.color + '20' }}
                    >
                      {med.icon}
                    </div>
                    <div>
                      <p className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {med.name} ({med.strength})
                      </p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {med.inventory.currentQuantity} / {med.inventory.totalQuantity} tablets
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${isCritical ? 'text-red-500' : isLow ? 'text-amber-500' : 'text-green-500'}`}>
                      {med.inventory.daysRemaining} days left
                    </p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {med.inventory.refillsRemaining} refills left
                    </p>
                  </div>
                </div>
                <div className={`w-full h-2 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                  <div
                    className={`h-full rounded-full transition-all ${isCritical ? 'bg-red-500' : isLow ? 'bg-amber-500' : 'bg-primary'}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                {isLow && (
                  <div className="flex items-center justify-between mt-3">
                    <span className={`text-xs ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`}>
                      ⚠️ {isCritical ? 'Refill immediately!' : 'Consider refilling soon'}
                    </span>
                    <button className="text-xs text-primary font-medium hover:underline">
                      Request Refill →
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Refill History */}
      <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-5`}>
        <h3 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Refill History
        </h3>
        <div className="space-y-3">
          {refillHistory.map(refill => (
            <div key={refill.id} className={`flex items-center justify-between p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg ${refill.status === 'completed' ? 'bg-green-100' : 'bg-amber-100'} flex items-center justify-center`}>
                  {refill.status === 'completed' ? (
                    <CheckCircle size={14} className="text-green-500" />
                  ) : (
                    <RefreshCw size={14} className="text-amber-500" />
                  )}
                </div>
                <div>
                  <p className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {refill.medicine}
                  </p>
                  <div className="flex items-center gap-2">
                    <MapPin size={10} className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {refill.pharmacy}
                    </span>
                    <Calendar size={10} className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {refill.date}
                    </span>
                  </div>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${refill.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {refill.status.charAt(0).toUpperCase() + refill.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Refill Modal */}
      {showRefillModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
            <div className={`p-5 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
              <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Request Refill
              </h2>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Select Medicine</label>
                <select className={`w-full px-3 py-2 rounded-xl text-sm border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`}>
                  {medicines.map(m => (
                    <option key={m.id} value={m.id}>{m.name} - {m.inventory.daysRemaining} days left</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Pharmacy</label>
                <select className={`w-full px-3 py-2 rounded-xl text-sm border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`}>
                  <option>CVS Pharmacy - Main St</option>
                  <option>Walgreens - Oak Ave</option>
                  <option>Rite Aid - Elm Blvd</option>
                </select>
              </div>
            </div>
            <div className={`flex gap-3 p-5 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
              <button onClick={() => setShowRefillModal(false)} className={`flex-1 py-2.5 rounded-xl text-sm font-medium border ${theme === 'dark' ? 'border-gray-600 text-gray-300' : 'border-gray-200 text-gray-700'}`}>
                Cancel
              </button>
              <button onClick={() => setShowRefillModal(false)} className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors">
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
