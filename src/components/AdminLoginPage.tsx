import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import {
  ShieldCheck,
  Lock,
  User,
  KeyRound,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Sliders,
  LogOut,
  Building2,
} from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const {
    brand,
    isAdmin,
    adminUser,
    loginAdmin,
    logoutAdmin,
    setActivePage,
    themeMode,
  } = useContent();

  const isLight = themeMode === 'light';

  const [username, setUsername] = useState('Admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successAnimation, setSuccessAnimation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim()) {
      setErrorMessage('Please enter the Admin Username.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter the Admin Password.');
      return;
    }

    const res = loginAdmin(username, password);
    if (res.success) {
      setSuccessAnimation(true);
      setTimeout(() => {
        setActivePage('admin-panel');
      }, 700);
    } else {
      setErrorMessage(res.error || 'Invalid credentials. Please use Admin / admin123.');
    }
  };

  const handleAutofill = () => {
    setUsername('Admin');
    setPassword('admin123');
    setErrorMessage('');
  };

  return (
    <div
      className={`min-h-[85vh] flex items-center justify-center px-4 py-12 ${
        isLight ? 'bg-slate-100 text-slate-900' : 'bg-[#0a0c0f] text-zinc-100'
      }`}
    >
      <div className="w-full max-w-md">
        {/* Top Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setActivePage('home')}
            className={`inline-flex items-center gap-2 text-xs font-tech font-bold uppercase tracking-wider transition-colors ${
              isLight
                ? 'text-slate-600 hover:text-slate-950'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Website (View Only)</span>
          </button>
        </div>

        {/* Card Container */}
        <div
          className={`rounded-xs border shadow-xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-md ${
            isLight
              ? 'bg-white border-slate-300'
              : 'bg-zinc-900/90 border-white/10'
          }`}
        >
          {/* Accent top gradient line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600" />

          {/* Header branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 mb-3 shadow-inner">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <h1 className="text-xl sm:text-2xl font-tech font-black tracking-wider uppercase">
              ADMINISTRATOR LOGIN
            </h1>
            <p className="text-xs text-amber-500 font-tech font-bold tracking-widest uppercase mt-0.5">
              {brand.brandName} • SECURE CMS PORTAL
            </p>
            <p
              className={`text-xs mt-2 ${
                isLight ? 'text-slate-500' : 'text-zinc-400'
              }`}
            >
              Sign in with administrative credentials to edit products, prices, specifications, and website content.
            </p>
          </div>

          {/* Already Logged In View */}
          {isAdmin ? (
            <div className="space-y-5 text-center">
              <div
                className={`p-4 rounded-xs border text-left ${
                  isLight
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                }`}
              >
                <div className="flex items-center gap-2 font-tech font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Authenticated as {adminUser || 'Administrator'}</span>
                </div>
                <p className="text-xs mt-1 text-emerald-700 dark:text-emerald-400">
                  You have full editing privileges. You can manage the catalog or return to view the live website.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => setActivePage('admin-panel')}
                  className="w-full py-3 px-4 rounded-xs bg-amber-500 hover:bg-amber-400 text-slate-950 font-tech font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Sliders className="w-4 h-4" />
                  <span>OPEN ADMIN CONTROL PANEL</span>
                </button>

                <button
                  onClick={() => setActivePage('home')}
                  className={`w-full py-2.5 px-4 rounded-xs border font-tech font-bold text-xs uppercase tracking-wider transition-colors ${
                    isLight
                      ? 'border-slate-300 hover:bg-slate-100 text-slate-800'
                      : 'border-white/10 hover:bg-zinc-800 text-zinc-300'
                  }`}
                >
                  <span>BROWSE WEBSITE (WITH EDIT CONTROLS)</span>
                </button>

                <button
                  onClick={logoutAdmin}
                  className="w-full py-2 px-4 rounded-xs text-xs font-tech font-bold text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-colors flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>LOGOUT ADMINISTRATOR</span>
                </button>
              </div>
            </div>
          ) : (
            /* Login Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error Message */}
              {errorMessage && (
                <div className="p-3 rounded-xs border border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Success Notice during redirection */}
              {successAnimation && (
                <div className="p-3 rounded-xs border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Login successful! Opening Admin Control Panel...</span>
                </div>
              )}

              {/* Username Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="admin-username"
                  className={`block text-xs font-tech font-bold uppercase tracking-wider ${
                    isLight ? 'text-slate-700' : 'text-zinc-300'
                  }`}
                >
                  Admin Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="admin-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Admin"
                    autoComplete="username"
                    required
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xs text-xs font-mono border transition-colors outline-none focus:ring-1 focus:ring-amber-500 ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                        : 'bg-zinc-950 border-white/10 text-white focus:border-amber-500'
                    }`}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="admin-password"
                  className={`block text-xs font-tech font-bold uppercase tracking-wider ${
                    isLight ? 'text-slate-700' : 'text-zinc-300'
                  }`}
                >
                  Admin Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="admin123"
                    autoComplete="current-password"
                    required
                    className={`w-full pl-9 pr-10 py-2.5 rounded-xs text-xs font-mono border transition-colors outline-none focus:ring-1 focus:ring-amber-500 ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                        : 'bg-zinc-950 border-white/10 text-white focus:border-amber-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-amber-500 transition-colors"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Credential Hint Badge with Quick Fill */}
              <div
                className={`p-3 rounded-xs border text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 ${
                  isLight
                    ? 'bg-amber-50/70 border-amber-300 text-amber-950'
                    : 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                }`}
              >
                <div>
                  <span className="font-tech font-bold uppercase tracking-wider block text-[11px]">
                    Default Admin Credentials:
                  </span>
                  <div className="font-mono text-[11px] mt-0.5">
                    User: <span className="font-bold">Admin</span> | Pass:{' '}
                    <span className="font-bold">admin123</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAutofill}
                  className="px-2 py-1 rounded-xs bg-amber-500 text-slate-950 font-tech font-bold text-[10px] uppercase tracking-wider hover:bg-amber-400 transition-colors shrink-0"
                >
                  Autofill
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={successAnimation}
                className="w-full py-3 px-4 rounded-xs bg-amber-500 hover:bg-amber-400 text-slate-950 font-tech font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <Lock className="w-4 h-4" />
                <span>SIGN IN TO ADMIN PANEL</span>
              </button>

              {/* Guest Return */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setActivePage('home')}
                  className={`text-xs transition-colors hover:underline ${
                    isLight ? 'text-slate-500' : 'text-zinc-500'
                  }`}
                >
                  Just looking? Browse website in Guest / View-Only mode
                </button>
              </div>
            </form>
          )}

          {/* Footer note */}
          <div
            className={`mt-6 pt-4 border-t text-[11px] text-center ${
              isLight ? 'border-slate-200 text-slate-400' : 'border-white/5 text-zinc-500'
            }`}
          >
            Authorized personnel only • Shree Durga Steels Industrial CMS
          </div>
        </div>
      </div>
    </div>
  );
};
