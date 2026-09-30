import React, { useState, useEffect } from 'react';
import { StudentAccountInfo, StudentCVDoc, CVData } from '../types';
import { 
  getRegisteredStudents, 
  getStudentCvs, 
  saveStudentCvs, 
  seedInitialStudentAccounts,
  deleteStudentAccount 
} from '../utils/studentStorage';
import { exportToPDF, printCVNative } from '../utils/exportUtils';
import { 
  ShieldCheck, 
  Users, 
  FileText, 
  Search, 
  ExternalLink, 
  Copy, 
  Trash2, 
  RefreshCw, 
  PlusCircle, 
  ChevronRight, 
  Download, 
  UserCheck, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';

interface AdminHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInspectStudentCv: (studentEmail: string, cvDoc: StudentCVDoc) => void;
  onToast: (msg: string) => void;
}

export const AdminHubModal: React.FC<AdminHubModalProps> = ({
  isOpen,
  onClose,
  onInspectStudentCv,
  onToast
}) => {
  const [students, setStudents] = useState<StudentAccountInfo[]>([]);
  const [selectedStudentEmail, setSelectedStudentEmail] = useState<string | null>(null);
  const [selectedStudentCvs, setSelectedStudentCvs] = useState<StudentCVDoc[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [newStudentEmail, setNewStudentEmail] = useState<string>('');
  const [newStudentName, setNewStudentName] = useState<string>('');
  const [showAddStudentForm, setShowAddStudentForm] = useState<boolean>(false);

  const loadStudentData = () => {
    const list = getRegisteredStudents();
    setStudents(list);
    if (list.length > 0 && !selectedStudentEmail) {
      setSelectedStudentEmail(list[0].email);
      setSelectedStudentCvs(getStudentCvs(list[0].email));
    } else if (selectedStudentEmail) {
      setSelectedStudentCvs(getStudentCvs(selectedStudentEmail));
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadStudentData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectStudent = (email: string) => {
    setSelectedStudentEmail(email);
    setSelectedStudentCvs(getStudentCvs(email));
  };

  const handleCreateNewStudent = (e: React.FormEvent) => {
    e.preventDefault();
    let email = newStudentEmail.trim().toLowerCase();
    if (!email.includes('@')) {
      email = `${email}@student.murdoch.edu.au`;
    }
    if (!email.endsWith('@student.murdoch.edu.au')) {
      onToast('Email must end with @student.murdoch.edu.au');
      return;
    }

    const name = newStudentName.trim() || 'New Student';
    const sampleCv: StudentCVDoc = {
      id: 'cv_' + Date.now(),
      name: `${name}'s Initial CV`,
      template: 'entry',
      accentColor: '#1B365D',
      photoDataUrl: '',
      data: {
        fullName: name,
        headline: 'Student | Murdoch University Dubai',
        phone: '+971 50 000 0000',
        email: email,
        location: 'Dubai, UAE',
        linkedin: '',
        website: '',
        showPhoto: false,
        photoShape: 'circle',
        sections: [
          {
            id: 'summary',
            type: 'text',
            title: 'Summary / Profile',
            text: 'Dedicated student pursuing degree at Murdoch University Dubai with keen interest in professional development.',
            visible: true,
            collapsed: false
          },
          {
            id: 'education',
            type: 'education',
            title: 'Education',
            visible: true,
            collapsed: false,
            items: [
              {
                degree: 'Bachelor Degree',
                uni: 'Murdoch University Dubai',
                location: 'Dubai, UAE',
                dates: '2024 - Present',
                grade: 'In Progress'
              }
            ]
          }
        ]
      },
      updatedAt: new Date().toISOString()
    };

    saveStudentCvs(email, [sampleCv]);
    loadStudentData();
    setSelectedStudentEmail(email);
    setSelectedStudentCvs([sampleCv]);
    setShowAddStudentForm(false);
    setNewStudentEmail('');
    setNewStudentName('');
    onToast(`Added student account for ${email}!`);
  };

  const handleDeleteStudent = (email: string) => {
    if (confirm(`Are you sure you want to remove student "${email}" and all their CV drafts?`)) {
      deleteStudentAccount(email);
      loadStudentData();
      setSelectedStudentEmail(null);
      setSelectedStudentCvs([]);
      onToast(`Removed student ${email}`);
    }
  };

  const handleDuplicateCv = (cv: StudentCVDoc) => {
    if (!selectedStudentEmail) return;
    const dup: StudentCVDoc = {
      ...cv,
      id: 'cv_' + Date.now(),
      name: `${cv.name} (Admin Review Copy)`,
      updatedAt: new Date().toISOString()
    };
    const updated = [dup, ...selectedStudentCvs];
    saveStudentCvs(selectedStudentEmail, updated);
    setSelectedStudentCvs(updated);
    loadStudentData();
    onToast(`Duplicated CV for ${selectedStudentEmail}`);
  };

  const handleDeleteCv = (cvId: string) => {
    if (!selectedStudentEmail) return;
    if (selectedStudentCvs.length <= 1) {
      onToast('Student must have at least one CV draft.');
      return;
    }
    const updated = selectedStudentCvs.filter(c => c.id !== cvId);
    saveStudentCvs(selectedStudentEmail, updated);
    setSelectedStudentCvs(updated);
    loadStudentData();
    onToast('Deleted CV draft.');
  };

  const handleExportStudentPdf = async (cv: StudentCVDoc) => {
    onToast(`Exporting ${cv.name} to ATS Vector PDF...`);
    await exportToPDF(cv.data, cv.accentColor, cv.photoDataUrl);
    onToast('Downloaded student PDF!');
  };

  const handleResetDemoData = () => {
    if (confirm('Reset all student records to default Murdoch Dubai sample students?')) {
      seedInitialStudentAccounts();
      loadStudentData();
      onToast('Reset student accounts to default demo records.');
    }
  };

  const filteredStudents = students.filter(s => 
    s.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (s.fullName && s.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const activeStudentInfo = students.find(s => s.email === selectedStudentEmail);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 text-white rounded-2xl shadow-2xl max-w-5xl w-full h-[90vh] flex flex-col overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">Murdoch Careers Staff Admin Hub</h2>
                <span className="bg-amber-500 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
                  Admin Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                View, troubleshoot, and polish student ATS CV drafts directly.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetDemoData}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5 transition"
              title="Reset with sample students"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Demo Students</span>
            </button>

            <button
              onClick={onClose}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-1.5 rounded-lg transition shadow"
            >
              Back to CV Builder
            </button>
          </div>
        </div>

        {/* Content Body: Split View (Student Directory on Left, Selected Student CVs on Right) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Panel: Student Accounts List */}
          <div className="w-full md:w-80 bg-slate-950/60 border-r border-slate-800 flex flex-col overflow-hidden">
            <div className="p-3 border-b border-slate-800 space-y-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span>{filteredStudents.length} Students Registered</span>
                <button
                  onClick={() => setShowAddStudentForm(!showAddStudentForm)}
                  className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>{showAddStudentForm ? 'Cancel' : 'Add Student'}</span>
                </button>
              </div>

              {/* Add Student Quick Form */}
              {showAddStudentForm && (
                <form onSubmit={handleCreateNewStudent} className="bg-slate-900 p-2.5 rounded-xl border border-slate-700 space-y-2">
                  <input
                    type="text"
                    required
                    placeholder="Student Name (e.g. John Doe)"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-white"
                  />
                  <input
                    type="text"
                    required
                    placeholder="e.g. john.doe@student.murdoch.edu.au"
                    value={newStudentEmail}
                    onChange={(e) => setNewStudentEmail(e.target.value)}
                    className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-white"
                  />
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-1 rounded transition"
                  >
                    Save & Create Account
                  </button>
                </form>
              )}
            </div>

            {/* Students List Scrollable */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
              {filteredStudents.length === 0 ? (
                <div className="p-6 text-center text-slate-500 text-xs">
                  No students found matching your search.
                </div>
              ) : (
                filteredStudents.map((stu) => {
                  const isSelected = selectedStudentEmail === stu.email;
                  return (
                    <div
                      key={stu.email}
                      onClick={() => handleSelectStudent(stu.email)}
                      className={`p-3 rounded-xl cursor-pointer transition border flex items-center justify-between ${
                        isSelected 
                          ? 'bg-amber-500/15 border-amber-500/50 text-white shadow-sm' 
                          : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/80 text-slate-300'
                      }`}
                    >
                      <div className="overflow-hidden pr-2">
                        <div className="font-semibold text-xs truncate text-slate-100 flex items-center gap-1.5">
                          <UserCheck className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                          <span>{stu.fullName || stu.email.split('@')[0]}</span>
                        </div>
                        <div className="text-[11px] font-mono text-slate-400 truncate mt-0.5">
                          {stu.email}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-2">
                          <span className="bg-slate-800 px-1.5 py-0.5 rounded text-indigo-300 font-semibold">
                            {stu.cvCount} {stu.cvCount === 1 ? 'CV' : 'CVs'}
                          </span>
                          <span>Active: {new Date(stu.lastLogin).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <ChevronRight className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-amber-400' : 'text-slate-600'}`} />
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Panel: Selected Student CV Drafts & Actions */}
          <div className="flex-1 bg-slate-900 flex flex-col overflow-hidden">
            {activeStudentInfo ? (
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Active Student Top Subheader */}
                <div className="p-4 bg-slate-950/40 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-white">{activeStudentInfo.fullName || 'Student Profile'}</h3>
                      <span className="text-[11px] bg-indigo-950 border border-indigo-500/40 text-indigo-300 px-2 py-0.5 rounded-full font-mono">
                        {activeStudentInfo.email}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Showing {selectedStudentCvs.length} saved CV draft(s) for this student account.
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteStudent(activeStudentInfo.email)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-950/50 text-xs px-2.5 py-1 rounded border border-red-900/50 transition flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Student Account</span>
                  </button>
                </div>

                {/* CV Drafts Cards Grid */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {selectedStudentCvs.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-xs">
                      This student has no CV drafts yet.
                    </div>
                  ) : (
                    selectedStudentCvs.map((cv) => (
                      <div
                        key={cv.id}
                        className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition space-y-3"
                      >
                        <div className="flex items-start justify-between flex-wrap gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-amber-400" />
                              <h4 className="font-bold text-xs text-white">{cv.name}</h4>
                              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono uppercase">
                                {cv.template} template
                              </span>
                            </div>
                            <div className="text-xs text-slate-300 mt-1 font-medium">
                              {cv.data.headline || cv.data.fullName || 'Untitled ATS Profile'}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              Last Modified: {new Date(cv.updatedAt).toLocaleString()} • {cv.data.sections?.length || 0} Sections
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 flex-wrap">
                            {/* Primary Button: Load into Live Editor */}
                            <button
                              onClick={() => {
                                onInspectStudentCv(activeStudentInfo.email, cv);
                                onClose();
                              }}
                              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded-lg shadow flex items-center gap-1.5 transition"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Inspect & Edit in Builder</span>
                            </button>

                            <button
                              onClick={() => handleExportStudentPdf(cv)}
                              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1 transition"
                              title="Download PDF directly"
                            >
                              <Download className="w-3.5 h-3.5 text-indigo-400" />
                              <span>Export PDF</span>
                            </button>

                            <button
                              onClick={() => handleDuplicateCv(cv)}
                              className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1 transition"
                              title="Create Review Copy"
                            >
                              <Copy className="w-3.5 h-3.5 text-amber-400" />
                              <span>Duplicate</span>
                            </button>

                            {selectedStudentCvs.length > 1 && (
                              <button
                                onClick={() => handleDeleteCv(cv.id)}
                                className="bg-red-950/60 hover:bg-red-900/80 text-red-300 text-xs px-2 py-1.5 rounded-lg border border-red-800/40 transition"
                                title="Delete this draft"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Summary preview badge row */}
                        <div className="bg-slate-900/90 rounded-lg p-2.5 text-[11px] text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
                          <div><strong className="text-slate-300">Name:</strong> {cv.data.fullName || 'N/A'}</div>
                          <div><strong className="text-slate-300">Phone:</strong> {cv.data.phone || 'N/A'}</div>
                          <div><strong className="text-slate-300">Location:</strong> {cv.data.location || 'N/A'}</div>
                          <div><strong className="text-slate-300">Sections:</strong> {cv.data.sections?.map(s => s.title).join(', ')}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
                <Users className="w-12 h-12 text-slate-600 mb-3" />
                <h3 className="font-bold text-sm text-white">Select a Student Account</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  Choose a registered student from the left directory to inspect their CV drafts and provide career counseling assistance.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
