import React from 'react';
import { useContent } from '../context/ContentContext';
import { ShieldCheck, Sliders, Plus, Pencil, LogOut } from 'lucide-react';

export const AdminFloatingBar: React.FC = () => {
  const {
    isAdmin,
    adminUser,
    activePage,
    setActivePage,
    setAdminModalOpen,
    openAdminModalForProduct,
    logoutAdmin,
  } = useContent();

  // If not logged in as Admin, or if already on the full admin panel/login, do not show this bar
  if (!isAdmin || activePage === 'admin-panel' || activePage === 'admin-login') {
    return null;
  }

  return (
    <aside
      aria-label="Admin quick toolbar"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[92%] sm:w-auto shadow-2xl"
    >
      <div className="px-3 py-2 rounded-md border border-[#D8BFA8]/40 bg-[#292321]/95 text-[#F3E7DA] flex items-center justify-between sm:justify-start gap-2 sm:gap-3 backdrop-blur-md shadow-[#292321]/40">
        <div className="flex items-center gap-1.5 shrink-0 pl-1">
          <ShieldCheck className="w-4 h-4 text-[#D8BFA8]" />
          <span className="text-[11px] font-tech font-bold uppercase tracking-wider text-[#F3E7DA] hidden sm:inline">
            Admin Mode ({adminUser || 'Admin'})
          </span>
        </div>

        <div className="h-4 w-px bg-[#D8BFA8]/30 hidden sm:block" />

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActivePage('admin-panel')}
            className="px-2.5 py-1 rounded bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] text-[10px] sm:text-[11px] font-tech font-bold uppercase tracking-wider transition-colors flex items-center gap-1"
            title="Open Dedicated Admin Control Panel"
          >
            <Sliders className="w-3 h-3" />
            <span>Admin Panel</span>
          </button>

          <button
            onClick={() => openAdminModalForProduct()}
            className="px-2.5 py-1 rounded bg-[#F3E7DA] hover:bg-white text-[#292321] text-[10px] sm:text-[11px] font-tech font-bold uppercase tracking-wider transition-colors flex items-center gap-1"
            title="Add New Product"
          >
            <Plus className="w-3 h-3 text-[#5B1018]" />
            <span>+ Product</span>
          </button>

          <button
            onClick={() => setAdminModalOpen(true)}
            className="px-2.5 py-1 rounded bg-[#3A312E] hover:bg-[#5B1018] text-[#F3E7DA] text-[10px] sm:text-[11px] font-tech font-bold uppercase tracking-wider transition-colors hidden md:flex items-center gap-1 border border-[#D8BFA8]/30"
            title="Full CMS Modal"
          >
            <Pencil className="w-3 h-3 text-[#D8BFA8]" />
            <span>CMS</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="p-1 sm:px-2 sm:py-1 rounded text-[#D8BFA8] hover:bg-[#5B1018] hover:text-[#F3E7DA] text-[10px] sm:text-[11px] font-tech font-bold uppercase tracking-wider transition-colors flex items-center gap-1"
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
