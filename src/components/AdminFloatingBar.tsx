import React from 'react';
import { useContent } from '../context/ContentContext';
import { ShieldCheck, Sliders, Plus, Pencil, LogOut, ExternalLink } from 'lucide-react';

export const AdminFloatingBar: React.FC = () => {
  const {
    isAdmin,
    adminUser,
    activePage,
    setActivePage,
    setAdminModalOpen,
    openAdminModalForProduct,
    logoutAdmin,
    themeMode,
  } = useContent();

  // If not logged in as Admin, or if already on the full admin panel/login, do not show this bar
  if (!isAdmin || activePage === 'admin-panel' || activePage === 'admin-login') {
    return null;
  }

  const isLight = themeMode === 'light';

  return (
    <aside
      aria-label="Admin quick toolbar"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[92%] sm:w-auto shadow-2xl"
    >
      <div
        className={`px-3 py-2 rounded-md border flex items-center justify-between sm:justify-start gap-2 sm:gap-3 backdrop-blur-md ${
          isLight
            ? 'bg-slate-900/95 text-white border-amber-500/40 shadow-black/20'
            : 'bg-zinc-950/95 text-white border-amber-500/40 shadow-black/60'
        }`}
      >
        <div className="flex items-center gap-1.5 shrink-0 pl-1">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span className="text-[11px] font-tech font-bold uppercase tracking-wider text-amber-400 hidden sm:inline">
            Admin Mode ({adminUser || 'Admin'})
          </span>
        </div>

        <div className="h-4 w-px bg-white/20 hidden sm:block" />

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActivePage('admin-panel')}
            className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] sm:text-[11px] font-tech font-bold uppercase tracking-wider transition-colors flex items-center gap-1"
            title="Open Dedicated Admin Control Panel"
          >
            <Sliders className="w-3 h-3" />
            <span>Admin Panel</span>
          </button>

          <button
            onClick={() => openAdminModalForProduct()}
            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] sm:text-[11px] font-tech font-bold uppercase tracking-wider transition-colors flex items-center gap-1"
            title="Add New Product"
          >
            <Plus className="w-3 h-3" />
            <span>+ Product</span>
          </button>

          <button
            onClick={() => setAdminModalOpen(true)}
            className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[10px] sm:text-[11px] font-tech font-bold uppercase tracking-wider transition-colors hidden md:flex items-center gap-1 border border-white/10"
            title="Full CMS Modal"
          >
            <Pencil className="w-3 h-3 text-amber-400" />
            <span>CMS</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="p-1 sm:px-2 sm:py-1 rounded text-red-400 hover:bg-red-500/20 text-[10px] sm:text-[11px] font-tech font-bold uppercase tracking-wider transition-colors flex items-center gap-1"
            title="Sign Out as Administrator"
          >
            <LogOut className="w-3 h-3" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
