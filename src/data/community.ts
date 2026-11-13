import { t, type Localized } from '../i18n';

/**
 * Involvement outside coursework. Shown in the Community section.
 *
 * The role and the events are the ones listed on the chapter's public page
 * (see `url`). Edit this file when the role changes or a term ends.
 */
export interface ChapterEvent {
  /** ISO date, used for `<time datetime>`. */
  date: string;
  /** Proper name of the event; not translated. */
  name: string;
  /** Who it was run with, when the chapter did not run it alone. */
  partners?: Localized;
}

export const gdg = {
  name: t('GDG on Campus, Concordia University', 'GDG on Campus, Université Concordia'),
  shortName: 'GDG Concordia',
  role: t('VP Admin', 'VP Administration'),
  /** Written to follow the role: "VP Admin, since fall 2025". */
  since: t('since fall 2025', 'depuis l’automne 2025'),
  /** Group size shown on the chapter page, and when it was read. */
  members: { count: 741, asOf: t('November 2026', 'novembre 2026') },
  url: 'https://gdg.community.dev/gdg-on-campus-concordia-university-montreal-canada/',
  instagram: 'https://www.instagram.com/gdg_concordia',
  /** Events on the chapter's page for 2026, oldest first. */
  events: [
    {
      date: '2026-03-17',
      name: 'Build with AI 2026',
      partners: t(
        'with the McGill and Polytechnique chapters',
        'avec les sections de McGill et de Polytechnique',
      ),
    },
    { date: '2026-07-02', name: 'Google I/O Extended Montreal 2026' },
    {
      date: '2026-09-24',
      name: 'GenAI Student Hack Night @ Google Montreal',
      partners: t('with Google and JSBA', 'avec Google et JSBA'),
    },
    {
      date: '2026-10-08',
      name: 'AI Agent for Procurement Webinar',
      partners: t(
        'with the Public Service Commission of Canada',
        'avec la Commission de la fonction publique du Canada',
      ),
    },
    { date: '2026-11-06', name: 'DevFest MTL ’26' },
  ] satisfies ChapterEvent[],
};
