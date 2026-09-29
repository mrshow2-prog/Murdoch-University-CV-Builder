import React, { useState } from 'react';
import { actionVerbsData } from '../../data/careerData';
import { Search, Zap, Copy, Check, Sparkles, HelpCircle } from 'lucide-react';

interface ActionVerbsTabProps {
  onCopyText: (text: string) => void;
}

export const ActionVerbsTab: React.FC<ActionVerbsTabProps> = ({ onCopyText }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedVerb, setCopiedVerb] = useState<string | null>(null);

  const handleCopy = (verb: string) => {
    onCopyText(verb);
    setCopiedVerb(verb);
    setTimeout(() => setCopiedVerb(null), 1500);
  };

  const filteredCategories = actionVerbsData.map(cat => {
    const matchesSearch = cat.verbs.filter(v => 
      v.toLowerCase().includes(searchTerm.toLowerCase()) || 
      cat.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return {
      ...cat,
      verbs: matchesSearch
    };
  }).filter(cat => cat.verbs.length > 0);

  const totalVerbsCount = actionVerbsData.reduce((acc, cat) => acc + cat.verbs.length, 0);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Hero & Murdoch Formula Card */}
        <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white rounded-3xl p-6 lg:p-8 shadow-xl border border-blue-900/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-wrap justify-between items-start gap-4 relative z-10">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 font-bold text-xs uppercase tracking-wider mb-2 border border-amber-400/30">
                <Zap className="w-3.5 h-3.5" /> Employability Action Toolkit
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
                High-Impact Action Verbs Directory
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                Transform passive job duties into quantifiable achievement statements using the official Murdoch Dubai formula: begin with a decisive action verb, state your operational context, and prove measurable impact.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center shadow-inner">
              <div className="text-[11px] text-amber-200 uppercase tracking-wider font-semibold">Murdoch Impact Formula</div>
              <div className="text-base font-extrabold text-amber-300 mt-0.5">
                Action Verb + Context + Result
              </div>
              <div className="text-[10px] text-slate-300 mt-1">
                {totalVerbsCount}+ ATS-Proven Action Verbs
              </div>
            </div>
          </div>

          {/* Formula Comparison Grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs relative z-10">
            <div className="bg-red-950/40 border border-red-500/30 rounded-2xl p-4">
              <div className="font-bold text-red-300 uppercase tracking-wider text-[10px] mb-1.5 flex items-center gap-1">
                <span>❌</span> Weak (Passive Duty)
              </div>
              <p className="text-slate-300 italic">"Responsible for customer service and answering client emails."</p>
            </div>

            <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-4">
              <div className="font-bold text-amber-300 uppercase tracking-wider text-[10px] mb-1.5 flex items-center gap-1">
                <span>⚡</span> Strong (Action-Oriented)
              </div>
              <p className="text-slate-300">"Resolved client inquiries efficiently to maintain high customer satisfaction standards."</p>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-4 shadow-sm">
              <div className="font-bold text-emerald-300 uppercase tracking-wider text-[10px] mb-1.5 flex items-center gap-1">
                <span>⭐</span> Murdoch Gold Standard (Quantified)
              </div>
              <p className="text-emerald-100 font-medium leading-relaxed">
                "Streamlined inquiry resolution protocols across 200+ monthly client tickets, boosting customer satisfaction scores by 18%."
              </p>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search verbs (e.g. Streamlined, Engineered, Spearheaded)..."
              className="w-full text-xs font-medium border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50/50"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span>Click any verb to <strong className="text-blue-700 font-bold">copy instantly</strong> to clipboard</span>
          </div>
        </div>

        {/* Categorized Verbs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredCategories.map((cat, idx) => (
            <div 
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div>
                    <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                      {cat.category}
                    </h3>
                    {cat.description && (
                      <p className="text-[11px] text-slate-500 mt-0.5">{cat.description}</p>
                    )}
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                    {cat.verbs.length}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3">
                  {cat.verbs.map((verb) => {
                    const isCopied = copiedVerb === verb;
                    return (
                      <button
                        key={verb}
                        type="button"
                        onClick={() => handleCopy(verb)}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-all flex items-center gap-1 ${
                          isCopied
                            ? 'bg-emerald-600 text-white border-emerald-600 scale-105 shadow-sm'
                            : 'bg-slate-50 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300 text-slate-700 border-slate-200 shadow-2xs active:scale-95'
                        }`}
                        title="Click to copy"
                      >
                        {isCopied ? <Check className="w-3 h-3" /> : null}
                        <span>{verb}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-sm font-bold text-slate-700">No action verbs matched "{searchTerm}"</p>
            <p className="text-xs text-slate-500 mt-1">Try searching for keywords like "manage", "analyze", "create", or "solve".</p>
          </div>
        )}

      </div>
    </div>
  );
};
