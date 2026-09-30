/**
 * Types and interfaces for Murdoch Dubai ATS CV Builder & Career Resource Suite
 */

export type TemplateType = 'entry' | 'chronological' | 'skills';

export type PhotoShape = 'circle' | 'square';

export type AppTab = 'builder' | 'verbs' | 'career' | 'photo' | 'portals';

export interface EducationItem {
  id: string;
  degree: string;
  uni: string;
  location: string;
  dates: string;
  grade?: string;
  modules?: string;
  awards?: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  country: string;
  dates: string;
  bullets: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  dates?: string;
  bullets: string[];
}

export interface CertItem {
  id: string;
  title: string;
  dates?: string;
  issuer?: string;
}

export interface CompetencyBlockItem {
  id: string;
  title: string;
  dates?: string;
  bullets: string[];
}

export type SectionType = 
  | 'text' 
  | 'education' 
  | 'experience' 
  | 'projects' 
  | 'cert_list' 
  | 'tags' 
  | 'bullets' 
  | 'competency_blocks';

export interface CVSection {
  id: string;
  type: SectionType;
  title: string;
  visible: boolean;
  collapsed?: boolean;
  text?: string;
  showModules?: boolean;
  showAwards?: boolean;
  items?: any[]; // EducationItem[] | ExperienceItem[] | ProjectItem[] | CertItem[] | CompetencyBlockItem[]
  tags?: string[];
  bullets?: string[];
}

export interface CVData {
  fullName: string;
  headline: string;
  phone: string;
  email: string;
  location: string;
  linkedin: string;
  website?: string;
  showPhoto: boolean;
  photoShape: PhotoShape;
  sections: CVSection[];
}

export interface ActionVerbCategory {
  category: string;
  description?: string;
  verbs: string[];
}

export interface DegreeRoleDomain {
  domain: string;
  titles: string[];
}

export interface DegreePathway {
  id: string;
  name: string;
  faculty?: string;
  overview?: string;
  roles: DegreeRoleDomain[];
  techSkills: string[];
  softSkills: string[];
}

export interface RecruitmentAgency {
  name: string;
  specialty: string;
  location: string;
  url: string;
  description: string;
  isPopular?: boolean;
}

export interface JobPortal {
  name: string;
  type: string;
  url: string;
  tagline: string;
  badge?: string;
}

export interface SavedDraft {
  version: string;
  template: TemplateType;
  accentColor: string;
  photoDataUrl: string;
  data: CVData;
  lastUpdated: string;
}

export interface StudentCVDoc {
  id: string;
  name: string;
  template: TemplateType;
  accentColor: string;
  photoDataUrl: string;
  data: CVData;
  updatedAt: string;
}

export interface StudentAccountInfo {
  email: string;
  fullName?: string;
  lastLogin: string;
  cvCount: number;
}

