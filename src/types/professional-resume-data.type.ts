export type ProfessionalResumeData = {
  name: string;
  headline: string;
  email: string;
  aboutMe: string;
  englishLevel: string;
  projects: ProjectResumeData[];
  technologies: string;
};

export type ProjectResumeData = {
  name: string;
  startDate: Date;
  endDate: Date;
  duration: string;
  description: string;
  technologies: string;
  responsibility: string;
};
