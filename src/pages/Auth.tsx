import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { familyMembers } from '../data/mockData';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';

const Auth: React.FC = () => {
  const { theme, login } = useApp();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'verify'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('individual');

  const handleLogin = () => {
    login(familyMembers[0]);
    navigate('/');
  };

  const handleSignup = () => {
    login(familyMembers[0]);
    navigate('/');
  };

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-gray-950' : 'bg-bg'}`}>
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary-dark items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white" />
          <div className="absolute bottom-32 right-20 w-48 h-48 rounded-full bg-white" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white" />
        </div>
        <div className="relative z-10 text-white max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-5xl">💊</span>
            <h1 className="text-4xl font-bold">MediMate</h1>
          </div>
          <p className="text-xl text-white/90 mb-8">
            Your family's medicine companion.
          </p>
          <div className="space-y-4">
            {[
              { icon: '🏠', text: 'Track medications for your entire family' },
              { icon: '⏰', text: 'Never miss a dose with smart reminders' },
              { icon: '🛡️', text: 'Overdose protection and safety alerts' },
              { icon: '📊', text: 'Detailed health reports and insights' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-white/90">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-2">
              {['👩', '👨', '👵', '👧'].map((avatar, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/30">
                  <span className="text-sm">{avatar}</span>
                </div>
              ))}
            </div>
            <p className="text-white/70 text-sm">
              Trusted by <strong className="text-white">10,000+</strong> families
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <span className="text-3xl">💊</span>
            <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>MediMate</h1>
          </div>

          {mode === 'login' && (
            <>
              <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Welcome back 👋
              </h2>
              <p className={`mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Sign in to manage your family's medications
              </p>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@email.com"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-10 py-3 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary`}
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Remember me</span>
                  </label>
                  <button
                    onClick={() => setMode('forgot')}
                    className="text-sm text-primary font-medium hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  onClick={handleLogin}
                  className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  Sign In
                  <ArrowRight size={16} />
                </button>

                <div className="relative my-6">
                  <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'border-gray-700' : ''}`}>
                    <div className={`w-full border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`} />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className={`px-3 ${theme === 'dark' ? 'bg-gray-950 text-gray-400' : 'bg-bg text-gray-500'}`}>or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className={`flex items-center justify-center gap-2 py-3 rounded-xl border ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}>
                    <span>🔵</span>
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Google</span>
                  </button>
                  <button className={`flex items-center justify-center gap-2 py-3 rounded-xl border ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}>
                    <span>🍎</span>
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Apple</span>
                  </button>
                </div>

                <p className={`text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Don't have an account?{' '}
                  <button onClick={() => setMode('signup')} className="text-primary font-medium hover:underline">
                    Sign up
                  </button>
                </p>
              </div>
            </>
          )}

          {mode === 'signup' && (
            <>
              <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Create Account ✨
              </h2>
              <p className={`mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Start managing your family's health today
              </p>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Sarah Johnson"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@email.com"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-10 py-3 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary`}
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    I am a...
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'individual', label: 'Individual', icon: '👤' },
                      { value: 'family', label: 'Family Manager', icon: '👨‍👩‍👧' },
                      { value: 'caregiver', label: 'Caregiver', icon: '🩺' },
                      { value: 'elderly', label: 'Elderly User', icon: '👴' },
                    ].map(type => (
                      <button
                        key={type.value}
                        onClick={() => setUserType(type.value)}
                        className={`flex items-center gap-2 p-3 rounded-xl border text-sm transition-all ${
                          userType === type.value
                            ? 'border-primary bg-primary/5 text-primary'
                            : theme === 'dark' ? 'border-gray-700 text-gray-400 hover:border-gray-600' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <span>{type.icon}</span>
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSignup}
                  className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  Create Account
                  <ArrowRight size={16} />
                </button>

                <p className={`text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Already have an account?{' '}
                  <button onClick={() => setMode('login')} className="text-primary font-medium hover:underline">
                    Sign in
                  </button>
                </p>
              </div>
            </>
          )}

          {mode === 'forgot' && (
            <>
              <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Reset Password 🔑
              </h2>
              <p className={`mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Enter your email and we'll send you a reset link
              </p>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@email.com"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary`}
                    />
                  </div>
                </div>

                <button
                  onClick={() => setMode('verify')}
                  className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors shadow-sm"
                >
                  Send Reset Link
                </button>

                <p className={`text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <button onClick={() => setMode('login')} className="text-primary font-medium hover:underline">
                    ← Back to sign in
                  </button>
                </p>
              </div>
            </>
          )}

          {mode === 'verify' && (
            <>
              <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Check Your Email 📧
              </h2>
              <p className={`mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                We've sent a verification code to {email || 'your email'}
              </p>

              <div className="space-y-4">
                <div className="flex gap-3 justify-center">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      className={`w-12 h-14 text-center text-xl font-bold rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleLogin}
                  className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors shadow-sm"
                >
                  Verify & Continue
                </button>

                <p className={`text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Didn't receive the code?{' '}
                  <button className="text-primary font-medium hover:underline">Resend</button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
