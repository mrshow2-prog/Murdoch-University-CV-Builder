import React from 'react';
import { AppTab } from '../types';
import { MurdochLogo } from './MurdochLogo';
import { 
  FileDown, 
  FolderOpen, 
  FileText, 
  Printer, 
  Sparkles,
  SlidersHorizontal,
  Zap,
  Compass,
  Camera,
  Globe2,
  GraduationCap,
  ShieldCheck,
  Users
} from 'lucide-react';

interface HeaderProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  onLoadClick: () => void;
  onSaveClick: () => void;
  onPdfExport: () => void;
  onPrintPdf: () => void;
  studentEmail: string | null;
  isAdmin: boolean;
  onOpenAuthModal: () => void;
  onOpenAdminHub: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onLoadClick,
  onSaveClick,
  onPdfExport,
  onPrintPdf,
  studentEmail,
  isAdmin,
  onOpenAuthModal,
  onOpenAdminHub
}) => {
  return (
    <header className="text-white z-50 flex-shrink-0 no-print header-bg shadow-md border-b border-red-900">
      {/* Top Banner Row */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-2.5 flex flex-wrap justify-between items-center gap-3">
        {/* Brand & Office Title */}
        <div className="flex items-center gap-3">
          <MurdochLogo className="h-8 sm:h-9" variant="white" />
          <div className="h-6 w-[1px] bg-white/30 hidden md:block"></div>
          <div className="hidden md:block">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Careers & Employability Office
            </div>
            <div className="text-[10px] text-white/80">
              Ngala kwop biddi. Building a brighter future, together.
            </div>
          </div>
        </div>

        {/* Student Sign In / Admin Hub & Export Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* If Admin is logged in, show Admin Hub button */}
          {isAdmin && (
            <button
              onClick={onOpenAdminHub}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold py-1.5 px-3 rounded shadow transition flex items-center gap-1.5 border border-amber-200"
              title="Open Student Management Dashboard"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Student CV Directory</span>
            </button>
          )}

          {/* Student/Admin Account Status Button */}
          <button
            onClick={onOpenAuthModal}
            className={`text-xs font-bold py-1.5 px-3.5 rounded shadow transition flex items-center gap-1.5 border ${
              isAdmin
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-300'
                : studentEmail 
                  ? 'bg-emerald-700 hover:bg-emerald-600 text-white border-emerald-500' 
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 border-amber-300'
            }`}
            title={isAdmin ? "Logged in as Staff Administrator" : studentEmail ? `Signed in as ${studentEmail}` : "Sign in with @student.murdoch.edu.au email"}
          >
            {isAdmin ? <ShieldCheck className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
            <span>
              {isAdmin 
                ? 'Careers Admin' 
                : studentEmail 
                  ? studentEmail.split('@')[0] 
                  : 'Student Sign In'}
            </span>
          </button>

          <div className="h-5 w-[1px] bg-white/25 mx-1 hidden sm:block"></div>

          <button
            onClick={onLoadClick}
            className="bg-slate-700/90 hover:bg-slate-600 text-white text-xs font-semibold py-1.5 px-3 rounded shadow transition flex items-center gap-1.5"
            title="Load saved .cv draft file"
          >
            <span>📂</span>
            <span className="hidden sm:inline">Load (.cv)</span>
          </button>

          <button
            onClick={onSaveClick}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-1.5 px-3 rounded shadow transition flex items-center gap-1.5"
            title="Save draft to .cv file"
          >
            <span>💾</span>
            <span className="hidden sm:inline">Save (.cv)</span>
          </button>

          <button
            onClick={onPrintPdf}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold py-1.5 px-3.5 rounded shadow transition flex items-center gap-1.5 border border-amber-300"
            title="Print to PDF"
          >
            <span>🖨️</span>
            <span>Print to PDF</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar matching exact original styling */}
      <nav className="bg-slate-900/90 backdrop-blur-sm border-t border-white/10 px-4 lg:px-6 flex overflow-x-auto text-xs font-medium">
        <button
          onClick={() => onTabChange('builder')}
          className={`nav-tab px-4 py-2.5 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'builder' ? 'active' : 'text-white/80 hover:text-white'
          }`}
        >
          <span>🛠️</span>
          <span>CV Builder & Editor</span>
        </button>

        <button
          onClick={() => onTabChange('verbs')}
          className={`nav-tab px-4 py-2.5 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'verbs' ? 'active' : 'text-white/80 hover:text-white'
          }`}
        >
          <span>⚡</span>
          <span>Action Verbs Directory</span>
        </button>

        <button
          onClick={() => onTabChange('career')}
          className={`nav-tab px-4 py-2.5 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'career' ? 'active' : 'text-white/80 hover:text-white'
          }`}
        >
          <span>🎯</span>
          <span>Career Pathways & Degree Skills</span>
        </button>

        <button
          onClick={() => onTabChange('photo')}
          className={`nav-tab px-4 py-2.5 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'photo' ? 'active' : 'text-white/80 hover:text-white'
          }`}
        >
          <span>📸</span>
          <span>CV Photo Guide</span>
        </button>

        <button
          onClick={() => onTabChange('portals')}
          className={`nav-tab px-4 py-2.5 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'portals' ? 'active' : 'text-white/80 hover:text-white'
          }`}
        >
          <span>🌐</span>
          <span>UAE Job Portals & Agencies</span>
        </button>
      </nav>
    </header>
  );
};
