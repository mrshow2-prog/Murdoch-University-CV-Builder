import React, { useState } from 'react';
import { CVData, CVSection, PhotoShape, TemplateType } from '../../types';
import { accentColors } from '../../data/careerData';
import { 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  User, 
  Palette, 
  Layout, 
  Sparkles,
  Info,
  Check
} from 'lucide-react';

interface CVEditorProps {
  cvData: CVData;
  onChange: (updated: CVData) => void;
  currentTemplate: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
  accentColor: string;
  onColorChange: (hex: string) => void;
  photoDataUrl: string;
  onPhotoUpload: (file: File) => void;
  onRemovePhoto: () => void;
}

export const CVEditor: React.FC<CVEditorProps> = ({
  cvData,
  onChange,
  currentTemplate,
  onTemplateChange,
  accentColor,
  onColorChange,
  photoDataUrl,
  onPhotoUpload,
  onRemovePhoto
}) => {
  const [headerCollapsed, setHeaderCollapsed] = useState(false);
  const [newTagInputs, setNewTagInputs] = useState<Record<number, string>>({});

  const updateField = <K extends keyof CVData>(key: K, value: CVData[K]) => {
    onChange({ ...cvData, [key]: value });
  };

  const updateSection = (index: number, updatedSec: Partial<CVSection>) => {
    const updatedSections = [...cvData.sections];
    updatedSections[index] = { ...updatedSections[index], ...updatedSec };
    onChange({ ...cvData, sections: updatedSections });
  };

  const toggleSectionCollapse = (index: number) => {
    updateSection(index, { collapsed: !cvData.sections[index].collapsed });
  };

  const toggleSectionVisibility = (index: number) => {
    updateSection(index, { visible: !cvData.sections[index].visible });
  };

  const moveSection = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= cvData.sections.length) return;
    const updated = [...cvData.sections];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange({ ...cvData, sections: updated });
  };

  // Add custom section
  const addCustomSection = () => {
    const newSec: CVSection = {
      id: `custom_${Date.now()}`,
      type: 'bullets',
      title: 'Additional Section',
      visible: true,
      collapsed: false,
      bullets: ['Describe your project, extracurricular, or leadership milestone...']
    };
    onChange({ ...cvData, sections: [...cvData.sections, newSec] });
  };

  // Tag Handlers
  const handleAddTag = (secIndex: number) => {
    const val = (newTagInputs[secIndex] || '').trim();
    if (!val) return;
    const sec = cvData.sections[secIndex];
    const tags = sec.tags ? [...sec.tags, val] : [val];
    updateSection(secIndex, { tags });
    setNewTagInputs({ ...newTagInputs, [secIndex]: '' });
  };

  const handleRemoveTag = (secIndex: number, tagIndex: number) => {
    const sec = cvData.sections[secIndex];
    if (!sec.tags) return;
    const tags = sec.tags.filter((_, i) => i !== tagIndex);
    updateSection(secIndex, { tags });
  };

  return (
    <div className="left-panel w-full h-full overflow-y-auto bg-white border-r border-slate-200 p-5 lg:p-7 space-y-5 pb-24 shadow-[4px_0_24px_rgba(0,0,0,0.05)] z-10">
      
      {/* 1. Template & Palette Card */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layout className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Format & Visual Palette</h2>
          </div>
          <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full border border-blue-100">
            ATS Standard
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">CV Format Template</label>
            <select
              value={currentTemplate}
              onChange={(e) => onTemplateChange(e.target.value as TemplateType)}
              className="w-full text-xs font-semibold border border-slate-300 rounded-lg p-2.5 bg-slate-50/50 hover:bg-white focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-slate-800 cursor-pointer shadow-sm transition-all"
            >
              <option value="entry">1. Entry Level CV (Fresh Undergrads & Grads)</option>
              <option value="chronological">2. Chronological CV (Experienced / Postgrads)</option>
              <option value="skills">3. Skills-Based CV (Career Change / Technical)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-2">Accent Color Palette</label>
            <div className="flex items-center gap-4">
              {[
                { name: 'Executive Navy', hex: '#1B365D', bg: 'bg-[#1B365D]' },
                { name: 'Slate Teal', hex: '#134E4A', bg: 'bg-[#134E4A]' },
                { name: 'Deep Purple', hex: '#4C1D95', bg: 'bg-[#4C1D95]' },
                { name: 'Charcoal', hex: '#333333', bg: 'bg-[#333333]' },
                { name: 'Burgundy', hex: '#800020', bg: 'bg-[#800020]' },
              ].map((color) => {
                const isSelected = accentColor.toLowerCase() === color.hex.toLowerCase();
                return (
                  <label key={color.hex} className="cursor-pointer relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="colorPalette"
                      value={color.hex}
                      checked={isSelected}
                      onChange={() => onColorChange(color.hex)}
                      className="hidden"
                    />
                    <div
                      className={`w-6 h-6 rounded-full transition-transform duration-200 ${color.bg} ${
                        isSelected ? 'scale-125 ring-2 ring-offset-2 ring-slate-800 shadow-md' : 'hover:scale-110 opacity-90'
                      }`}
                      title={color.name}
                    />
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Header & Contact Information Card */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div 
          onClick={() => setHeaderCollapsed(!headerCollapsed)} 
          className="p-3.5 bg-slate-100/80 hover:bg-slate-100 flex justify-between items-center cursor-pointer select-none border-b border-slate-200 transition-colors"
        >
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-slate-700" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Header & Contact Details</h3>
          </div>
          <span className="text-slate-500 hover:text-slate-800 transition-transform">
            {headerCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </span>
        </div>

        {!headerCollapsed && (
          <div className="p-4 space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  value={cvData.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  placeholder="e.g. Sarah Ahmed"
                  className="w-full text-sm font-bold border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Professional Headline / Degree Title</label>
                <input
                  type="text"
                  value={cvData.headline}
                  onChange={(e) => updateField('headline', e.target.value)}
                  placeholder="e.g. Marketing & Communications Graduate | Murdoch University Dubai"
                  className="w-full text-xs font-semibold border border-slate-300 rounded-lg p-2 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Phone (UAE Standard)</label>
                <input
                  type="text"
                  value={cvData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+971 50 123 4567"
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">University / Professional Email</label>
                <input
                  type="email"
                  value={cvData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="Sarah.Ahmed@murdoch.edu.au"
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Location</label>
                <input
                  type="text"
                  value={cvData.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  placeholder="Dubai, UAE"
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">LinkedIn Profile</label>
                <input
                  type="text"
                  value={cvData.linkedin}
                  onChange={(e) => updateField('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/sarahahmed"
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Profile Photo Toggle & Uploader */}
            <div className="pt-3 border-t border-slate-200 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={cvData.showPhoto}
                    onChange={(e) => updateField('showPhoto', e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                  />
                  <span>Include Professional Headshot (Top-Right)</span>
                </label>

                {cvData.showPhoto && (
                  <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="photoShape"
                        value="circle"
                        checked={cvData.photoShape === 'circle'}
                        onChange={() => updateField('photoShape', 'circle')}
                        className="text-blue-600"
                      />
                      <span>Circle</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="photoShape"
                        value="square"
                        checked={cvData.photoShape === 'square'}
                        onChange={() => updateField('photoShape', 'square')}
                        className="text-blue-600"
                      />
                      <span>Square</span>
                    </label>
                  </div>
                )}
              </div>

              {cvData.showPhoto && (
                <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onPhotoUpload(file);
                    }}
                    className="text-xs text-slate-600 file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer flex-1"
                  />
                  {photoDataUrl && (
                    <button
                      type="button"
                      onClick={onRemovePhoto}
                      className="text-xs text-red-600 hover:text-red-700 font-bold px-2 py-1 bg-red-50 rounded border border-red-200 hover:bg-red-100"
                    >
                      Remove
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3. Dynamic Sections Container */}
      <div className="space-y-4">
        {cvData.sections.map((sec, secIdx) => {
          const isCollapsed = Boolean(sec.collapsed);

          return (
            <div 
              key={sec.id || secIdx} 
              className={`bg-white rounded-xl border transition-all ${
                sec.visible ? 'border-slate-200 shadow-sm' : 'border-slate-200/60 opacity-60 bg-slate-50'
              }`}
            >
              {/* Section Header Row */}
              <div className="p-3 bg-slate-100/90 flex items-center justify-between gap-2 border-b border-slate-200">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <input
                    type="text"
                    value={sec.title}
                    onChange={(e) => updateSection(secIdx, { title: e.target.value })}
                    className="text-xs font-bold text-slate-800 bg-transparent border-b border-transparent focus:border-blue-500 focus:bg-white rounded px-1 outline-none truncate w-full"
                    placeholder="Section Title"
                  />
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleSectionVisibility(secIdx)}
                    className={`p-1 rounded text-xs flex items-center gap-1 font-semibold transition-colors ${
                      sec.visible ? 'text-blue-600 hover:bg-blue-50' : 'text-slate-400 hover:bg-slate-200'
                    }`}
                    title={sec.visible ? 'Visible in CV' : 'Hidden from CV'}
                  >
                    {sec.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>

                  <div className="flex rounded border border-slate-300 bg-white overflow-hidden shadow-2xs">
                    <button
                      type="button"
                      disabled={secIdx === 0}
                      onClick={() => moveSection(secIdx, -1)}
                      className="p-1 hover:bg-slate-100 disabled:opacity-30 text-slate-700 border-r border-slate-200"
                      title="Move Section Up"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      disabled={secIdx === cvData.sections.length - 1}
                      onClick={() => moveSection(secIdx, 1)}
                      className="p-1 hover:bg-slate-100 disabled:opacity-30 text-slate-700"
                      title="Move Section Down"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleSectionCollapse(secIdx)}
                    className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded"
                  >
                    {isCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Section Body */}
              {!isCollapsed && (
                <div className="p-4 space-y-3 bg-slate-50/50">
                  
                  {/* TEXT TYPE (e.g. Summary) */}
                  {sec.type === 'text' && (
                    <div className="space-y-1.5">
                      <textarea
                        rows={4}
                        value={sec.text || ''}
                        onChange={(e) => updateSection(secIdx, { text: e.target.value })}
                        placeholder="Write your professional summary..."
                        className="w-full text-xs leading-relaxed border border-slate-300 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  )}

                  {/* EDUCATION TYPE */}
                  {sec.type === 'education' && (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-4 text-[11px] text-slate-700 font-semibold bg-white p-2 rounded-lg border border-slate-200">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={Boolean(sec.showModules)}
                            onChange={(e) => updateSection(secIdx, { showModules: e.target.checked })}
                            className="w-3.5 h-3.5 rounded text-blue-600"
                          />
                          <span>Show Relevant Coursework / Modules</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={Boolean(sec.showAwards)}
                            onChange={(e) => updateSection(secIdx, { showAwards: e.target.checked })}
                            className="w-3.5 h-3.5 rounded text-blue-600"
                          />
                          <span>Show Academic Awards / Scholarships</span>
                        </label>
                      </div>

                      {(sec.items || []).map((item, itemIdx) => (
                        <div key={item.id || itemIdx} className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2.5 shadow-2xs">
                          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                            <span className="font-bold text-[11px] text-blue-900 uppercase tracking-wide">
                              Degree #{itemIdx + 1}
                            </span>
                            {(sec.items || []).length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedItems = sec.items?.filter((_, i) => i !== itemIdx);
                                  updateSection(secIdx, { items: updatedItems });
                                }}
                                className="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1"
                              >
                                <Trash2 className="w-3 h-3" /> Remove
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="sm:col-span-2">
                              <input
                                type="text"
                                value={item.degree}
                                onChange={(e) => {
                                  const updated = [...(sec.items || [])];
                                  updated[itemIdx].degree = e.target.value;
                                  updateSection(secIdx, { items: updated });
                                }}
                                placeholder="Degree Title (e.g. Bachelor of Business in Marketing)"
                                className="w-full text-xs font-bold border border-slate-300 rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none"
                              />
                            </div>
                            <input
                              type="text"
                              value={item.uni}
                              onChange={(e) => {
                                const updated = [...(sec.items || [])];
                                updated[itemIdx].uni = e.target.value;
                                updateSection(secIdx, { items: updated });
                              }}
                              placeholder="University (e.g. Murdoch University Dubai)"
                              className="text-xs border border-slate-300 rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none"
                            />
                            <input
                              type="text"
                              value={item.location}
                              onChange={(e) => {
                                const updated = [...(sec.items || [])];
                                updated[itemIdx].location = e.target.value;
                                updateSection(secIdx, { items: updated });
                              }}
                              placeholder="Location (e.g. Dubai, UAE)"
                              className="text-xs border border-slate-300 rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none"
                            />
                            <input
                              type="text"
                              value={item.dates}
                              onChange={(e) => {
                                const updated = [...(sec.items || [])];
                                updated[itemIdx].dates = e.target.value;
                                updateSection(secIdx, { items: updated });
                              }}
                              placeholder="Dates (e.g. 2022 – 2025)"
                              className="text-xs border border-slate-300 rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none"
                            />
                            <input
                              type="text"
                              value={item.grade || ''}
                              onChange={(e) => {
                                const updated = [...(sec.items || [])];
                                updated[itemIdx].grade = e.target.value;
                                updateSection(secIdx, { items: updated });
                              }}
                              placeholder="Grade / Distinction / GPA"
                              className="text-xs border border-slate-300 rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none"
                            />
                          </div>

                          {sec.showModules && (
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Relevant Coursework</label>
                              <input
                                type="text"
                                value={item.modules || ''}
                                onChange={(e) => {
                                  const updated = [...(sec.items || [])];
                                  updated[itemIdx].modules = e.target.value;
                                  updateSection(secIdx, { items: updated });
                                }}
                                placeholder="e.g. Digital Marketing, Consumer Analytics, Campaign Strategy"
                                className="w-full text-xs border border-slate-300 rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none"
                              />
                            </div>
                          )}

                          {sec.showAwards && (
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Academic Honors & Scholarships</label>
                              <input
                                type="text"
                                value={item.awards || ''}
                                onChange={(e) => {
                                  const updated = [...(sec.items || [])];
                                  updated[itemIdx].awards = e.target.value;
                                  updateSection(secIdx, { items: updated });
                                }}
                                placeholder="e.g. Academic Excellence Scholarship, Dean's List"
                                className="w-full text-xs border border-slate-300 rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none"
                              />
                            </div>
                          )}
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => {
                          const newItem = {
                            id: `edu_${Date.now()}`,
                            degree: 'Degree Title',
                            uni: 'Murdoch University Dubai',
                            location: 'Dubai, UAE',
                            dates: '2024 – Present',
                            grade: 'High Distinction',
                            modules: '',
                            awards: ''
                          };
                          updateSection(secIdx, { items: [...(sec.items || []), newItem] });
                        }}
                        className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg border border-blue-200 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Another Degree Entry
                      </button>
                    </div>
                  )}

                  {/* EXPERIENCE TYPE */}
                  {sec.type === 'experience' && (
                    <div className="space-y-3.5">
                      {(sec.items || []).map((item, itemIdx) => (
                        <div key={item.id || itemIdx} className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-3 shadow-2xs">
                          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                            <span className="font-bold text-[11px] text-blue-900 uppercase tracking-wide">
                              Role #{itemIdx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const updatedItems = sec.items?.filter((_, i) => i !== itemIdx);
                                updateSection(secIdx, { items: updatedItems });
                              }}
                              className="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1"
                            >
                              <Trash2 className="w-3 h-3" /> Remove Position
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => {
                                const updated = [...(sec.items || [])];
                                updated[itemIdx].title = e.target.value;
                                updateSection(secIdx, { items: updated });
                              }}
                              placeholder="Job / Role Title (e.g. Social Media Intern)"
                              className="text-xs font-bold border border-slate-300 rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none"
                            />
                            <input
                              type="text"
                              value={item.company}
                              onChange={(e) => {
                                const updated = [...(sec.items || [])];
                                updated[itemIdx].company = e.target.value;
                                updateSection(secIdx, { items: updated });
                              }}
                              placeholder="Company / Organization Name"
                              className="text-xs border border-slate-300 rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none"
                            />
                            <input
                              type="text"
                              value={item.country}
                              onChange={(e) => {
                                const updated = [...(sec.items || [])];
                                updated[itemIdx].country = e.target.value;
                                updateSection(secIdx, { items: updated });
                              }}
                              placeholder="Location (e.g. Dubai, UAE)"
                              className="text-xs border border-slate-300 rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none"
                            />
                            <input
                              type="text"
                              value={item.dates}
                              onChange={(e) => {
                                const updated = [...(sec.items || [])];
                                updated[itemIdx].dates = e.target.value;
                                updateSection(secIdx, { items: updated });
                              }}
                              placeholder="Dates (e.g. Jan 2024 – Jun 2024)"
                              className="text-xs border border-slate-300 rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none"
                            />
                          </div>

                          {/* Bullets List */}
                          <div className="space-y-2 pt-2 border-t border-slate-100">
                            <div className="text-[10px] font-bold text-slate-500 uppercase">
                              Bullet Points:
                            </div>

                            {(item.bullets || []).map((bullet: string, bIdx: number) => (
                              <div key={bIdx} className="flex items-start gap-2">
                                <span className="text-blue-500 mt-2 text-xs font-black">•</span>
                                <textarea
                                  rows={2}
                                  value={bullet}
                                  onChange={(e) => {
                                    const updated = [...(sec.items || [])];
                                    updated[itemIdx].bullets[bIdx] = e.target.value;
                                    updateSection(secIdx, { items: updated });
                                  }}
                                  placeholder="Action Verb + Operational Context + Quantifiable Result..."
                                  className="w-full text-xs border border-slate-300 rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = [...(sec.items || [])];
                                    updated[itemIdx].bullets = updated[itemIdx].bullets.filter((_: any, i: number) => i !== bIdx);
                                    updateSection(secIdx, { items: updated });
                                  }}
                                  className="p-1 text-slate-400 hover:text-red-500 mt-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}

                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...(sec.items || [])];
                                updated[itemIdx].bullets.push('Spearheaded [task/project], optimizing [process] and boosting [metric] by [X]%.');
                                updateSection(secIdx, { items: updated });
                              }}
                              className="text-[11px] text-blue-600 hover:text-blue-800 font-bold bg-blue-50 px-2.5 py-1 rounded border border-blue-100 flex items-center gap-1 transition-colors"
                            >
                              <Plus className="w-3 h-3" /> Add Bullet Point
                            </button>
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => {
                          const newItem = {
                            id: `exp_${Date.now()}`,
                            title: 'New Position Title',
                            company: 'Company Name',
                            country: 'Dubai, UAE',
                            dates: '2024 – Present',
                            bullets: ['Spearheaded key initiatives to enhance team performance and deliver project milestones on schedule.']
                          };
                          updateSection(secIdx, { items: [...(sec.items || []), newItem] });
                        }}
                        className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg border border-blue-200 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Experience Entry
                      </button>
                    </div>
                  )}

                  {/* PROJECTS & COMPETENCY BLOCKS */}
                  {(sec.type === 'projects' || sec.type === 'competency_blocks') && (
                    <div className="space-y-3">
                      {(sec.items || []).map((item, itemIdx) => (
                        <div key={item.id || itemIdx} className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2.5 shadow-2xs">
                          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                            <span className="font-bold text-[11px] text-blue-900 uppercase tracking-wide">
                              {sec.type === 'projects' ? 'Project' : 'Competency Block'} #{itemIdx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const updatedItems = sec.items?.filter((_, i) => i !== itemIdx);
                                updateSection(secIdx, { items: updatedItems });
                              }}
                              className="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1"
                            >
                              <Trash2 className="w-3 h-3" /> Remove
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => {
                                const updated = [...(sec.items || [])];
                                updated[itemIdx].title = e.target.value;
                                updateSection(secIdx, { items: updated });
                              }}
                              placeholder="Title (e.g. Capstone Project or UI/UX Design)"
                              className="text-xs font-bold border border-slate-300 rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none"
                            />
                            <input
                              type="text"
                              value={item.dates || ''}
                              onChange={(e) => {
                                const updated = [...(sec.items || [])];
                                updated[itemIdx].dates = e.target.value;
                                updateSection(secIdx, { items: updated });
                              }}
                              placeholder="Dates / Year (e.g. 2024)"
                              className="text-xs border border-slate-300 rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none"
                            />
                          </div>

                          {/* Bullets */}
                          <div className="space-y-2 pt-2 border-t border-slate-100">
                            {(item.bullets || []).map((bullet: string, bIdx: number) => (
                              <div key={bIdx} className="flex items-start gap-2">
                                <span className="text-blue-500 mt-2 text-xs font-black">•</span>
                                <textarea
                                  rows={2}
                                  value={bullet}
                                  onChange={(e) => {
                                    const updated = [...(sec.items || [])];
                                    updated[itemIdx].bullets[bIdx] = e.target.value;
                                    updateSection(secIdx, { items: updated });
                                  }}
                                  placeholder="Key methodology, tools used, and quantifiable outcome..."
                                  className="w-full text-xs border border-slate-300 rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = [...(sec.items || [])];
                                    updated[itemIdx].bullets = updated[itemIdx].bullets.filter((_: any, i: number) => i !== bIdx);
                                    updateSection(secIdx, { items: updated });
                                  }}
                                  className="p-1 text-slate-400 hover:text-red-500 mt-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}

                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...(sec.items || [])];
                                updated[itemIdx].bullets.push('Developed [deliverable] leveraging [tool/framework], yielding [key outcome].');
                                updateSection(secIdx, { items: updated });
                              }}
                              className="text-[11px] text-blue-600 hover:text-blue-800 font-bold bg-blue-50 px-2.5 py-1 rounded border border-blue-100 flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" /> Add Bullet Point
                            </button>
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => {
                          const newItem = {
                            id: `proj_${Date.now()}`,
                            title: 'New Project Title',
                            dates: '2024',
                            bullets: ['Executed comprehensive research, design, and implementation resulting in high evaluation marks.']
                          };
                          updateSection(secIdx, { items: [...(sec.items || []), newItem] });
                        }}
                        className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg border border-blue-200 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add {sec.type === 'projects' ? 'Project' : 'Competency'} Entry
                      </button>
                    </div>
                  )}

                  {/* CERT_LIST TYPE */}
                  {sec.type === 'cert_list' && (
                    <div className="space-y-2.5">
                      {(sec.items || []).map((c, cIdx) => (
                        <div key={c.id || cIdx} className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                          <input
                            type="text"
                            value={c.title}
                            onChange={(e) => {
                              const updated = [...(sec.items || [])];
                              updated[cIdx].title = e.target.value;
                              updateSection(secIdx, { items: updated });
                            }}
                            placeholder="Certificate Name / Issuer"
                            className="flex-1 text-xs border border-slate-300 rounded p-1.5 focus:ring-1 focus:ring-blue-500 outline-none"
                          />
                          <input
                            type="text"
                            value={c.dates || ''}
                            onChange={(e) => {
                              const updated = [...(sec.items || [])];
                              updated[cIdx].dates = e.target.value;
                              updateSection(secIdx, { items: updated });
                            }}
                            placeholder="Year (e.g. 2024)"
                            className="w-28 text-xs border border-slate-300 rounded p-1.5 focus:ring-1 focus:ring-blue-500 outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = sec.items?.filter((_, i) => i !== cIdx);
                              updateSection(secIdx, { items: updated });
                            }}
                            className="p-1 text-slate-400 hover:text-red-500"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => {
                          const newItem = { id: `c_${Date.now()}`, title: 'New Certificate', dates: '2024' };
                          updateSection(secIdx, { items: [...(sec.items || []), newItem] });
                        }}
                        className="text-[11px] text-blue-600 hover:text-blue-800 font-bold bg-blue-50 px-3 py-1.5 rounded border border-blue-100 flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Certificate
                      </button>
                    </div>
                  )}

                  {/* TAGS TYPE (Skills, Languages) */}
                  {sec.type === 'tags' && (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newTagInputs[secIdx] || ''}
                          onChange={(e) => setNewTagInputs({ ...newTagInputs, [secIdx]: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddTag(secIdx);
                            }
                          }}
                          placeholder="Type item & press Enter (e.g. Python, SEO, Arabic)..."
                          className="flex-1 text-xs border border-slate-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none shadow-2xs"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddTag(secIdx)}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-lg font-bold transition-colors shadow-sm"
                        >
                          Add
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {(sec.tags || []).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center gap-1.5 bg-white border border-slate-300 text-slate-700 text-xs font-medium px-3 py-1 rounded-full shadow-2xs group hover:border-slate-400 transition-colors"
                          >
                            <span>{tag}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(secIdx, tIdx)}
                              className="text-slate-400 hover:text-red-500 font-black ml-0.5"
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* BULLETS TYPE (Simple custom bullets) */}
                  {sec.type === 'bullets' && (
                    <div className="space-y-2.5">
                      {(sec.bullets || []).map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2">
                          <span className="text-blue-500 mt-2 text-xs font-black">•</span>
                          <textarea
                            rows={2}
                            value={bullet}
                            onChange={(e) => {
                              const updated = [...(sec.bullets || [])];
                              updated[bIdx] = e.target.value;
                              updateSection(secIdx, { bullets: updated });
                            }}
                            placeholder="Milestone, leadership duty, or accomplishment..."
                            className="w-full text-xs border border-slate-300 rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = sec.bullets?.filter((_, i) => i !== bIdx);
                              updateSection(secIdx, { bullets: updated });
                            }}
                            className="p-1 text-slate-400 hover:text-red-500 mt-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...(sec.bullets || []), 'New accomplishment or leadership responsibility...'];
                          updateSection(secIdx, { bullets: updated });
                        }}
                        className="text-[11px] text-blue-600 hover:text-blue-800 font-bold bg-blue-50 px-3 py-1.5 rounded border border-blue-100 flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Bullet Point
                      </button>
                    </div>
                  )}

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Custom Section Button */}
      <button
        type="button"
        onClick={addCustomSection}
        className="w-full py-3 bg-white hover:bg-slate-50 border-2 border-dashed border-slate-300 hover:border-blue-400 text-slate-700 hover:text-blue-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
      >
        <Plus className="w-4 h-4" /> Add Custom CV Section
      </button>

    </div>
  );
};
