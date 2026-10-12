import { t } from '../i18n';
import type { Principle } from '../types/content';

/** How the work is approached. Shown in the Engineering section. */
export const principles: Principle[] = [
  {
    name: t('Correctness', 'Exactitude'),
    statement: t(
      'Decide what “right” means before writing the code, then make the wrong states hard to reach. A rule that lives where the data lives cannot be bypassed.',
      "Définir ce que « juste » veut dire avant d'écrire le code, puis rendre les états fautifs difficiles à atteindre. Une règle placée là où vivent les données ne peut pas être contournée.",
    ),
  },
  {
    name: t('Testability', 'Testabilité'),
    statement: t(
      'If something is hard to test, the design is telling me something. I would rather pass a dependency in than patch around it.',
      "Quand quelque chose est difficile à tester, c'est la conception qui me parle. Je préfère injecter une dépendance plutôt que de la contourner.",
    ),
  },
  {
    name: t('Clear architecture', 'Architecture claire'),
    statement: t(
      'Each part should have one job and a boundary you can point to. A pattern earns its place by removing a real problem.',
      "Chaque partie doit avoir un seul rôle et une frontière que l'on peut montrer du doigt. Un patron mérite sa place lorsqu'il élimine un vrai problème.",
    ),
  },
  {
    name: t('Maintainability', 'Maintenabilité'),
    statement: t(
      'Code is read far more often than it is written. I write down why a decision was made, including what it cost.',
      "Le code est lu bien plus souvent qu'il n'est écrit. Je consigne les raisons d'une décision, y compris ce qu'elle a coûté.",
    ),
  },
  {
    name: t('Honest measurement', 'Mesure honnête'),
    statement: t(
      'A figure is either measured or it is labelled as not measured. A green run only means something if it tested what was actually built.',
      "Un chiffre est soit mesuré, soit signalé comme non mesuré. Une exécution au vert ne veut dire quelque chose que si elle a testé ce qui a réellement été construit.",
    ),
  },
  {
    name: t('Continuous improvement', 'Amélioration continue'),
    statement: t(
      'The first version of a solution is often wrong in an instructive way. I keep the wrong versions in the record, with the reason they failed.',
      "La première version d'une solution est souvent fausse de façon instructive. Je conserve les versions erronées au dossier, avec la raison de leur échec.",
    ),
  },
];
