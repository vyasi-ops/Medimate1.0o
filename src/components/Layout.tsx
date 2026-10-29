import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Home, Pill, Calendar, Camera, Users, Shield, Package,
  BarChart3, Bell, Settings, Search, Plus, Menu, X,
  Moon, Sun, LogOut, ChevronDown
} from 'lucide-react';
import { familyMembers } from '../data/mockData';

const navItems = [
  { path: '/', icon: Home, label: 'Dashboard' },
  { path: '/medicines', icon: Pill, label: 'Medicines' },
  { path: '/schedule', icon: Calendar, label: 'Schedule' },
  { path: '/scanner', icon: Camera, label: 'Prescription Scanner' },
  { path: '/family', icon: Users, label: 'Family' },
  { path: '/safety', icon: Shield, label: 'Safety Center' },
  { path: '/inventory', icon: Package, label: 'Inventory' },
  { path: '/reports', icon: BarChart3, label: 'Reports' },
  { path: '/notifications', icon: Bell, label: 'Notifications' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export const Sidebar: React.FC = () => {
  const { sidebarOpen, toggleSidebar, theme } = useApp();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full z-50 transition-all duration-300
        ${sidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:w-20 lg:translate-x-0'}
        ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}
        border-r shadow-lg lg:shadow-none
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between p-4 h-16">
          <div className={`flex items-center gap-2 ${!sidebarOpen && 'lg:hidden'}`}>
            <span className="text-2xl">💊</span>
            <span className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              MediMate
            </span>
          </div>
          <button
            onClick={toggleSidebar}
            className={`p-2 rounded-lg lg:hidden ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            <X size={20} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-4 space-y-1 overflow-y-auto h-[calc(100%-4rem)]">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                ${isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : theme === 'dark'
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
                ${!sidebarOpen ? 'lg:justify-center lg:px-2' : ''}
              `}
            >
              <item.icon size={20} />
              <span className={`text-sm ${!sidebarOpen ? 'lg:hidden' : ''}`}>
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export const TopBar: React.FC = () => {
  const { theme, toggleTheme, sidebarOpen, toggleSidebar, notifications } = useApp();
  const [showProfile, setShowProfile] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className={`
      sticky top-0 z-30 h-16 flex items-center justify-between px-4 lg:px-6
      ${theme === 'dark' ? 'bg-gray-900/95 border-gray-800' : 'bg-white/95 border-gray-100'}
      border-b backdrop-blur-md
    `}>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
        >
          <Menu size={20} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
        </button>

        {/* Search */}
        <div className="relative hidden sm:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search medicines, family..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`
              pl-9 pr-4 py-2 rounded-xl text-sm w-64 transition-all
              ${theme === 'dark'
                ? 'bg-gray-800 text-white placeholder-gray-500 border-gray-700'
                : 'bg-gray-50 text-gray-800 placeholder-gray-400 border-gray-200'
              }
              border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
            `}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Quick Add */}
        <button
          onClick={() => navigate('/medicines?add=true')}
          className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors shadow-sm"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Add Medicine</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-xl ${theme === 'dark' ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <button
          onClick={() => navigate('/notifications')}
          className={`relative p-2 rounded-xl ${theme === 'dark' ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-danger text-white text-xs rounded-full flex items-center justify-center font-medium">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className={`flex items-center gap-2 p-2 rounded-xl ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-sm">👩</span>
            </div>
            <ChevronDown size={14} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
          </button>

          {showProfile && (
            <div className={`
              absolute right-0 top-12 w-64 rounded-2xl shadow-xl border p-2
              ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
            `}>
              <div className={`px-3 py-2 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
                <p className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Sarah Johnson</p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Family Manager</p>
              </div>
              <div className="py-1">
                <p className={`px-3 py-1 text-xs font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Switch Profile</p>
                {familyMembers.map(member => (
                  <button
                    key={member.id}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${theme === 'dark' ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'}`}
                  >
                    <span>{member.avatar}</span>
                    <span>{member.name}</span>
                  </button>
                ))}
              </div>
              <div className={`border-t pt-1 mt-1 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
                <button
                  onClick={() => { navigate('/settings'); setShowProfile(false); }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${theme === 'dark' ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'}`}
                >
                  <Settings size={14} />
                  Settings
                </button>
                <button
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-danger hover:bg-danger/10`}
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, sidebarOpen } = useApp();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-bg'}`}>
      <Sidebar />
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        <TopBar />
        <main className="p-4 lg:p-6 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};
