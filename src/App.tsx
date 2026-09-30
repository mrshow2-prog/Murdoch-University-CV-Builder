/**
 * Murdoch Dubai ATS CV Builder & Career Resource Suite
 * Full React + Tailwind CSS + TypeScript Application
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  AppTab, 
  CVData, 
  TemplateType, 
  SavedDraft,
  StudentCVDoc 
} from './types';
import { defaultPresets } from './data/careerData';
import { 
  exportToDraft, 
  exportToPDF,
  printCVNative
} from './utils/exportUtils';
import { 
  getRegisteredStudents, 
  getStudentCvs, 
  saveStudentCvs, 
  registerOrUpdateStudentAccount,
  seedInitialStudentAccounts 
} from './utils/studentStorage';
import { Header } from './components/Header';
import { CVEditor } from './components/CVBuilder/CVEditor';
import { CVLivePreview } from './components/CVBuilder/CVLivePreview';
import { ActionVerbsTab } from './components/ActionVerbs/ActionVerbsTab';
import { CareerPathwaysTab } from './components/CareerPathways/CareerPathwaysTab';
import { PhotoGuideTab } from './components/PhotoGuide/PhotoGuideTab';
import { JobPortalsTab } from './components/JobPortals/JobPortalsTab';
import { StudentAuthModal } from './components/StudentAuthModal';
import { AdminHubModal } from './components/AdminHubModal';
import { CVManagerBar } from './components/CVManagerBar';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

const STORAGE_KEY = 'murdoch_dubai_cv_suite_v2';
const STUDENT_AUTH_KEY = 'murdoch_logged_in_student';
const IS_ADMIN_KEY = 'murdoch_is_admin';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('builder');
  const [currentTemplate, setCurrentTemplate] = useState<TemplateType>('entry');
  const [accentColor, setAccentColor] = useState<string>('#1B365D');
  const [photoDataUrl, setPhotoDataUrl] = useState<string>('');

  // Student Account & Multi-CV State
  const [studentEmail, setStudentEmail] = useState<string | null>(() => {
    return localStorage.getItem(STUDENT_AUTH_KEY);
  });
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem(IS_ADMIN_KEY) === 'true';
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isAdminHubOpen, setIsAdminHubOpen] = useState<boolean>(false);

  // When admin is inspecting a specific student's CV
  const [inspectingStudentEmail, setInspectingStudentEmail] = useState<string | null>(null);

  // Active email account to read/write CVs from (either the logged in student or the student currently being inspected by admin)
  const currentTargetEmail = inspectingStudentEmail || studentEmail;

  // Multi-CV docs list for active target email
  const [studentCvs, setStudentCvs] = useState<StudentCVDoc[]>(() => {
    const email = localStorage.getItem(STUDENT_AUTH_KEY);
    if (email) {
      const cvs = getStudentCvs(email);
      if (cvs.length > 0) return cvs;
    }
    return [];
  });

  const [activeStudentCvId, setActiveStudentCvId] = useState<string>(() => {
    const email = localStorage.getItem(STUDENT_AUTH_KEY);
    if (email) {
      const cvs = getStudentCvs(email);
      if (cvs.length > 0) return cvs[0].id;
    }
    return 'default_cv_1';
  });

  const [cvData, setCvData] = useState<CVData>(() => {
    // If student is logged in and has CVs, load active student CV
    const email = localStorage.getItem(STUDENT_AUTH_KEY);
    if (email) {
      const cvs = getStudentCvs(email);
      if (cvs.length > 0) {
        return cvs[0].data;
      }
    }

    // Otherwise load guest storage draft
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: SavedDraft = JSON.parse(saved);
        if (parsed && parsed.data) {
          if (parsed.template) setCurrentTemplate(parsed.template);
          if (parsed.accentColor) setAccentColor(parsed.accentColor);
          if (parsed.photoDataUrl) setPhotoDataUrl(parsed.photoDataUrl);
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
      email: email || "Sarah.Ahmed@murdoch.edu.au",
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

  // Initialize sample student accounts in directory on initial load
  useEffect(() => {
    getRegisteredStudents();
  }, []);

  // If student signs in for the first time without studentCvs, initialize studentCvs with current state
  useEffect(() => {
    if (studentEmail && !isAdmin && studentCvs.length === 0) {
      const initialDoc: StudentCVDoc = {
        id: 'cv_' + Date.now(),
        name: `${cvData.fullName || 'My'} CV`,
        template: currentTemplate,
        accentColor,
        photoDataUrl,
        data: { ...cvData, email: studentEmail },
        updatedAt: new Date().toISOString()
      };
      setStudentCvs([initialDoc]);
      setActiveStudentCvId(initialDoc.id);
      saveStudentCvs(studentEmail, [initialDoc]);
      registerOrUpdateStudentAccount(studentEmail, cvData.fullName);
    }
  }, [studentEmail, isAdmin]);

  // Sync state to LocalStorage (Guest vs Student Account vs Admin Inspection)
  useEffect(() => {
    if (currentTargetEmail) {
      // Save to current active account storage
      const updatedDocs = studentCvs.map(doc => {
        if (doc.id === activeStudentCvId) {
          return {
            ...doc,
            template: currentTemplate,
            accentColor,
            photoDataUrl,
            data: cvData,
            updatedAt: new Date().toISOString()
          };
        }
        return doc;
      });
      setStudentCvs(updatedDocs);
      saveStudentCvs(currentTargetEmail, updatedDocs);

      if (!isAdmin || inspectingStudentEmail) {
        registerOrUpdateStudentAccount(currentTargetEmail, cvData.fullName);
      }
    } else {
      // Save to guest single draft storage
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
    }
  }, [cvData, currentTemplate, accentColor, photoDataUrl, currentTargetEmail, activeStudentCvId]);

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

  // Student & Admin Sign In Handler
  const handleSignIn = (email: string, asAdmin: boolean = false) => {
    if (asAdmin) {
      setIsAdmin(true);
      setStudentEmail('admin@murdoch.edu.au');
      localStorage.setItem(STUDENT_AUTH_KEY, 'admin@murdoch.edu.au');
      localStorage.setItem(IS_ADMIN_KEY, 'true');
      setInspectingStudentEmail(null);
      setIsAdminHubOpen(true);
      showToast('Welcome to Murdoch Careers Staff Admin Hub!');
      return;
    }

    setIsAdmin(false);
    setStudentEmail(email);
    setInspectingStudentEmail(null);
    localStorage.setItem(STUDENT_AUTH_KEY, email);
    localStorage.removeItem(IS_ADMIN_KEY);

    // Load student CVs if exist
    const cvs = getStudentCvs(email);
    if (cvs.length > 0) {
      setStudentCvs(cvs);
      setActiveStudentCvId(cvs[0].id);
      setCurrentTemplate(cvs[0].template);
      setAccentColor(cvs[0].accentColor);
      setPhotoDataUrl(cvs[0].photoDataUrl || '');
      setCvData(cvs[0].data);
      registerOrUpdateStudentAccount(email, cvs[0].data.fullName);
      showToast(`Welcome back, ${email}! Loaded your CV drafts.`);
      return;
    }

    // Initialize first CV for student
    const newDoc: StudentCVDoc = {
      id: 'cv_' + Date.now(),
      name: `${cvData.fullName || 'My'} CV`,
      template: currentTemplate,
      accentColor,
      photoDataUrl,
      data: { ...cvData, email },
      updatedAt: new Date().toISOString()
    };
    setStudentCvs([newDoc]);
    setActiveStudentCvId(newDoc.id);
    saveStudentCvs(email, [newDoc]);
    registerOrUpdateStudentAccount(email, cvData.fullName);
    showToast(`Verified & Signed in successfully as ${email}!`);
  };

  // Student / Admin Sign Out
  const handleSignOut = () => {
    localStorage.removeItem(STUDENT_AUTH_KEY);
    localStorage.removeItem(IS_ADMIN_KEY);
    setStudentEmail(null);
    setIsAdmin(false);
    setInspectingStudentEmail(null);
    showToast('Signed out. Switched to guest mode.');
  };

  // Multi-CV Student & Admin Actions
  const handleSwitchCv = (id: string) => {
    const target = studentCvs.find(c => c.id === id);
    if (target) {
      setActiveStudentCvId(target.id);
      setCurrentTemplate(target.template);
      setAccentColor(target.accentColor);
      setPhotoDataUrl(target.photoDataUrl || '');
      setCvData(target.data);
      showToast(`Switched to "${target.name}"`);
    }
  };

  const handleCreateCv = (name: string) => {
    const preset = defaultPresets.entry;
    const newDoc: StudentCVDoc = {
      id: 'cv_' + Date.now(),
      name,
      template: 'entry',
      accentColor: '#1B365D',
      photoDataUrl: '',
      data: {
        fullName: preset.fullName,
        headline: preset.headline,
        phone: "+971 50 123 4567",
        email: currentTargetEmail || 'Sarah.Ahmed@student.murdoch.edu.au',
        location: "Dubai, UAE",
        linkedin: "linkedin.com/in/sarahahmed",
        website: "",
        showPhoto: false,
        photoShape: 'circle',
        sections: JSON.parse(JSON.stringify(preset.sections))
      },
      updatedAt: new Date().toISOString()
    };
    const updated = [newDoc, ...studentCvs];
    setStudentCvs(updated);
    setActiveStudentCvId(newDoc.id);
    setCurrentTemplate('entry');
    setAccentColor('#1B365D');
    setPhotoDataUrl('');
    setCvData(newDoc.data);
    if (currentTargetEmail) {
      saveStudentCvs(currentTargetEmail, updated);
    }
    showToast(`Created new CV draft "${name}"!`);
  };

  const handleRenameCv = (id: string, newName: string) => {
    const updated = studentCvs.map(c => c.id === id ? { ...c, name: newName, updatedAt: new Date().toISOString() } : c);
    setStudentCvs(updated);
    if (currentTargetEmail) {
      saveStudentCvs(currentTargetEmail, updated);
    }
    showToast(`Renamed CV to "${newName}"`);
  };

  const handleDuplicateCv = (id: string) => {
    const target = studentCvs.find(c => c.id === id);
    if (!target) return;
    const dup: StudentCVDoc = {
      ...target,
      id: 'cv_' + Date.now(),
      name: `${target.name} (Copy)`,
      updatedAt: new Date().toISOString()
    };
    const updated = [dup, ...studentCvs];
    setStudentCvs(updated);
    setActiveStudentCvId(dup.id);
    setCurrentTemplate(dup.template);
    setAccentColor(dup.accentColor);
    setPhotoDataUrl(dup.photoDataUrl);
    setCvData(dup.data);
    if (currentTargetEmail) {
      saveStudentCvs(currentTargetEmail, updated);
    }
    showToast(`Duplicated "${target.name}" successfully!`);
  };

  const handleDeleteCv = (id: string) => {
    if (studentCvs.length <= 1) {
      showToast('You must keep at least one CV draft.');
      return;
    }
    const updated = studentCvs.filter(c => c.id !== id);
    setStudentCvs(updated);
    if (currentTargetEmail) {
      saveStudentCvs(currentTargetEmail, updated);
    }
    // Switch to first available
    setActiveStudentCvId(updated[0].id);
    setCurrentTemplate(updated[0].template);
    setAccentColor(updated[0].accentColor);
    setPhotoDataUrl(updated[0].photoDataUrl || '');
    setCvData(updated[0].data);
    showToast('CV draft deleted.');
  };

  // Admin Inspection Mode: Load a specific student's CV in builder
  const handleInspectStudentCv = (targetEmail: string, cvDoc: StudentCVDoc) => {
    setInspectingStudentEmail(targetEmail);
    const cvs = getStudentCvs(targetEmail);
    setStudentCvs(cvs);
    setActiveStudentCvId(cvDoc.id);
    setCurrentTemplate(cvDoc.template);
    setAccentColor(cvDoc.accentColor);
    setPhotoDataUrl(cvDoc.photoDataUrl || '');
    setCvData(cvDoc.data);
    setActiveTab('builder');
    showToast(`Loaded "${cvDoc.name}" for ${targetEmail}`);
  };

  const handleExitAdminInspection = () => {
    setInspectingStudentEmail(null);
    if (studentEmail) {
      const cvs = getStudentCvs(studentEmail);
      setStudentCvs(cvs);
      if (cvs.length > 0) {
        setActiveStudentCvId(cvs[0].id);
        setCurrentTemplate(cvs[0].template);
        setAccentColor(cvs[0].accentColor);
        setPhotoDataUrl(cvs[0].photoDataUrl || '');
        setCvData(cvs[0].data);
      }
    }
    setIsAdminHubOpen(true);
    showToast('Exited student inspection mode.');
  };

  // Load Draft from file (.cv)
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

  // Save Draft to file (.cv)
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
        studentEmail={studentEmail}
        isAdmin={isAdmin}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenAdminHub={() => setIsAdminHubOpen(true)}
      />

      {/* Admin Assisting Banner (when admin is currently reviewing/editing a student's CV) */}
      {isAdmin && inspectingStudentEmail && (
        <div className="bg-amber-500 text-slate-950 px-4 py-1.5 flex items-center justify-between text-xs font-bold shadow-sm z-40 border-b border-amber-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-950" />
            <span>Staff Counseling Mode: Assisting <strong>{inspectingStudentEmail}</strong>. Any changes you make in the editor are saved directly to this student's account.</span>
          </div>
          <button
            onClick={handleExitAdminInspection}
            className="bg-slate-950 hover:bg-slate-800 text-amber-400 text-xs px-3 py-0.5 rounded flex items-center gap-1 transition"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Exit to Admin Hub</span>
          </button>
        </div>
      )}

      {/* Multi-CV Manager Bar (Visible when signed in and on builder tab) */}
      {currentTargetEmail && activeTab === 'builder' && (
        <CVManagerBar
          studentEmail={currentTargetEmail}
          cvList={studentCvs}
          activeCvId={activeStudentCvId}
          isAdmin={isAdmin}
          inspectingStudentEmail={inspectingStudentEmail}
          onOpenAdminHub={() => setIsAdminHubOpen(true)}
          onExitAdminInspection={handleExitAdminInspection}
          onSwitchCv={handleSwitchCv}
          onCreateCv={handleCreateCv}
          onRenameCv={handleRenameCv}
          onDuplicateCv={handleDuplicateCv}
          onDeleteCv={handleDeleteCv}
        />
      )}

      {/* Main Tab Views Workspace */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* TAB 1: CV BUILDER & LIVE PREVIEW */}
        {activeTab === 'builder' && (
          <div id="tab-builder" className="main-container w-full h-full flex flex-col lg:flex-row overflow-hidden">
            {/* Left Form Editor */}
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

            {/* Right Live Dual-Page Preview */}
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

      {/* Student Authentication Modal */}
      <StudentAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSignIn={handleSignIn}
        currentEmail={studentEmail}
        isAdmin={isAdmin}
        onSignOut={handleSignOut}
      />

      {/* Admin Hub Modal */}
      <AdminHubModal
        isOpen={isAdminHubOpen}
        onClose={() => setIsAdminHubOpen(false)}
        onInspectStudentCv={handleInspectStudentCv}
        onToast={showToast}
      />

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
