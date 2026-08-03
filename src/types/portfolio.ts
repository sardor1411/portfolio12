export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: string;
  year: string;
  techStack: string[];
  description: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
  demoPreviewType: 'interactive-ui' | 'shader-preview' | 'commerce-flow';
  featured: boolean;
  link?: string;
  demoUrl: string;
  githubUrl?: string;
  role?: string;
  status?: string;
  screenshots?: string[];
}

export interface SkillCategory {
  name: string;
  skills: {
    name: string;
    level: string;
    experience: string;
    description: string;
    iconName: string;
  }[];
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}
