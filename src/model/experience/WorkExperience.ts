import { Experience } from './Experience.ts';

export interface WorkExperience extends Experience {
  company: string;
  companyId?: string;
}
