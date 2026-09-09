import type {
  Education,
  Experience,
  Language,
  Project,
  SkillGroup,
} from '../types/portfolio';

export const skillGroups: readonly SkillGroup[] = [
  {
    title: 'Backend Core',
    description: 'The application layer — APIs, auth, runtime, validation, and real-time behavior.',
    skills: ['Node.js', 'TypeScript', 'JavaScript', 'REST', 'NestJS', 'Express', 'JWT', 'Socket', 'Zod'],
  },
  {
    title: 'Data Layer',
    description: 'Relational and document persistence, modeling, querying, and ORM workflows.',
    skills: ['PostgreSQL', 'TypeORM', 'MongoDB'],
  },
  {
    title: 'Data + ML',
    description: 'Analysis, visualization, classical machine learning, and deep-learning tooling.',
    skills: ['Python', 'Data analysis', 'Pandas', 'Matplotlib', 'Seaborn', 'Scikit-learn', 'PyTorch'],
  },
  {
    title: 'Engineering',
    description: 'Languages, environments, tooling, and collaborative problem solving.',
    skills: ['OOP', 'C++', 'Java', 'Git', 'npm', 'Unix', 'MS Office', 'Team Working'],
  },
];

export const experiences: readonly Experience[] = [
  {
    role: 'Backend Developer',
    company: 'Freelance',
    location: 'Remote',
    period: '11/2024 — Present',
    points: [
      'Created a charity web application backend with Node.js, Express.js, and PostgreSQL to organize and manage daily organizational operations.',
      'Developed the backend for an Android money-tracker application using TypeScript and NestJS, including multi-currency support and multi-account distribution logic.',
    ],
  },
  {
    role: 'Teacher',
    company: 'German Board',
    location: 'As-Suwayda, Syria',
    period: '01/2025 — 06/2025',
    points: [
      'Taught a comprehensive course on applying AI in daily life and design.',
      'Improved student AI proficiency scores by 25% within one month.',
      'Increased student engagement by 30% through two project-based learning units.',
    ],
  },
];

export const projects: readonly Project[] = [
  {
    index: '01',
    title: 'PharmaLink Backend',
    period: '05/2026 — Present',
    type: 'Backend System',
    description:
      'A scalable pharmaceutical platform backend focused on robust relational modeling, maintainable APIs, and real-time system behavior.',
    points: [
      'Designed TypeORM + PostgreSQL models with emphasis on relational integrity and optimized structures.',
      'Developed scalable RESTful APIs with Node.js.',
      'Integrated WebSockets for real-time system updates.',
    ],
    stack: ['Node.js', 'TypeScript', 'PostgreSQL', 'TypeORM', 'REST', 'WebSockets'],
    visual: 'system',
  },
  {
    index: '02',
    title: 'Lung Cancer Classification',
    period: '02/2024 — 07/2024',
    type: 'AI / Machine Learning',
    description:
      'A medical-image classification project built in Python to predict lung cancer types from CT scan imagery.',
    points: ['Built an AI classification model for CT scan images.', 'Achieved a reported 97% accuracy rate.'],
    stack: ['Python', 'PyTorch', 'Scikit-learn', 'Data Analysis'],
    visual: 'ml',
    metric: { value: '97%', label: 'reported accuracy' },
  },
];

export const education: Education = {
  period: '09/2019 — 09/2026',
  institution: 'Latakia University',
  degree: 'Bachelor of Technology — Artificial Intelligence Engineering',
  location: 'Latakia, Syria',
};

export const languages: readonly Language[] = [
  { name: 'Arabic', level: 'Native' },
  { name: 'English', level: 'Intermediate' },
];
