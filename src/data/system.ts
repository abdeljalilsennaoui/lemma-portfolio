import { links } from '../config/site';
import type { Discipline, DisciplineId, Project } from '../types/content';
import { disciplines } from './disciplines';
import { projects } from './projects';

/**
 * The site read as one system: its parts, and the relations between them.
 *
 * Nothing here is new content. It is derived from the project, discipline
 * and site data, so the figure on the home page, the related-work links of
 * a case study and the matrix all redraw when that data changes.
 */

/** Identifier of a project in the figure and in the URL fragment: "L3". */
export const lemmaId = (project: Project) => `L${project.order}`;

/** Identifier of a discipline in the figure and in the URL fragment. */
export const disciplineNodeId = (id: DisciplineId) => `D-${id}`;

/** The relation R ⊆ P × D: which project exercised which discipline. */
export const relation: { project: Project; discipline: Discipline }[] = projects.flatMap((project) =>
  disciplines
    .filter((discipline) => project.disciplines.includes(discipline.id))
    .map((discipline) => ({ project, discipline })),
);

export function disciplinesOf(project: Project): Discipline[] {
  return disciplines.filter((discipline) => project.disciplines.includes(discipline.id));
}

export function lemmasOf(id: DisciplineId): Project[] {
  return projects.filter((project) => project.disciplines.includes(id));
}

/**
 * The other projects, each with the disciplines it has in common with this
 * one, closest first.
 */
export function neighbours(project: Project): { project: Project; shared: Discipline[] }[] {
  return projects
    .filter((other) => other.slug !== project.slug)
    .map((other) => ({
      project: other,
      shared: disciplines.filter(
        (discipline) => project.disciplines.includes(discipline.id) && other.disciplines.includes(discipline.id),
      ),
    }))
    .sort((a, b) => b.shared.length - a.shared.length || a.project.order - b.project.order);
}

// Each project is defined in a file of its own, and that file is named in
// the figure. The file is found here rather than written down twice.
const projectModules = import.meta.glob<Record<string, unknown>>('./projects/*.ts', { eager: true });
const projectFiles = new Map<string, string>();
for (const [path, module] of Object.entries(projectModules)) {
  for (const value of Object.values(module)) {
    if (value && typeof value === 'object' && !Array.isArray(value) && 'slug' in value) {
      projectFiles.set(String((value as Project).slug), path.replace(/^\.\//, 'src/data/'));
    }
  }
}

/** Files of this site's own repository that hold the content of a node. */
export const sources = {
  project: (project: Project) => projectFiles.get(project.slug) ?? 'src/data/projects/index.ts',
  disciplines: 'src/data/disciplines.ts',
  principles: 'src/data/principles.ts',
  community: 'src/data/community.ts',
  identity: 'src/config/site.ts',
  copy: 'src/i18n/ui.ts',
} as const;

/** Where a file of this site can be read on GitHub. */
export const sourceUrl = (path: string) => `${links.repository}/blob/main/${path}`;
