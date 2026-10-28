import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Moon, Sun, Bell, Shield, Eye, Globe, User, Smartphone, Mail, ToggleLeft, ToggleRight } from 'lucide-react';

const Settings: React.FC = () => {
  const { theme, toggleTheme, accessibilityMode, setAccessibility } = useApp();
  const [activeTab, setActiveTab] = useState('general');

  const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button onClick={onToggle} className="relative">
      {enabled ? (
        <ToggleRight size={28} className="text-primary" />
      ) : (
        <ToggleLeft size={28} className={theme === 'dark' ? 'text-gray-500' : 'text-gray-300'} />
      )}
    </button>
  );

  const tabs = [
    { key: 'general', label: 'General', icon: User },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'accessibility', label: 'Accessibility', icon: Eye },
    { key: 'privacy', label: 'Privacy', icon: Shield },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Settings
        </h1>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          Customize your MediMate experience
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-3 h-fit`}>
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-primary/10 text-primary'
                    : theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-4">
          {activeTab === 'general' && (
            <>
              {/* Theme */}
              <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-5`}>
                <h3 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Appearance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {theme === 'dark' ? <Moon size={18} className="text-blue-400" /> : <Sun size={18} className="text-amber-500" />}
                      <div>
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Dark Mode</p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Switch between light and dark themes</p>
                      </div>
                    </div>
                    <Toggle enabled={theme === 'dark'} onToggle={toggleTheme} />
                  </div>
                </div>
              </div>

              {/* Language */}
              <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-5`}>
                <h3 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Language & Region</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Globe size={18} className="text-primary" />
                      <div>
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Language</p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Choose your preferred language</p>
                      </div>
                    </div>
                    <select className={`px-3 py-1.5 rounded-lg text-sm border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`}>
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Chinese</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Account */}
              <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-5`}>
                <h3 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Account</h3>
                <div className="space-y-3">
                  <div className={`flex items-center justify-between p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span>👩</span>
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Sarah Johnson</p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>sarah.johnson@email.com</p>
                      </div>
                    </div>
                    <button className="text-primary text-sm font-medium hover:underline">Edit</button>
                  </div>
                  <div className="flex gap-3">
                    <button className={`flex-1 py-2 rounded-xl text-sm font-medium border ${theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                      Change Password
                    </button>
                    <button className="flex-1 py-2 rounded-xl text-sm font-medium text-danger border border-danger/20 hover:bg-danger/5">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'notifications' && (
            <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-5`}>
              <h3 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: 'Medicine Reminders', desc: 'Get notified when medicines are due', enabled: true },
                  { label: 'Missed Dose Alerts', desc: 'Alert when a dose is missed', enabled: true },
                  { label: 'Refill Reminders', desc: 'Notify when stock is running low', enabled: true },
                  { label: 'Family Activity', desc: 'Updates when family members take medicines', enabled: true },
                  { label: 'Safety Alerts', desc: 'Drug interactions and warnings', enabled: true },
                  { label: 'Weekly Reports', desc: 'Receive weekly adherence summaries', enabled: false },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                    <div>
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.label}</p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                    </div>
                    <Toggle enabled={item.enabled} onToggle={() => {}} />
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Delivery Methods</h4>
                <div className="flex gap-3">
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                    <Smartphone size={16} className="text-primary" />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Push</span>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                    <Mail size={16} className="text-blue-500" />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Email</span>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                    <Bell size={16} className="text-amber-500" />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>SMS</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'accessibility' && (
            <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-5`}>
              <h3 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Accessibility Settings</h3>
              <div className="space-y-4">
                <div className={`flex items-center justify-between p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                  <div>
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Large Text Mode</p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Increase text size for better readability</p>
                  </div>
                  <Toggle
                    enabled={accessibilityMode.largeText}
                    onToggle={() => setAccessibility('largeText', !accessibilityMode.largeText)}
                  />
                </div>
                <div className={`flex items-center justify-between p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                  <div>
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>High Contrast Mode</p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Enhanced contrast for better visibility</p>
                  </div>
                  <Toggle
                    enabled={accessibilityMode.highContrast}
                    onToggle={() => setAccessibility('highContrast', !accessibilityMode.highContrast)}
                  />
                </div>
                <div className={`flex items-center justify-between p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                  <div>
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Voice Assistance</p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Enable voice commands and read-aloud</p>
                  </div>
                  <Toggle enabled={false} onToggle={() => {}} />
                </div>
                <div className={`flex items-center justify-between p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                  <div>
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Screen Reader Support</p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Optimized for screen readers</p>
                  </div>
                  <Toggle enabled={true} onToggle={() => {}} />
                </div>
                <div className={`flex items-center justify-between p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                  <div>
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Elderly Friendly Layout</p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Larger buttons and simplified navigation</p>
                  </div>
                  <Toggle enabled={false} onToggle={() => {}} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-100'} border shadow-sm p-5`}>
              <h3 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Privacy & Security</h3>
              <div className="space-y-4">
                <div className={`flex items-center justify-between p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                  <div>
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Two-Factor Authentication</p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Add extra security to your account</p>
                  </div>
                  <Toggle enabled={true} onToggle={() => {}} />
                </div>
                <div className={`flex items-center justify-between p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                  <div>
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Biometric Login</p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Use fingerprint or face recognition</p>
                  </div>
                  <Toggle enabled={false} onToggle={() => {}} />
                </div>
                <div className={`flex items-center justify-between p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                  <div>
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Share Health Data</p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Allow family members to see adherence data</p>
                  </div>
                  <Toggle enabled={true} onToggle={() => {}} />
                </div>
                <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'border-gray-700 bg-gray-700/20' : 'border-gray-200 bg-gray-50'}`}>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    🔒 Your health data is encrypted end-to-end. We never share your information with third parties without your explicit consent.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
