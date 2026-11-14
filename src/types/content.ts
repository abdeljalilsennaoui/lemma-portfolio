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

/**
 * A small state machine that the reader can drive, drawn by
 * `StateMachine.astro`. It is a model of a rule the project enforces, with
 * the states, actions and refusal taken from the project's own source.
 */
export interface Machine {
  caption: Localized;
  /** Where the rule is implemented, so the model can be checked against it. */
  source: { label: string; url: string };
  /** The state a new object starts in. */
  initial: string;
  /** `at` places the state on the drawing: column, then row. */
  states: { id: string; at: [column: number, row: number]; terminal?: boolean }[];
  /** `target` is the state the action asks for, used in the refusal. */
  actions: { id: string; target: string }[];
  /** Every move that is allowed. Anything else is refused. */
  transitions: { from: string; action: string; to: string }[];
  /** What a refused action answers. `{target}` and `{state}` are filled in. */
  refusal: string;
  /** Label of the control that starts over with a new object. */
  reset: Localized;
}

/**
 * A count broken into its parts, drawn by `Tally.astro` as a stack of planes
 * whose widths are the counts. The parts must add up to the whole.
 */
export interface Tally {
  caption: Localized;
  /** What is being counted, in the plural: "tests". */
  unit: Localized;
  /** From the base of the stack upward. */
  rows: { label: Localized; count: number; detail?: Localized }[];
}

/**
 * The versions of a solution, wrong ones included, drawn by `Attempts.astro`:
 * which steps ran where in each version, and what came of it.
 */
export interface Attempts {
  caption: Localized;
  /** Where a step can run, e.g. a thread. */
  lanes: { id: string; label: Localized }[];
  versions: {
    /** Steps in the order they run. */
    steps: { lane: string; label: Localized }[];
    works: boolean;
    outcome: Localized;
  }[];
}

/**
 * A model of splitting a text into overlapping chunks, drawn by
 * `Chunker.astro`. The limits and the refusals are the project's own.
 */
export interface Chunker {
  caption: Localized;
  source: { label: string; url: string };
  /** Length of the example text, in characters. It is an example only. */
  length: number;
  size: { default: number; min: number };
  overlap: { default: number };
  /** `{min}`, `{size}` and `{overlap}` are filled in. */
  refusals: { tooSmall: string; overlap: string };
}

/** A titled paragraph: an engineering decision or a challenge. */
export interface Note {
  title: Localized;
  body: Localized;
  /** A working model of the rule the note describes, when there is one. */
  machine?: Machine;
  attempts?: Attempts;
  chunker?: Chunker;
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
  /**
   * The boxed answer: the one counted result that stands for the project in
   * the hero and on its card. `figure` is the number, `claim` what it counts.
   * It must repeat a row of `results`, so it carries the same source.
   */
  proof: { figure: Localized; claim: Localized };

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
  /** The tests counted by kind, when the repository gives the breakdown. */
  tally?: Tally;
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
