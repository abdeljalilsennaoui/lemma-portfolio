import { t } from '../i18n';
import type { Evidence, SkillGroup } from '../types/content';

// Every skill points at the place it can be checked. A skill with no public
// evidence does not belong in this file.
const qa: Evidence = { kind: 'project', slug: 'insurance-billing-qa-framework' };
const campus: Evidence = { kind: 'project', slug: 'campus-guide' };
const summs: Evidence = { kind: 'project', slug: 'summs' };
const study: Evidence = { kind: 'project', slug: 'local-ai-study-assistant' };
const thisSite: Evidence = {
  kind: 'link',
  label: 'lemma-portfolio',
  url: 'https://github.com/abdeljalilsennaoui/lemma-portfolio',
};
const hospitalDb: Evidence = {
  kind: 'link',
  label: 'SOEN363-HospitalDB',
  url: 'https://github.com/GitExcited/SOEN363-HospitalDB',
};

export const skillGroups: SkillGroup[] = [
  {
    label: t('Languages', 'Langages'),
    skills: [
      { name: 'Java', evidence: [qa] },
      { name: 'Kotlin', evidence: [campus] },
      { name: 'JavaScript', evidence: [summs] },
      { name: 'TypeScript', evidence: [thisSite] },
      { name: 'Python', evidence: [study] },
      { name: 'SQL', evidence: [hospitalDb] },
    ],
  },
  {
    label: t('Frameworks', 'Cadriciels'),
    skills: [
      { name: 'Spring Boot', evidence: [qa] },
      { name: 'Jetpack Compose', evidence: [campus] },
      { name: 'React', evidence: [summs] },
      { name: 'Express', evidence: [summs] },
      { name: 'Streamlit', evidence: [study] },
      { name: 'Astro', evidence: [thisSite] },
    ],
  },
  {
    label: t('Testing and QA', 'Tests et assurance qualité'),
    skills: [
      { name: 'JUnit', evidence: [qa, campus] },
      { name: 'TestNG', evidence: [qa] },
      { name: 'Selenium', evidence: [qa] },
      { name: 'REST Assured', evidence: [qa] },
      { name: 'Cucumber', evidence: [qa] },
      { name: 'Cypress', evidence: [qa] },
      { name: 'JMeter', evidence: [qa] },
      { name: 'Jest', evidence: [summs] },
      { name: 'Supertest', evidence: [summs] },
      { name: 'pytest', evidence: [study] },
      { name: 'Robolectric', evidence: [campus] },
      { name: 'Mockito', evidence: [campus] },
      { name: 'Espresso', evidence: [campus] },
    ],
  },
  {
    label: t('Back end and APIs', 'Back-end et API'),
    skills: [
      { name: 'REST', evidence: [qa, summs] },
      { name: 'SOAP', evidence: [qa] },
      { name: 'Spring Data JPA', evidence: [qa] },
      { name: 'Node.js', evidence: [summs] },
      { name: 'Firebase Authentication', evidence: [summs] },
      { name: 'Google Maps and Routes APIs', evidence: [campus, summs] },
    ],
  },
  {
    label: t('Databases', 'Bases de données'),
    skills: [
      { name: 'Firestore', evidence: [summs] },
      { name: 'H2', evidence: [qa] },
      { name: 'PostgreSQL', evidence: [hospitalDb] },
    ],
  },
  {
    label: t('DevOps and CI/CD', 'DevOps et CI/CD'),
    skills: [
      { name: 'GitHub Actions', evidence: [qa, campus, summs, study] },
      { name: 'Maven', evidence: [qa] },
      { name: 'Gradle', evidence: [campus] },
      { name: 'JaCoCo', evidence: [qa, campus] },
      { name: 'SonarQube Cloud', evidence: [qa, campus, summs] },
      { name: 'Codecov', evidence: [qa] },
    ],
  },
  {
    label: t('Tools and practices', 'Outils et pratiques'),
    skills: [
      { name: 'Git', evidence: [qa, campus, summs, study] },
      { name: 'Page Object Model', evidence: [qa] },
      { name: 'BDD', evidence: [qa] },
      { name: 'Requirements traceability', evidence: [qa] },
      { name: 'Defect reporting', evidence: [qa] },
      { name: 'Design patterns', evidence: [summs] },
      { name: 'Dependency injection', evidence: [study] },
    ],
  },
];
