export type CareerStatus = 'published' | 'draft' | 'paused';

export interface CareerType {
  id?: number | string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string; // e.g., 'Full-time', 'Part-time', 'Contract', 'Remote', 'Hybrid'
  experience?: string;
  salary?: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  benefits?: string[];
  is_active: boolean;
  status?: CareerStatus;
  created_at?: string;
  updated_at?: string;
}

export type ApplicationStatus = 'new' | 'reviewed' | 'shortlisted' | 'rejected';

export interface CareerApplicationType {
  id?: number | string;
  name: string;
  email: string;
  phone: string;
  roleId?: number | string;
  roleTitle: string;
  linkedin?: string;
  portfolio?: string;
  coverLetter?: string;
  resumeUrl?: string;
  resumeFilePath?: string;
  status?: ApplicationStatus;
  created_at?: string;
}

