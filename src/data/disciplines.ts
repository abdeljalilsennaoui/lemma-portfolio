import { t } from '../i18n';
import type { Discipline } from '../types/content';

/**
 * Areas of practice, in the order they appear in the hero relation. A project
 * lists the ones it exercised in its `disciplines` field.
 */
export const disciplines: Discipline[] = [
  { id: 'testing', label: t('Test automation', 'Automatisation des tests') },
  { id: 'backend', label: t('Back end and APIs', 'Back-end et API') },
  { id: 'architecture', label: t('Software architecture', 'Architecture logicielle') },
  { id: 'cicd', label: t('CI/CD', 'CI/CD') },
  { id: 'data', label: t('Data', 'Données') },
  { id: 'frontend', label: t('Front end', 'Interfaces') },
  { id: 'android', label: t('Android', 'Android') },
];
