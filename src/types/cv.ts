export interface CvIdentity {
  name: string;
  role: string;
  headline: string;
  summary: string;
  contactBits: string[];
  lastUpdatedLabel: string | null;
}

export interface CvExperienceItem {
  id: string;
  title: string;
  organization: string;
  location?: string;
  period: string;
  description: string[];
}

export interface CvProjectItem {
  id: string;
  title: string;
  year: string;
  shortDescription: string;
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface CvSkillGroup {
  id: string;
  label: string;
  skills: string[];
}

export interface CvLanguageItem {
  name: string;
  proficiency: string;
}

export interface CvCertificationItem {
  id: string;
  label: string;
}

export interface CvData {
  identity: CvIdentity;
  experience: CvExperienceItem[];
  projects: CvProjectItem[];
  education: CvExperienceItem[];
  skillGroups: CvSkillGroup[];
  languages: CvLanguageItem[];
  certifications: CvCertificationItem[];
}

export interface CvParseMeta {
  sourcePath: string;
  generatedAt: string;
  warnings: string[];
}

export interface CvGeneratedModule {
  CV_PDF_PATH: string;
  CV_DATA: CvData;
  CV_PARSE_META: CvParseMeta;
  getCvData: () => CvData;
}
