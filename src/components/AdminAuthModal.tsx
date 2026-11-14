import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Lock, X, Loader2, KeyRound, Mail, AlertCircle } from 'lucide-react';

export const AdminAuthModal: React.FC = () => {
  const { loginModalOpen, setLoginModalOpen, login } = useAuth();
  const [email, setEmail] = useState('shresthmittal6@gmail.com');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!loginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please provide both email and password/PIN.');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);
      const res = await login(email.trim(), password.trim());
      if (!res.success) {
        setErrorMessage(res.error || 'Invalid credentials. Access denied.');
      } else {
        setPassword('');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#292321]/75 backdrop-blur-sm animate-fade-in font-tech">
      <div className="bg-[#FAF4EE] border border-[#D8BFA8] rounded-sm max-w-md w-full p-6 text-[#292321] shadow-2xl relative">
        <button
          onClick={() => setLoginModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 text-[#5A4F4B] hover:text-[#5B1018] transition-colors"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-10 h-10 rounded-full bg-[#5B1018]/10 border border-[#5B1018]/25 flex items-center justify-center text-[#5B1018]">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold uppercase tracking-wider text-[#292321]">
              Staff & Owner Portal
            </h3>
            <span className="text-[11px] text-[#5B1018] font-bold">
              SHREE DURGA STEELS • Administrative Access
            </span>
          </div>
        </div>

        <p className="text-xs text-[#4D423E] mb-5 leading-relaxed">
          Editing controls, image uploads, specifications CMS, and catalogue management are restricted to verified Owner/Admin and Editor accounts.
        </p>

        {errorMessage && (
          <div className="p-3 mb-4 rounded bg-[#5B1018]/10 border border-[#5B1018]/30 text-[#5B1018] text-xs flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#5B1018]" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-bold text-[#292321] mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#5B1018]" />
              <span>Staff / Owner Email</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. shresthmittal6@gmail.com"
              className="w-full px-3 py-2 bg-white border border-[#D8BFA8] rounded text-xs text-[#292321] placeholder:text-[#B8B8B3] focus:outline-none focus:border-[#5B1018] font-mono"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] uppercase tracking-wider font-bold text-[#292321] flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#5B1018]" />
                <span>Password or Master PIN</span>
              </label>
              <span className="text-[10px] text-[#5A4F4B]">PIN: 84450</span>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password or 5-digit PIN"
              className="w-full px-3 py-2 bg-white border border-[#D8BFA8] rounded text-xs text-[#292321] placeholder:text-[#B8B8B3] focus:outline-none focus:border-[#5B1018] font-mono tracking-widest"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] font-bold uppercase tracking-wider text-xs rounded-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 mt-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ShieldCheck className="w-4 h-4" />
            )}
            <span>Sign In to Control Center</span>
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-[#D8BFA8] text-center">
          <span className="text-[10px] text-[#5A4F4B]">
            Unauthorized visitors have view-only access to published content.
          </span>
        </div>
      </div>
    </div>
  );
};
