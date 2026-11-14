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
  Sliders,
  LogOut,
} from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const {
    brand,
    isAdmin,
    adminUser,
    loginAdmin,
    logoutAdmin,
    setActivePage,
  } = useContent();

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
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[#F3E7DA] text-[#292321]">
      <div className="w-full max-w-md">
        {/* Top Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setActivePage('home')}
            className="inline-flex items-center gap-2 text-xs font-tech font-bold uppercase tracking-wider text-[#4D423E] hover:text-[#5B1018] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Website (View Only)</span>
          </button>
        </div>

        {/* Card Container */}
        <div className="rounded-xs border border-[#D8BFA8] bg-[#FAF4EE] shadow-xl p-6 sm:p-8 relative overflow-hidden">
          {/* Accent top bar */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-[#5B1018]" />

          {/* Header branding */}
          <div className="text-center mb-8 pt-1">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#5B1018]/10 border border-[#5B1018]/25 text-[#5B1018] mb-3 shadow-inner">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <h1 className="text-xl sm:text-2xl font-tech font-black tracking-wider uppercase text-[#292321]">
              ADMINISTRATOR LOGIN
            </h1>
            <p className="text-xs text-[#5B1018] font-tech font-bold tracking-widest uppercase mt-0.5">
              {brand.brandName} • SECURE CMS PORTAL
            </p>
            <p className="text-xs mt-2 text-[#4D423E]">
              Sign in with administrative credentials to edit products, prices, specifications, and website content.
            </p>
          </div>

          {/* Already Logged In View */}
          {isAdmin ? (
            <div className="space-y-5 text-center">
              <div className="p-4 rounded-xs border border-[#5B1018]/25 bg-[#E9D9C8] text-[#292321] text-left">
                <div className="flex items-center gap-2 font-tech font-bold text-sm text-[#5B1018]">
                  <CheckCircle2 className="w-4 h-4 text-[#5B1018]" />
                  <span>Authenticated as {adminUser || 'Administrator'}</span>
                </div>
                <p className="text-xs mt-1 text-[#4D423E]">
                  You have full editing privileges. You can manage the catalog or return to view the live website.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => setActivePage('admin-panel')}
                  className="w-full py-3 px-4 rounded-xs bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] font-tech font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Sliders className="w-4 h-4" />
                  <span>OPEN ADMIN CONTROL PANEL</span>
                </button>

                <button
                  onClick={() => setActivePage('home')}
                  className="w-full py-2.5 px-4 rounded-xs border border-[#D8BFA8] bg-white hover:bg-[#E9D9C8] text-[#292321] font-tech font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  <span>BROWSE WEBSITE (WITH EDIT CONTROLS)</span>
                </button>

                <button
                  onClick={logoutAdmin}
                  className="w-full py-2 px-4 rounded-xs text-xs font-tech font-bold text-[#5B1018] hover:bg-[#5B1018]/10 transition-colors flex items-center justify-center gap-1.5"
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
                <div className="p-3 rounded-xs border border-[#5B1018]/40 bg-[#5B1018]/10 text-[#5B1018] text-xs flex items-start gap-2 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Success Notice during redirection */}
              {successAnimation && (
                <div className="p-3 rounded-xs border border-[#5B1018]/30 bg-[#E9D9C8] text-[#5B1018] text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Login successful! Opening Admin Control Panel...</span>
                </div>
              )}

              {/* Username Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="admin-username"
                  className="block text-xs font-tech font-bold uppercase tracking-wider text-[#292321]"
                >
                  Admin Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#5A4F4B]">
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
                    className="w-full pl-9 pr-3 py-2.5 rounded-xs text-xs font-mono bg-white border border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018] outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="admin-password"
                  className="block text-xs font-tech font-bold uppercase tracking-wider text-[#292321]"
                >
                  Admin Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#5A4F4B]">
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
                    className="w-full pl-9 pr-10 py-2.5 rounded-xs text-xs font-mono bg-white border border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018] outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#5A4F4B] hover:text-[#5B1018] transition-colors"
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
              <div className="p-3 rounded-xs border border-[#D8BFA8] bg-[#E9D9C8] text-[#292321] text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <span className="font-tech font-bold uppercase tracking-wider block text-[11px] text-[#5B1018]">
                    Default Admin Credentials:
                  </span>
                  <div className="font-mono text-[11px] mt-0.5 text-[#292321]">
                    User: <span className="font-bold">Admin</span> | Pass:{' '}
                    <span className="font-bold">admin123</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAutofill}
                  className="px-2.5 py-1 rounded-xs bg-[#292321] text-[#F3E7DA] font-tech font-bold text-[10px] uppercase tracking-wider hover:bg-[#5B1018] transition-colors shrink-0"
                >
                  Autofill
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={successAnimation}
                className="w-full py-3 px-4 rounded-xs bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] font-tech font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <Lock className="w-4 h-4" />
                <span>SIGN IN TO ADMIN PANEL</span>
              </button>

              {/* Guest Return */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setActivePage('home')}
                  className="text-xs text-[#5A4F4B] hover:text-[#5B1018] transition-colors hover:underline"
                >
                  Just looking? Browse website in Guest / View-Only mode
                </button>
              </div>
            </form>
          )}

          {/* Footer note */}
          <div className="mt-6 pt-4 border-t border-[#D8BFA8] text-[11px] text-center text-[#5A4F4B]">
            Authorized personnel only • Shree Durga Steels Industrial CMS
          </div>
        </div>
      </div>
    </div>
  );
};
