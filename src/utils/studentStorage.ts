import { StudentCVDoc, StudentAccountInfo, CVData } from '../types';
import { defaultPresets } from '../data/careerData';

const DIRECTORY_KEY = 'murdoch_student_directory';

// Helper to get all registered student accounts
export function getRegisteredStudents(): StudentAccountInfo[] {
  try {
    const raw = localStorage.getItem(DIRECTORY_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Refresh CV counts
        return parsed.map((acc: StudentAccountInfo) => {
          const cvs = getStudentCvs(acc.email);
          return {
            ...acc,
            cvCount: cvs.length
          };
        });
      }
    }
  } catch (e) {
    console.error('Error loading student directory', e);
  }

  // Pre-seed with realistic sample students if empty
  return seedInitialStudentAccounts();
}

export function seedInitialStudentAccounts(): StudentAccountInfo[] {
  const sarahEmail = 'sarah.ahmed@student.murdoch.edu.au';
  const omarEmail = 'omar.khalil@student.murdoch.edu.au';

  const sarahPreset = defaultPresets.entry;
  const sarahCvs: StudentCVDoc[] = [
    {
      id: 'cv_sarah_1',
      name: 'Marketing & Comms CV (UAE Standard)',
      template: 'entry',
      accentColor: '#1B365D',
      photoDataUrl: '',
      data: {
        fullName: 'Sarah Ahmed',
        headline: sarahPreset.headline,
        phone: '+971 50 123 4567',
        email: sarahEmail,
        location: 'Dubai, UAE',
        linkedin: 'linkedin.com/in/sarahahmed-murdoch',
        website: '',
        showPhoto: false,
        photoShape: 'circle',
        sections: JSON.parse(JSON.stringify(sarahPreset.sections))
      },
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
    },
    {
      id: 'cv_sarah_2',
      name: 'Digital Marketing Specialist (Tailored)',
      template: 'skills',
      accentColor: '#800020',
      photoDataUrl: '',
      data: {
        fullName: 'Sarah Ahmed',
        headline: 'Digital Content & Performance Marketing Specialist | Murdoch Dubai',
        phone: '+971 50 123 4567',
        email: sarahEmail,
        location: 'Dubai, UAE',
        linkedin: 'linkedin.com/in/sarahahmed-murdoch',
        website: '',
        showPhoto: false,
        photoShape: 'circle',
        sections: JSON.parse(JSON.stringify(defaultPresets.skills.sections))
      },
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
    }
  ];

  const omarPreset = defaultPresets.chronological;
  const omarCvs: StudentCVDoc[] = [
    {
      id: 'cv_omar_1',
      name: 'Cybersecurity & IT Graduate CV',
      template: 'chronological',
      accentColor: '#1B365D',
      photoDataUrl: '',
      data: {
        fullName: 'Omar Khalil',
        headline: 'BSc Cyber Security & Forensics | Murdoch University Dubai',
        email: omarEmail,
        phone: '+971 52 987 6543',
        location: 'Dubai Internet City, UAE',
        linkedin: 'linkedin.com/in/omarkhalil-cyber',
        website: '',
        showPhoto: false,
        photoShape: 'circle',
        sections: JSON.parse(JSON.stringify(omarPreset.sections))
      },
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString()
    }
  ];

  saveStudentCvs(sarahEmail, sarahCvs);
  saveStudentCvs(omarEmail, omarCvs);

  const initialList: StudentAccountInfo[] = [
    {
      email: sarahEmail,
      fullName: 'Sarah Ahmed',
      lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      cvCount: sarahCvs.length
    },
    {
      email: omarEmail,
      fullName: 'Omar Khalil',
      lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
      cvCount: omarCvs.length
    }
  ];

  try {
    localStorage.setItem(DIRECTORY_KEY, JSON.stringify(initialList));
  } catch (e) {
    console.warn('Storage quota', e);
  }

  return initialList;
}

export function registerOrUpdateStudentAccount(email: string, fullName?: string): void {
  const list = getRegisteredStudents();
  const existingIdx = list.findIndex(s => s.email.toLowerCase() === email.toLowerCase());
  const now = new Date().toISOString();

  if (existingIdx >= 0) {
    list[existingIdx].lastLogin = now;
    if (fullName) list[existingIdx].fullName = fullName;
    const cvs = getStudentCvs(email);
    list[existingIdx].cvCount = cvs.length;
  } else {
    list.unshift({
      email,
      fullName: fullName || email.split('@')[0].replace('.', ' ').replace(/\b\w/g, c => c.toUpperCase()),
      lastLogin: now,
      cvCount: getStudentCvs(email).length || 1
    });
  }

  try {
    localStorage.setItem(DIRECTORY_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn('Storage quota', e);
  }
}

export function getStudentCvs(email: string): StudentCVDoc[] {
  try {
    const raw = localStorage.getItem(`murdoch_student_cvs_${email.toLowerCase()}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Error fetching student cvs', e);
  }
  return [];
}

export function saveStudentCvs(email: string, cvs: StudentCVDoc[]): void {
  try {
    localStorage.setItem(`murdoch_student_cvs_${email.toLowerCase()}`, JSON.stringify(cvs));
  } catch (e) {
    console.warn('Storage quota', e);
  }
}

export function deleteStudentAccount(email: string): void {
  try {
    localStorage.removeItem(`murdoch_student_cvs_${email.toLowerCase()}`);
    const list = getRegisteredStudents().filter(s => s.email.toLowerCase() !== email.toLowerCase());
    localStorage.setItem(DIRECTORY_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Error deleting student account', e);
  }
}
