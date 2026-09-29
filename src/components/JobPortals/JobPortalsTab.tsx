import React, { useState } from 'react';
import { uaeJobPortals, uaeRecruitmentAgencies } from '../../data/careerData';
import { 
  Building2, 
  ExternalLink, 
  Globe2, 
  Mail, 
  MapPin, 
  Search, 
  Star, 
  Users,
  Compass,
  ArrowUpRight
} from 'lucide-react';

export const JobPortalsTab: React.FC = () => {
  const [agencySearch, setAgencySearch] = useState('');

  const filteredAgencies = uaeRecruitmentAgencies.filter(a => 
    a.name.toLowerCase().includes(agencySearch.toLowerCase()) ||
    a.specialty.toLowerCase().includes(agencySearch.toLowerCase()) ||
    a.location.toLowerCase().includes(agencySearch.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Murdoch Dubai Career Portal Hero Spotlight */}
        <div className="bg-gradient-to-r from-red-950 via-red-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-red-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 relative z-10 max-w-2xl">
            <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 font-bold text-xs uppercase tracking-wider border border-amber-400/30 inline-flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Official University Partner Hub
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Murdoch Dubai Career Portal
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Access exclusive student internships, graduate trainee vacancies, and direct corporate partner opportunities posted specifically for Murdoch University Dubai undergraduate and postgraduate students.
            </p>
          </div>

          <a
            href="https://murdochdubaicareerportal.com/view_jobs"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg transition-transform hover:scale-105 active:scale-95 whitespace-nowrap flex items-center gap-2 relative z-10"
          >
            <span>Browse Murdoch Jobs</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Two-Column Grid: Agencies & Major Job Boards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT: 17 Recruitment Agencies (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  Top Recruitment Agencies in the UAE
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Reputable executive search & recruitment consultancies operating in Dubai and Abu Dhabi.
                </p>
              </div>

              <div className="relative w-full sm:w-48">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={agencySearch}
                  onChange={(e) => setAgencySearch(e.target.value)}
                  placeholder="Filter agencies..."
                  className="w-full text-xs border border-slate-200 rounded-lg pl-8 pr-2.5 py-1.5 outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[580px] overflow-y-auto pr-1">
              {filteredAgencies.map((agency, aIdx) => (
                <a
                  key={aIdx}
                  href={agency.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-50/80 hover:bg-blue-50/70 rounded-xl border border-slate-200/80 hover:border-blue-300 text-slate-800 transition-all flex flex-col justify-between group space-y-2 shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between font-bold text-xs text-slate-900 group-hover:text-blue-900">
                      <span>{agency.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <div className="text-[10px] text-blue-700 font-semibold mt-0.5">
                      {agency.specialty}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-slate-500 pt-1 border-t border-slate-200/60">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span className="truncate">{agency.location}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: Major Job Boards & University Support (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 10 Major UAE Job Portals */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-cyan-600" />
                  Leading UAE Job Boards & Portals
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Major job aggregators and early-career internship engines.
                </p>
              </div>

              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {uaeJobPortals.map((portal, pIdx) => (
                  <a
                    key={pIdx}
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-50/80 hover:bg-cyan-50/60 rounded-xl border border-slate-200/80 hover:border-cyan-300 text-slate-800 transition-all flex items-center justify-between group shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900 group-hover:text-cyan-950">{portal.name}</span>
                        {portal.badge && (
                          <span className="text-[9px] bg-cyan-100 text-cyan-800 font-bold px-1.5 py-0.2 rounded">
                            {portal.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[10.5px] text-slate-500 line-clamp-1 mt-0.5">
                        {portal.tagline}
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 flex-shrink-0 ml-2" />
                  </a>
                ))}
              </div>
            </div>

            {/* University Careers Office Direct Card */}
            <div className="bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl shadow-md border border-blue-800/50 space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
                Direct Student Career Support
              </span>
              <h4 className="text-sm font-bold text-white">
                Murdoch Careers & Employability Support Office
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                Reach out for one-on-one resume reviews, mock interview simulations, LinkedIn profile audits, and career counseling:
              </p>

              <div className="pt-2">
                <a
                  href="mailto:aidai.zhakshylykova@murdoch.edu.au"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs px-3.5 py-2.5 rounded-xl border border-white/20 transition-all font-medium"
                >
                  <Mail className="w-4 h-4 text-amber-300" />
                  <span>aidai.zhakshylykova@murdoch.edu.au</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
