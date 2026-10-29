import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FamilyMember, Medicine, DoseRecord, Notification } from '../data/mockData';

interface AppState {
  theme: 'light' | 'dark';
  isAuthenticated: boolean;
  currentUser: FamilyMember | null;
  activeFamilyMember: FamilyMember | null;
  medicines: Medicine[];
  doseHistory: DoseRecord[];
  notifications: Notification[];
  sidebarOpen: boolean;
  accessibilityMode: {
    largeText: boolean;
    highContrast: boolean;
  };
}

interface AppContextType extends AppState {
  toggleTheme: () => void;
  login: (user: FamilyMember) => void;
  logout: () => void;
  setActiveFamilyMember: (member: FamilyMember) => void;
  markDoseTaken: (doseId: string) => void;
  markNotificationRead: (notificationId: string) => void;
  toggleSidebar: () => void;
  setAccessibility: (key: 'largeText' | 'highContrast', value: boolean) => void;
  addMedicine: (medicine: Medicine) => void;
  updateMedicine: (medicine: Medicine) => void;
  deleteMedicine: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    theme: 'light',
    isAuthenticated: true,
    currentUser: null,
    activeFamilyMember: null,
    medicines: [],
    doseHistory: [],
    notifications: [],
    sidebarOpen: true,
    accessibilityMode: {
      largeText: false,
      highContrast: false,
    }
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('medimate-theme') as 'light' | 'dark' || 'light';
    setState(prev => ({ ...prev, theme: savedTheme }));
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    document.documentElement.classList.toggle('light', savedTheme === 'light');
  }, []);

  const toggleTheme = () => {
    setState(prev => {
      const newTheme = prev.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('medimate-theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      document.documentElement.classList.toggle('light', newTheme === 'light');
      return { ...prev, theme: newTheme };
    });
  };

  const login = (user: FamilyMember) => {
    setState(prev => ({
      ...prev,
      isAuthenticated: true,
      currentUser: user,
      activeFamilyMember: user
    }));
  };

  const logout = () => {
    setState(prev => ({
      ...prev,
      isAuthenticated: false,
      currentUser: null,
      activeFamilyMember: null
    }));
  };

  const setActiveFamilyMember = (member: FamilyMember) => {
    setState(prev => ({ ...prev, activeFamilyMember: member }));
  };

  const markDoseTaken = (doseId: string) => {
    setState(prev => ({
      ...prev,
      doseHistory: prev.doseHistory.map(d =>
        d.id === doseId
          ? { ...d, status: 'taken' as const, takenTime: new Date().toISOString(), confirmedBy: prev.currentUser?.id }
          : d
      )
    }));
  };

  const markNotificationRead = (notificationId: string) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    }));
  };

  const toggleSidebar = () => {
    setState(prev => ({ ...prev, sidebarOpen: !prev.sidebarOpen }));
  };

  const setAccessibility = (key: 'largeText' | 'highContrast', value: boolean) => {
    setState(prev => ({
      ...prev,
      accessibilityMode: { ...prev.accessibilityMode, [key]: value }
    }));
  };

  const addMedicine = (medicine: Medicine) => {
    setState(prev => ({ ...prev, medicines: [...prev.medicines, medicine] }));
  };

  const updateMedicine = (medicine: Medicine) => {
    setState(prev => ({
      ...prev,
      medicines: prev.medicines.map(m => m.id === medicine.id ? medicine : m)
    }));
  };

  const deleteMedicine = (id: string) => {
    setState(prev => ({
      ...prev,
      medicines: prev.medicines.filter(m => m.id !== id)
    }));
  };

  return (
    <AppContext.Provider value={{
      ...state,
      toggleTheme,
      login,
      logout,
      setActiveFamilyMember,
      markDoseTaken,
      markNotificationRead,
      toggleSidebar,
      setAccessibility,
      addMedicine,
      updateMedicine,
      deleteMedicine,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
