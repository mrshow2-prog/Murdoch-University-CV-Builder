import React, { useState } from 'react';
import { degreePathways } from '../../data/careerData';
import { 
  GraduationCap, 
  Briefcase, 
  Wrench, 
  HeartHandshake, 
  Copy, 
  Plus, 
  Check, 
  BookOpen,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface CareerPathwaysTabProps {
  onCopyText: (text: string) => void;
  onAddSkillToCV?: (skill: string) => void;
}

export const CareerPathwaysTab: React.FC<CareerPathwaysTabProps> = ({ 
  onCopyText,
  onAddSkillToCV 
}) => {
  const [selectedDegreeId, setSelectedDegreeId] = useState<string>(degreePathways[0].id);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [addedSkill, setAddedSkill] = useState<string | null>(null);

  const currentDegree = degreePathways.find(d => d.id === selectedDegreeId) || degreePathways[0];

  const handleCopy = (text: string) => {
    onCopyText(text);
    setCopiedItem(text);
    setTimeout(() => setCopiedItem(null), 1500);
  };

  const handleAddSkill = (skill: string) => {
    if (onAddSkillToCV) {
      onAddSkillToCV(skill);
      setAddedSkill(skill);
      setTimeout(() => setAddedSkill(null), 1500);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header & Program Selector Card */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-200 space-y-5">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 font-bold text-xs uppercase tracking-wider border border-blue-200">
                <GraduationCap className="w-4 h-4 text-blue-600" /> Academic & UAE Industry Alignment
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Career Pathways & Core Skills by Degree
              </h2>
              <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                Explore target job roles and ATS-ready technical and soft skills curated specifically for Murdoch University Dubai academic programs.
              </p>
            </div>

            {/* Degree Dropdown Selector */}
            <div className="w-full lg:w-[420px]">
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Select Murdoch Degree Program
              </label>
              <select
                value={selectedDegreeId}
                onChange={(e) => setSelectedDegreeId(e.target.value)}
                className="w-full text-xs font-bold border-2 border-blue-600 rounded-xl p-3 bg-blue-50/70 text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer shadow-sm transition-all"
              >
                {degreePathways.map((d) => (
                  <option key={d.id} value={d.id} className="font-semibold text-slate-800 py-1">
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Program Overview Banner */}
          {currentDegree.overview && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50/70 p-4 rounded-2xl border border-blue-100/80 flex items-start gap-3 text-xs text-slate-700">
              <BookOpen className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-blue-950 font-bold block mb-0.5">{currentDegree.name} ({currentDegree.faculty})</strong>
                <p className="leading-relaxed text-slate-600">{currentDegree.overview}</p>
              </div>
            </div>
          )}
        </div>

        {/* 1. Target Roles & Career Pathways */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                Target Roles & Industry Domains ({currentDegree.roles.length} Disciplines)
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">Click role to copy title</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentDegree.roles.map((r, rIdx) => (
              <div 
                key={rIdx}
                className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/30 transition-all space-y-2.5"
              >
                <div className="font-bold text-xs text-blue-900 flex items-center justify-between border-b border-slate-200/60 pb-1.5">
                  <span>{r.domain}</span>
                  <span className="text-[10px] text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full font-bold">
                    {r.titles.length} Roles
                  </span>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-700">
                  {r.titles.map((title, tIdx) => {
                    const isCopied = copiedItem === title;
                    return (
                      <li key={tIdx}>
                        <button
                          type="button"
                          onClick={() => handleCopy(title)}
                          className={`w-full text-left p-1.5 rounded-lg transition-all flex items-start gap-1.5 group ${
                            isCopied ? 'bg-emerald-100 text-emerald-900 font-bold' : 'hover:bg-white text-slate-700 hover:text-blue-900'
                          }`}
                          title="Click to copy role title"
                        >
                          <span className="text-blue-500 font-bold text-xs mt-0.5">•</span>
                          <span className="flex-1 leading-snug">{title}</span>
                          {isCopied && <Check className="w-3 h-3 text-emerald-600 flex-shrink-0 mt-0.5" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Skills Grid (Technical & Soft) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Technical Skills */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-indigo-600" />
                  <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                    Core Technical & Tool Skills
                  </h3>
                </div>
                <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-bold">
                  {currentDegree.techSkills.length} Verified
                </span>
              </div>

              <p className="text-[11px] text-slate-500 mt-2 mb-3">
                Directly tested keywords frequently parsed by ATS resume scanners in UAE job descriptions:
              </p>

              <div className="flex flex-wrap gap-2">
                {currentDegree.techSkills.map((skill, sIdx) => {
                  const isCopied = copiedItem === skill;
                  const isAdded = addedSkill === skill;
                  return (
                    <div 
                      key={sIdx}
                      className="inline-flex items-center bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl overflow-hidden shadow-2xs hover:border-indigo-400 transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => handleCopy(skill)}
                        className="px-3 py-2 font-medium hover:bg-indigo-50 hover:text-indigo-900 transition-colors flex items-center gap-1.5"
                        title="Copy skill to clipboard"
                      >
                        {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : null}
                        <span>{skill}</span>
                      </button>

                      {onAddSkillToCV && (
                        <button
                          type="button"
                          onClick={() => handleAddSkill(skill)}
                          className={`px-2 py-2 border-l border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-indigo-100 transition-colors ${
                            isAdded ? 'bg-emerald-500 text-white border-emerald-500' : ''
                          }`}
                          title="Add this skill to your CV Skills section"
                        >
                          {isAdded ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Tip: Click <strong>+</strong> to append skill to your current CV editor!</span>
            </div>
          </div>

          {/* Soft Competencies */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-emerald-600" />
                  <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                    Key Soft Competencies & Leadership
                  </h3>
                </div>
                <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-bold">
                  {currentDegree.softSkills.length} Verified
                </span>
              </div>

              <p className="text-[11px] text-slate-500 mt-2 mb-3">
                Crucial interpersonal behaviors highly sought by multinational hiring managers in the UAE:
              </p>

              <div className="flex flex-wrap gap-2">
                {currentDegree.softSkills.map((skill, sIdx) => {
                  const isCopied = copiedItem === skill;
                  const isAdded = addedSkill === skill;
                  return (
                    <div 
                      key={sIdx}
                      className="inline-flex items-center bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl overflow-hidden shadow-2xs hover:border-emerald-400 transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => handleCopy(skill)}
                        className="px-3 py-2 font-medium hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-center gap-1.5"
                        title="Copy skill to clipboard"
                      >
                        {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : null}
                        <span>{skill}</span>
                      </button>

                      {onAddSkillToCV && (
                        <button
                          type="button"
                          onClick={() => handleAddSkill(skill)}
                          className={`px-2 py-2 border-l border-slate-200 text-slate-500 hover:text-emerald-600 hover:bg-emerald-100 transition-colors ${
                            isAdded ? 'bg-emerald-500 text-white border-emerald-500' : ''
                          }`}
                          title="Add this skill to your CV Skills section"
                        >
                          {isAdded ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
              <span>Combine these soft competencies with measurable projects in your Experience section.</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
