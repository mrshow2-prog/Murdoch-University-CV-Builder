/**
 * Murdoch Dubai ATS CV Builder & Career Resource Suite
 * Full React + Tailwind CSS + TypeScript Application
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  AppTab, 
  CVData, 
  TemplateType, 
  SavedDraft 
} from './types';
import { defaultPresets } from './data/careerData';
import { 
  exportToDraft, 
  exportToPDF,
  printCVNative
} from './utils/exportUtils';
import { Header } from './components/Header';
import { CVEditor } from './components/CVBuilder/CVEditor';
import { CVLivePreview } from './components/CVBuilder/CVLivePreview';
import { ActionVerbsTab } from './components/ActionVerbs/ActionVerbsTab';
import { CareerPathwaysTab } from './components/CareerPathways/CareerPathwaysTab';
import { PhotoGuideTab } from './components/PhotoGuide/PhotoGuideTab';
import { JobPortalsTab } from './components/JobPortals/JobPortalsTab';
import { Check, Info } from 'lucide-react';

const STORAGE_KEY = 'murdoch_dubai_cv_suite_v2';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('builder');
  const [currentTemplate, setCurrentTemplate] = useState<TemplateType>('entry');
  const [accentColor, setAccentColor] = useState<string>('#1B365D');
  const [photoDataUrl, setPhotoDataUrl] = useState<string>('');

  const [cvData, setCvData] = useState<CVData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: SavedDraft = JSON.parse(saved);
        if (parsed && parsed.data) {
          return parsed.data;
        }
      } catch (e) {
        console.error("Failed to restore draft from localStorage", e);
      }
    }
    const preset = defaultPresets.entry;
    return {
      fullName: preset.fullName,
      headline: preset.headline,
      phone: "+971 50 123 4567",
      email: "Sarah.Ahmed@murdoch.edu.au",
      location: "Dubai, UAE",
      linkedin: "linkedin.com/in/sarahahmed",
      website: "",
      showPhoto: false,
      photoShape: 'circle',
      sections: preset.sections
    };
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    const draft: SavedDraft = {
      version: '2.0',
      template: currentTemplate,
      accentColor,
      photoDataUrl,
      data: cvData,
      lastUpdated: new Date().toISOString()
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch (e) {
      console.warn("Storage quota exceeded", e);
    }
  }, [cvData, currentTemplate, accentColor, photoDataUrl]);

  // Toast trigger
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied "${text.length > 35 ? text.substring(0, 35) + '...' : text}"`);
    });
  };

  // Template Switcher
  const handleTemplateChange = (template: TemplateType) => {
    setCurrentTemplate(template);
    const preset = defaultPresets[template];
    setCvData(prev => ({
      ...prev,
      fullName: preset.fullName,
      headline: preset.headline,
      sections: JSON.parse(JSON.stringify(preset.sections))
    }));
    showToast(`Switched to ${template === 'entry' ? 'Entry Level' : template === 'chronological' ? 'Chronological' : 'Skills-Based'} template!`);
  };

  // Photo Upload
  const handlePhotoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPhotoDataUrl(result);
      setCvData(prev => ({ ...prev, showPhoto: true }));
      showToast('Profile photo updated successfully!');
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPhotoDataUrl('');
    setCvData(prev => ({ ...prev, showPhoto: false }));
    showToast('Photo removed.');
  };

  // Load Draft from file
  const handleLoadDraftFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && parsed.data) {
          if (parsed.template) setCurrentTemplate(parsed.template);
          if (parsed.accentColor) setAccentColor(parsed.accentColor);
          if (parsed.photoDataUrl) setPhotoDataUrl(parsed.photoDataUrl);
          setCvData(parsed.data);
          showToast('Draft (.cv) loaded successfully!');
        } else {
          showToast('Invalid .cv file structure.');
        }
      } catch (err) {
        showToast('Error reading file. Please provide a valid JSON .cv file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Save Draft to file
  const handleSaveDraft = () => {
    exportToDraft(cvData, currentTemplate, accentColor, photoDataUrl);
    showToast('Downloaded .cv draft file!');
  };

  // Export to PDF via Direct Download
  const handlePdfExport = async () => {
    showToast('Generating ATS Vector PDF...');
    await exportToPDF(cvData, accentColor, photoDataUrl);
    showToast('Downloaded ATS Vector PDF!');
  };

  // Print to PDF via Browser Native Print Engine
  const handlePrintPdf = () => {
    showToast('Opening Print / Save-to-PDF Dialog...');
    printCVNative();
  };

  // Append Skill from Career Pathway to CV Skills
  const handleAddSkillToCV = (skillName: string) => {
    const updatedSections = [...cvData.sections];
    let skillsSec = updatedSections.find(s => s.type === 'tags' && (s.id === 'skills' || s.title.toLowerCase().includes('skill')));

    if (skillsSec) {
      const existingTags = skillsSec.tags || [];
      if (!existingTags.includes(skillName)) {
        skillsSec.tags = [...existingTags, skillName];
        skillsSec.visible = true;
        setCvData({ ...cvData, sections: updatedSections });
        showToast(`Added "${skillName}" to CV Skills!`);
      } else {
        showToast(`"${skillName}" is already in your Skills list.`);
      }
    } else {
      // Create skills section if not present
      const newSec = {
        id: 'skills',
        type: 'tags' as const,
        title: 'Skills',
        visible: true,
        collapsed: false,
        tags: [skillName]
      };
      setCvData({ ...cvData, sections: [...cvData.sections, newSec] });
      showToast(`Added "${skillName}" to newly created Skills section!`);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-100 text-slate-800 font-sans antialiased">
      
      {/* Hidden File Input for .cv Draft Import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".cv,.json"
        className="hidden"
        onChange={handleLoadDraftFile}
      />

      {/* Main Header Component */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        onLoadClick={() => fileInputRef.current?.click()}
        onSaveClick={handleSaveDraft}
        onPdfExport={handlePdfExport}
        onPrintPdf={handlePrintPdf}
      />

      {/* Main Tab Views Workspace */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* TAB 1: CV BUILDER & LIVE PREVIEW */}
        {activeTab === 'builder' && (
          <div id="tab-builder" className="main-container w-full h-full flex flex-col lg:flex-row overflow-hidden">
            {/* Left Form Editor (45% Width on Desktop, independent scrolling) */}
            <div className="w-full lg:w-[45%] h-[50vh] lg:h-full flex-shrink-0 overflow-hidden">
              <CVEditor
                cvData={cvData}
                onChange={setCvData}
                currentTemplate={currentTemplate}
                onTemplateChange={handleTemplateChange}
                accentColor={accentColor}
                onColorChange={setAccentColor}
                photoDataUrl={photoDataUrl}
                onPhotoUpload={handlePhotoUpload}
                onRemovePhoto={handleRemovePhoto}
              />
            </div>

            {/* Right Live Dual-Page Preview (55% Width on Desktop, independent scrolling) */}
            <div id="preview-container" className="right-panel w-full lg:w-[55%] h-[50vh] lg:h-full overflow-hidden">
              <CVLivePreview
                cvData={cvData}
                accentColor={accentColor}
                photoDataUrl={photoDataUrl}
                onPrintPdf={handlePrintPdf}
              />
            </div>
          </div>
        )}

        {/* TAB 2: ACTION VERBS DIRECTORY */}
        {activeTab === 'verbs' && (
          <ActionVerbsTab onCopyText={handleCopyText} />
        )}

        {/* TAB 3: CAREER PATHWAYS & DEGREE SKILLS */}
        {activeTab === 'career' && (
          <CareerPathwaysTab
            onCopyText={handleCopyText}
            onAddSkillToCV={handleAddSkillToCV}
          />
        )}

        {/* TAB 4: CV PHOTO GUIDE */}
        {activeTab === 'photo' && (
          <PhotoGuideTab />
        )}

        {/* TAB 5: UAE JOB PORTALS & AGENCIES */}
        {activeTab === 'portals' && (
          <JobPortalsTab />
        )}
      </main>

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold py-3 px-5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            ✓
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
