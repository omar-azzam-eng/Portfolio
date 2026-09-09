export interface NavigationItem {
  readonly label: string;
  readonly href: `#${string}`;
}

export interface Experience {
  readonly role: string;
  readonly company: string;
  readonly location: string;
  readonly period: string;
  readonly points: readonly string[];
}

export type ProjectVisual = 'system' | 'ml';

export interface Project {
  readonly index: string;
  readonly title: string;
  readonly period: string;
  readonly type: string;
  readonly description: string;
  readonly points: readonly string[];
  readonly stack: readonly string[];
  readonly visual: ProjectVisual;
  readonly metric?: {
    readonly value: string;
    readonly label: string;
  };
}

export interface Education {
  readonly period: string;
  readonly institution: string;
  readonly degree: string;
  readonly location: string;
}

export interface Language {
  readonly name: string;
  readonly level: string;
}

export interface SkillGroup {
  readonly title: string;
  readonly description: string;
  readonly skills: readonly string[];
}
