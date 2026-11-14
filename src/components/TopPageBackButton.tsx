import React from 'react';
import { ArrowLeft, Home, ChevronRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface TopPageBackButtonProps {
  currentPageTitle: string;
  categoryName?: string;
  className?: string;
}

export const TopPageBackButton: React.FC<TopPageBackButtonProps> = ({
  currentPageTitle,
  categoryName,
  className = '',
}) => {
  const { goBack, previousPageTitle, navigateTo } = useContent();

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 py-2.5 px-3 sm:px-4 rounded-sm border mb-6 transition-all bg-[#FAF4EE] border-[#D8BFA8] shadow-xs ${className}`}
    >
      {/* Top-Left Back Action Button */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm font-tech text-xs font-bold uppercase tracking-wider transition-all shadow-xs group bg-[#292321] hover:bg-[#5B1018] text-[#F3E7DA] border border-[#292321] hover:border-[#5B1018]"
          title={previousPageTitle ? `Go back to: ${previousPageTitle}` : 'Go back to previous page'}
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>BACK</span>
          {previousPageTitle && (
            <span className="hidden sm:inline opacity-80 text-[11px] font-normal normal-case truncate max-w-[160px]">
              • to {previousPageTitle}
            </span>
          )}
        </button>

        {/* Dynamic Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="hidden md:flex items-center gap-1.5 text-xs font-tech text-[#5A4F4B]"
        >
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="hover:text-[#5B1018] transition-colors inline-flex items-center gap-1"
            title="Go to Home Page"
          >
            <Home className="w-3 h-3" />
            <span>HOME</span>
          </button>

          {categoryName && (
            <>
              <ChevronRight className="w-3 h-3 text-[#B8B8B3]" />
              <span className="truncate max-w-[160px] text-[#4D423E] uppercase font-medium">
                {categoryName}
              </span>
            </>
          )}

          <ChevronRight className="w-3 h-3 text-[#B8B8B3]" />
          <span className="font-bold text-[#292321] uppercase truncate max-w-[220px]">
            {currentPageTitle}
          </span>
        </nav>
      </div>

      {/* Right side: Quick Direct Home Link */}
      <button
        type="button"
        onClick={() => navigateTo('home')}
        className="text-[11px] font-tech font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm border transition-colors inline-flex items-center gap-1.5 border-[#D8BFA8] bg-[#F3E7DA] hover:bg-[#E9D9C8] text-[#4D423E] hover:text-[#292321]"
        title="Directly return to home page"
      >
        <Home className="w-3 h-3" />
        <span className="hidden sm:inline">Home Page</span>
      </button>
    </div>
  );
};
