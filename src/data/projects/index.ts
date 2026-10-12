import type { Project } from '../../types/content';
import { insuranceBillingQa } from './insurance-billing-qa';
import { campusGuide } from './campus-guide';
import { summs } from './summs';
import { localAiStudyAssistant } from './local-ai-study-assistant';

/**
 * Every project shown on the site. To add one, create a file beside this one
 * that exports a `Project`, then add it to this list. The gallery, the case
 * study page, the hero relation and the sitemap all read from here.
 */
export const projects: Project[] = [
  insuranceBillingQa,
  campusGuide,
  summs,
  localAiStudyAssistant,
].sort((a, b) => a.order - b.order);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
