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
  const { goBack, previousPageTitle, canGoBack, navigateTo, themeMode } = useContent();
  const isLight = themeMode === 'light';

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 py-2.5 px-3 sm:px-4 rounded-sm border mb-6 transition-all ${
        isLight
          ? 'bg-white/80 border-slate-200/80 shadow-xs'
          : 'bg-zinc-900/60 border-white/10 shadow-xs'
      } ${className}`}
    >
      {/* Top-Left Back Action Button */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={goBack}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm font-tech text-xs font-bold uppercase tracking-wider transition-all shadow-xs group ${
            isLight
              ? 'bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 border border-slate-900 hover:border-amber-500'
              : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black border border-amber-500'
          }`}
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
          className="hidden md:flex items-center gap-1.5 text-xs font-tech text-slate-500 dark:text-zinc-400"
        >
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors inline-flex items-center gap-1"
            title="Go to Home Page"
          >
            <Home className="w-3 h-3" />
            <span>HOME</span>
          </button>

          {categoryName && (
            <>
              <ChevronRight className="w-3 h-3 text-slate-400 dark:text-zinc-600" />
              <span className="truncate max-w-[160px] text-slate-600 dark:text-zinc-300 uppercase font-medium">
                {categoryName}
              </span>
            </>
          )}

          <ChevronRight className="w-3 h-3 text-slate-400 dark:text-zinc-600" />
          <span className="font-bold text-slate-900 dark:text-white uppercase truncate max-w-[220px]">
            {currentPageTitle}
          </span>
        </nav>
      </div>

      {/* Right side: Quick Direct Home Link if user explicitly wants home */}
      <button
        type="button"
        onClick={() => navigateTo('home')}
        className={`text-[11px] font-tech font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm border transition-colors inline-flex items-center gap-1.5 ${
          isLight
            ? 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
            : 'border-white/10 bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-white'
        }`}
        title="Directly return to home page"
      >
        <Home className="w-3 h-3" />
        <span className="hidden sm:inline">Home Page</span>
      </button>
    </div>
  );
};
