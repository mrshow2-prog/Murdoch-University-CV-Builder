import React, { useState } from 'react';
import { Camera, CheckCircle2, XCircle, Sparkles, AlertTriangle } from 'lucide-react';

export const PhotoGuideTab: React.FC = () => {
  const [checklist, setChecklist] = useState({
    lighting: true,
    attire: true,
    framing: true,
    background: true,
    smile: true
  });

  const toggleChecklist = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Hero */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-200 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs uppercase tracking-wider border border-emerald-200">
            <Camera className="w-4 h-4 text-emerald-600" /> UAE Professional Presentation Standard
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Official Murdoch Dubai CV Photo Guidelines
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            In the UAE and Gulf job market, many corporate recruiters appreciate a clean, high-resolution professional headshot on graduate and executive resumes. Follow these official university benchmarks to project credibility, warmth, and executive presence.
          </p>
        </div>

        {/* Dos & Don'ts Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* RECOMMENDED DOS */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-emerald-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 text-emerald-800 font-black text-sm uppercase tracking-wide border-b border-emerald-100 pb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Recommended Best Practices (Dos)</span>
            </div>

            <ul className="space-y-3.5 text-xs text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                <div>
                  <strong className="text-slate-900 block">Natural Lighting & High Resolution:</strong>
                  Use bright, diffuse front-facing natural light and ensure sharp image clarity without pixelation or heavy beauty filters.
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                <div>
                  <strong className="text-slate-900 block">Tight Head-and-Shoulders Framing:</strong>
                  Crop closely from upper collarbone to just above the head so your facial expression is clear and legible even at thumbnail size.
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                <div>
                  <strong className="text-slate-900 block">Industry-Appropriate Professional Attire:</strong>
                  Wear clean corporate business wear (blazer/shirt/tie) for Finance/HR/Management, or polished smart-casual for Creative & Tech.
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                <div>
                  <strong className="text-slate-900 block">Neutral, Uncluttered Background:</strong>
                  Use a solid light grey, off-white, or softly blurred architectural campus environment behind you.
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                <div>
                  <strong className="text-slate-900 block">Open, Approachable Expression:</strong>
                  Adopt a warm, confident smile with direct eye contact toward the lens.
                </div>
              </li>
            </ul>

            {/* Photo Example Previews */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-emerald-100">
              <div className="rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-sm relative group">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80" 
                  alt="Good Corporate Executive Male" 
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-2 left-2 bg-emerald-700/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                  ✓ Corporate Blazer
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-sm relative group">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80" 
                  alt="Good Corporate Executive Female" 
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-2 left-2 bg-emerald-700/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                  ✓ Clean Neutral Backdrop
                </div>
              </div>
            </div>
          </div>

          {/* WHAT TO AVOID (DON'TS) */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-red-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 text-red-800 font-black text-sm uppercase tracking-wide border-b border-red-100 pb-3">
              <XCircle className="w-5 h-5 text-red-600" />
              <span>Critical Mistakes to Avoid (Don'ts)</span>
            </div>

            <ul className="space-y-3.5 text-xs text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                <div>
                  <strong className="text-slate-900 block">Stiff Passport / ID Biometric Photos:</strong>
                  Avoid emotionless, harsh flash passport photos with neutral grey cards and unsmiling biometric stares.
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                <div>
                  <strong className="text-slate-900 block">Casual Selfies or Mirror Snaps:</strong>
                  Never use high-angle car selfies, gym selfies, bedroom mirrors, or cropped group event photos where friends' shoulders are visible.
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                <div>
                  <strong className="text-slate-900 block">Sunglasses, Hats or Party Attire:</strong>
                  Avoid sunglasses, caps, resort party wear, low-cut singlets, or unbuttoned holiday shirts.
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                <div>
                  <strong className="text-slate-900 block">Busy or Distracting Backgrounds:</strong>
                  Avoid noisy backgrounds like shopping malls, crowded restaurants, cluttered dorms, or harsh outdoor glare.
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                <div>
                  <strong className="text-slate-900 block">Heavy Snap/Social Media Filters:</strong>
                  Avoid artificial skin blurs, stickers, cartoon eyes, or artistic high-contrast filters.
                </div>
              </li>
            </ul>

            {/* Bad Photo Previews */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-red-100">
              <div className="rounded-2xl overflow-hidden border-2 border-red-300 shadow-sm relative group opacity-90">
                <img 
                  src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?w=500&q=80" 
                  alt="Bad Example Sunglasses" 
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300 filter grayscale-[40%]"
                />
                <div className="absolute bottom-2 left-2 bg-red-700/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                  ✕ Sunglasses / Casual
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border-2 border-red-300 shadow-sm relative group opacity-90">
                <img 
                  src="https://images.unsplash.com/photo-1582152629442-4a864303fb96?w=500&q=80" 
                  alt="Bad Example Selfie Angle" 
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300 filter grayscale-[40%]"
                />
                <div className="absolute bottom-2 left-2 bg-red-700/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                  ✕ Phone Selfie Angle
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Self-Assessment Checklist Card */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Quick Headshot Quality Checklist
            </h3>
            <span className="text-xs text-slate-300">Verify your photo before uploading</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            {[
              { id: 'lighting' as const, label: 'Diffuse Natural Front-Lighting' },
              { id: 'attire' as const, label: 'Professional Business / Smart Casual' },
              { id: 'framing' as const, label: 'Head & Upper Torso Centered' },
              { id: 'background' as const, label: 'Clean, Neutral, or Blurred Backdrop' },
              { id: 'smile' as const, label: 'Friendly, Confident Eye Contact' }
            ].map((item) => (
              <label 
                key={item.id} 
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 cursor-pointer text-xs transition-colors select-none"
              >
                <input 
                  type="checkbox" 
                  checked={checklist[item.id]} 
                  onChange={() => toggleChecklist(item.id)} 
                  className="w-4 h-4 rounded text-amber-400 focus:ring-amber-400"
                />
                <span className="font-medium text-slate-200">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
