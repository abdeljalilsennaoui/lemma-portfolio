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
  /** The event's own page. */
  url: string;
  /** Who it was run with, when the chapter did not run it alone. */
  partners?: Localized;
  /** Set on the events I helped run myself. */
  helpedRun?: true;
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
  /** Chapter events since I joined, from their public pages, oldest first. */
  events: [
    {
      date: '2025-11-14',
      name: 'Build with AI: Build your first AI Agent',
      url: 'https://gdg.community.dev/events/details/google-gdg-on-campus-concordia-university-montreal-canada-presents-build-with-ai-build-your-first-ai-agent/',
      partners: t(
        'with the Engineering and Computer Science Association',
        "avec l'Association de génie et d'informatique (ECA)",
      ),
      helpedRun: true,
    },
    {
      date: '2026-03-17',
      name: 'Build with AI 2026',
      url: 'https://gdg.community.dev/events/details/google-gdg-on-campus-mcgill-university-montreal-canada-presents-build-with-ai-2026-mcgill-x-concordia-x-polytechnique/',
      partners: t(
        'with the McGill and Polytechnique chapters',
        'avec les sections de McGill et de Polytechnique',
      ),
      helpedRun: true,
    },
    {
      date: '2026-07-02',
      name: 'Google I/O Extended Montreal 2026',
      url: 'https://gdg.community.dev/events/details/google-gdg-montreal-presents-google-io-extended-montreal-2026-in-person-highlights-amp-networking/cohost-gdg-on-campus-concordia-university-montreal-canada',
      partners: t('with GDG Montreal', 'avec GDG Montréal'),
    },
    {
      date: '2026-09-24',
      name: 'GenAI Student Hack Night @ Google Montreal',
      url: 'https://gdg.community.dev/events/details/google-gdg-on-campus-concordia-university-montreal-canada-presents-genai-student-hack-night-google-montreal-google-x-jsba-x-gdg-concordia/',
      partners: t('with Google and JSBA', 'avec Google et JSBA'),
    },
    {
      date: '2026-10-08',
      name: 'AI Agent for Procurement Webinar',
      url: 'https://gdg.community.dev/events/details/google-gdg-on-campus-concordia-university-montreal-canada-presents-ai-agent-for-procurement-webinar-public-service-commission-of-canada-x-gdg-concordia/',
      partners: t(
        'with the Public Service Commission of Canada',
        'avec la Commission de la fonction publique du Canada',
      ),
    },
    {
      date: '2026-11-06',
      name: 'DevFest MTL ’26',
      url: 'https://gdg.community.dev/events/details/google-gdg-montreal-presents-devfest-mtl-26/cohost-gdg-on-campus-concordia-university-montreal-canada',
      partners: t('with GDG Montreal', 'avec GDG Montréal'),
    },
  ] satisfies ChapterEvent[],
};
