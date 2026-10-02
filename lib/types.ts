export type ProjectStatus = "active" | "archived" | "in-progress";

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  year: number;
  status: ProjectStatus;
  featured: boolean;
  category: "security" | "engineering" | "learning";
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  context?: string;
  problem?: string;
  architecture?: string;
  implementation?: string[];
  securityConcepts?: string[];
  currentState?: string;
  tags?: string[];
}

export interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  location?: string;
  period: string;
  current?: boolean;
  bullets: string[];
}

export interface CapabilityGroup {
  id: string;
  title: string;
  note?: string;
  items: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer?: string;
  date?: string;
  status?: "completed" | "in-progress";
}

export interface WritingPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  draft: boolean;
  readingMinutes: number;
}
