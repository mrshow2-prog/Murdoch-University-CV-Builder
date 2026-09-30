import React, { useState } from 'react';
import { StudentCVDoc } from '../types';
import { Plus, Copy, Trash2, Edit3, FolderKanban, ShieldCheck, Users, ArrowLeft } from 'lucide-react';

interface CVManagerBarProps {
  studentEmail: string;
  cvList: StudentCVDoc[];
  activeCvId: string;
  isAdmin?: boolean;
  inspectingStudentEmail?: string | null;
  onOpenAdminHub?: () => void;
  onExitAdminInspection?: () => void;
  onSwitchCv: (id: string) => void;
  onCreateCv: (name: string) => void;
  onRenameCv: (id: string, newName: string) => void;
  onDuplicateCv: (id: string) => void;
  onDeleteCv: (id: string) => void;
}

export const CVManagerBar: React.FC<CVManagerBarProps> = ({
  studentEmail,
  cvList,
  activeCvId,
  isAdmin = false,
  inspectingStudentEmail = null,
  onOpenAdminHub,
  onExitAdminInspection,
  onSwitchCv,
  onCreateCv,
  onRenameCv,
  onDuplicateCv,
  onDeleteCv,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newCvName, setNewCvName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const activeCv = cvList.find(c => c.id === activeCvId) || cvList[0];

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCvName.trim()) return;
    onCreateCv(newCvName.trim());
    setNewCvName('');
    setIsCreating(false);
  };

  const handleRenameSubmit = (id: string) => {
    if (!editName.trim()) return;
    onRenameCv(id, editName.trim());
    setEditingId(null);
  };

  return (
    <div className={`px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-200 border-b ${
      inspectingStudentEmail 
        ? 'bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-amber-500/40' 
        : 'bg-slate-900 border-slate-800'
    }`}>
      {/* Left: Account badge & CV Dropdown Selector */}
      <div className="flex items-center gap-3 flex-wrap">
        {inspectingStudentEmail ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/40 px-2.5 py-1 rounded-lg text-amber-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold text-[11px]">Assisting Student:</span>
              <span className="font-mono text-[11px] font-semibold text-amber-200">{inspectingStudentEmail}</span>
            </div>

            {onExitAdminInspection && (
              <button
                onClick={onExitAdminInspection}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1 text-[11px] transition"
                title="Exit student inspection and return to your admin view"
              >
                <ArrowLeft className="w-3 h-3 text-amber-400" />
                <span>Exit Student View</span>
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1.5 bg-indigo-950/80 border border-indigo-500/30 px-2.5 py-1 rounded-lg">
            <span className="text-amber-400">{isAdmin ? '👑' : '🎓'}</span>
            <span className="font-medium text-indigo-200 font-mono text-[11px]">{studentEmail}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium flex items-center gap-1">
            <FolderKanban className="w-3.5 h-3.5 text-amber-400" />
            Active CV:
          </span>

          <select
            value={activeCvId}
            onChange={(e) => onSwitchCv(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-400 font-medium"
          >
            {cvList.map((cv) => (
              <option key={cv.id} value={cv.id}>
                {cv.name} ({new Date(cv.updatedAt).toLocaleDateString()})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right: Actions (Rename, Duplicate, New, Delete, Admin Hub) */}
      <div className="flex items-center gap-2 flex-wrap">
        {isAdmin && onOpenAdminHub && (
          <button
            onClick={onOpenAdminHub}
            className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-2.5 py-1 rounded-lg border border-amber-500/40 flex items-center gap-1 transition"
            title="Open all student CV accounts directory"
          >
            <Users className="w-3 h-3 text-amber-400" />
            <span>Admin Directory</span>
          </button>
        )}

        {editingId === activeCv?.id ? (
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="bg-slate-800 border border-amber-400 text-white text-xs px-2 py-1 rounded focus:outline-none"
              autoFocus
            />
            <button
              onClick={() => handleRenameSubmit(activeCv.id)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 rounded text-xs font-bold"
            >
              Save
            </button>
            <button
              onClick={() => setEditingId(null)}
              className="bg-slate-700 hover:bg-slate-600 text-white px-2 py-1 rounded text-xs"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              if (activeCv) {
                setEditingId(activeCv.id);
                setEditName(activeCv.name);
              }
            }}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1 transition"
            title="Rename active CV"
          >
            <Edit3 className="w-3 h-3 text-amber-400" />
            <span>Rename</span>
          </button>
        )}

        <button
          onClick={() => activeCv && onDuplicateCv(activeCv.id)}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1 transition"
          title="Duplicate active CV"
        >
          <Copy className="w-3 h-3 text-indigo-400" />
          <span>Duplicate</span>
        </button>

        <button
          onClick={() => setIsCreating(true)}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1 rounded-lg flex items-center gap-1 shadow transition"
          title="Create a new CV draft"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New CV</span>
        </button>

        {cvList.length > 1 && (
          <button
            onClick={() => {
              if (confirm(`Are you sure you want to delete "${activeCv?.name}"?`)) {
                activeCv && onDeleteCv(activeCv.id);
              }
            }}
            className="bg-red-950/60 hover:bg-red-900/80 text-red-300 px-2.5 py-1 rounded-lg border border-red-800/50 flex items-center gap-1 transition"
            title="Delete active CV"
          >
            <Trash2 className="w-3 h-3 text-red-400" />
            <span>Delete</span>
          </button>
        )}
      </div>

      {/* Inline Create Modal Popup */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white text-slate-900 rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-[#1B365D]">Create New CV Draft</h3>
            <p className="text-xs text-slate-600">
              Give your new CV a title (e.g. "Software Engineering CV", "Marketing Internship CV"):
            </p>
            <form onSubmit={handleCreateSubmit} className="space-y-3">
              <input
                type="text"
                required
                placeholder="CV Title..."
                value={newCvName}
                onChange={(e) => setNewCvName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1B365D]"
                autoFocus
              />
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#1B365D] hover:bg-[#142847] text-white font-bold text-xs py-2 rounded-lg transition"
                >
                  Create CV
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
