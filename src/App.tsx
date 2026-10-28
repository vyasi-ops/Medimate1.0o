import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';
import {
  medicines, familyMembers, doseHistory, notifications,
  todayDoses
} from './data/mockData';

// Pages
import Dashboard from './pages/Dashboard';
import Medicines from './pages/Medicines';
import Schedule from './pages/Schedule';
import PrescriptionScanner from './pages/PrescriptionScanner';
import Family from './pages/Family';
import SafetyCenter from './pages/SafetyCenter';
import Inventory from './pages/Inventory';
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Auth from './pages/Auth';

const AppContent: React.FC = () => {
  const { isAuthenticated, login } = useApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auto-login for demo purposes
    if (!isAuthenticated) {
      login(familyMembers[0]);
    }
    setTimeout(() => setLoading(false), 800);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Layout><Dashboard /></Layout>
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />
      <Route
        path="/medicines"
        element={
          isAuthenticated ? (
            <Layout><Medicines /></Layout>
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />
      <Route
        path="/schedule"
        element={
          isAuthenticated ? (
            <Layout><Schedule /></Layout>
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />
      <Route
        path="/scanner"
        element={
          isAuthenticated ? (
            <Layout><PrescriptionScanner /></Layout>
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />
      <Route
        path="/family"
        element={
          isAuthenticated ? (
            <Layout><Family /></Layout>
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />
      <Route
        path="/safety"
        element={
          isAuthenticated ? (
            <Layout><SafetyCenter /></Layout>
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />
      <Route
        path="/inventory"
        element={
          isAuthenticated ? (
            <Layout><Inventory /></Layout>
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />
      <Route
        path="/reports"
        element={
          isAuthenticated ? (
            <Layout><Reports /></Layout>
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />
      <Route
        path="/notifications"
        element={
          isAuthenticated ? (
            <Layout><Notifications /></Layout>
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />
      <Route
        path="/settings"
        element={
          isAuthenticated ? (
            <Layout><Settings /></Layout>
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />
    </Routes>
  );
};

const SplashScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="text-6xl mb-4 animate-bounce-soft">💊</div>
        <h1 className="text-3xl font-bold text-white mb-2">MediMate</h1>
        <p className="text-white/70 text-sm">Your family's medicine companion</p>
        <div className="mt-8 flex justify-center">
          <div className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
