import { DEFAULT_ATTRIBUTES_TYPES } from 'src/constants';
import {
  ProjectEntity,
  ProfessionalEntity,
  AttributeEntity,
  AttributeTypeEntity,
} from 'src/entities';

export const responsibilitySeed = [
  'Frontend',
  'Backend',
  'Fullstack',
  'Mobile',
  'DevOps',
  'QA',
];

export const attributeTypesSeed: Partial<AttributeTypeEntity>[] = [
  {
    name: DEFAULT_ATTRIBUTES_TYPES.TECHNOLOGIES,
  },
  {
    name: DEFAULT_ATTRIBUTES_TYPES.METHODOLOGIES,
  },
  {
    name: DEFAULT_ATTRIBUTES_TYPES.SKILLS,
  },
];

export const technologiesSeed: Partial<AttributeEntity>[] = [
  {
    name: 'ReactJS',
  },
  {
    name: 'Tailwind',
  },
  {
    name: 'NodeJS',
  },
  {
    name: 'TypeORM',
  },
  {
    name: 'PostgreSQL',
  },
];

export const methodologiesSeed: Partial<AttributeEntity>[] = [
  {
    name: 'Scrum',
  },
  {
    name: 'Kanban',
  },
];

export const skillsSeed: Partial<AttributeEntity>[] = [
  {
    name: 'Teamwork',
  },
  {
    name: 'Communication',
  },
  {
    name: 'Problem solving',
  },
  {
    name: 'Self-learning',
  },
];

export const projectsSeed: Partial<ProjectEntity>[] = [
  {
    name: 'Bank app',
    description:
      'This solution was aimed at guiding users through the process of obtaining \
    a work visa, all the way from documentation, form filling, uploading \
    required documents, step-by-step instructions, and proper guidance. I \
    worked on this project as a frontend ReactJS developer for a period of \
    eight months. \
    The team was composed by two frontend engineers, one backend \
    engineer, and QA engineer. \
    We used Scrum as a methodology.',
    duration: '8',
    from: new Date(),
    to: new Date(),
  },
  {
    name: 'Todo app',
    description:
      'Worked as a frontend ReactJS developer on this project involving a file \
      management system, which included online forms and business flow \
      creation.',
    duration: '8',
    from: new Date(),
    to: new Date(),
  },
];

export const professionalSeed: Partial<ProfessionalEntity> = {
  firstName: 'Jon',
  lastName: 'Doe',
  email: 'example@vairix.com',
  english: 4,
  about:
    'Systems engineering graduate with four years of software development \
    industry experience. I’m a frontend developer, mostly focused on ReactJS \
    for the past three years, and I also have experience in NextJS, Gatsby, \
    JavaScript, and TypeScript. Have been part of web app development \
    projects involving responsive and intuitive interfaces.',
  headline: 'Frontend developer',
};
