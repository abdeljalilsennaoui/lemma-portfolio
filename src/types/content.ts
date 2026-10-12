import type { ImageMetadata } from 'astro';
import type { Localized } from '../i18n';

/** Areas of practice. They are the right-hand side of the hero relation. */
export type DisciplineId =
  | 'testing'
  | 'backend'
  | 'frontend'
  | 'android'
  | 'architecture'
  | 'cicd'
  | 'data';

export interface Discipline {
  id: DisciplineId;
  label: Localized;
}

/** A screenshot or other image that really comes from the project. */
export interface Figure {
  src: ImageMetadata;
  alt: Localized;
  caption: Localized;
}

/** A layered architecture diagram, drawn by `LayerDiagram.astro`. */
export interface Diagram {
  caption: Localized;
  layers: {
    label: Localized;
    nodes: { name: string; detail?: Localized }[];
  }[];
}

/** A titled paragraph: an engineering decision or a challenge. */
export interface Note {
  title: Localized;
  body: Localized;
}

/** One measured or counted result, with where the figure comes from. */
export interface Result {
  label: Localized;
  value: Localized;
  source: Localized;
}

export interface Project {
  /** URL segment: `/work/<slug>/`. */
  slug: string;
  /** Position in the gallery, and the lemma number. */
  order: number;
  /** Proper name; not translated. */
  title: string;
  /** Short name for tight spaces such as the hero graph. */
  shortTitle: string;
  /** The one-line description shown on the card and under the title. */
  summary: Localized;

  context: {
    kind: 'solo' | 'team';
    /** e.g. "Solo project" or "Team of 11 · SOEN 390". */
    label: Localized;
    teamSize?: number;
  };
  period: Localized;
  disciplines: DisciplineId[];

  /** The handful of technologies shown on the card. */
  stack: string[];
  /** The full list, grouped, for the case study. */
  technologies: { group: Localized; items: string[] }[];

  repository: {
    url: string;
    /** `owner/name`, shown as the link text. */
    label: string;
    /** Set when the repository is not under the author's account. */
    note?: Localized;
  };
  /** Only set when a live demo actually exists and is publicly usable. */
  demo?: { url: string; label: Localized };

  /**
   * A real screenshot when the project has one. When it is omitted the card
   * and the case study show the architecture diagram instead — never a
   * mocked-up screen.
   */
  cover?: Figure;
  gallery?: Figure[];

  overview: Localized[];
  problem: Localized[];
  goals: Localized[];
  architecture: { body: Localized[]; diagram: Diagram };
  role: {
    summary: Localized;
    contributions: Localized[];
    /** How the contribution claim can be checked. */
    evidence: Localized;
  };
  decisions: Note[];
  testing: Localized[];
  challenges: Note[];
  results: { rows: Result[]; note: Localized };
  limitations?: Localized[];
}

/** A pointer from a skill to where it can be seen in use. */
export type Evidence =
  | { kind: 'project'; slug: string }
  | { kind: 'link'; label: string; url: string };

export interface SkillGroup {
  label: Localized;
  skills: { name: string; evidence: Evidence[] }[];
}

export interface Principle {
  name: Localized;
  statement: Localized;
}
