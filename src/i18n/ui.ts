import { t, type Localized } from './index';

/**
 * Interface copy: everything that is not project content. Project content
 * lives in `src/data/projects/`.
 */
export const ui = {
  skipToContent: t('Skip to content', 'Aller au contenu'),

  nav: {
    label: t('Main', 'Principale'),
    work: t('Work', 'Projets'),
    about: t('About', 'À propos'),
    engineering: t('Engineering', 'Ingénierie'),
    contact: t('Contact', 'Contact'),
    home: t('home', 'accueil'),
    openMenu: t('Open menu', 'Ouvrir le menu'),
    closeMenu: t('Close menu', 'Fermer le menu'),
    language: t('Language', 'Langue'),
    switchToLight: t('Switch to light theme', 'Passer au thème clair'),
    switchToDark: t('Switch to dark theme', 'Passer au thème sombre'),
  },

  hero: {
    lemma: t('Lemma', 'Lemme'),
    proof: t('Proof', 'Démonstration'),
    proofBody: t(
      'Software designed, built and tested by Abdeljalil Sennaoui. Each of the four projects below states a problem, gives a construction, and shows the evidence that it holds.',
      "Des logiciels conçus, développés et testés par Abdeljalil Sennaoui. Chacun des quatre projets ci-dessous énonce un problème, propose une construction et montre les preuves qu'elle tient.",
    ),
    endOfProof: t('End of proof', 'Fin de la démonstration'),
    explore: t('Explore projects', 'Explorer les projets'),
    github: t('View GitHub', 'Voir GitHub'),
    footnote: t(
      'In mathematics, a lemma is a proven result used as a step toward a larger theorem.',
      'En mathématiques, un lemme est un résultat démontré qui sert d’étape vers un théorème plus vaste.',
    ),
    footnoteLabel: t('Note', 'Note'),
  },

  relation: {
    title: t('Projects and the disciplines they exercised', 'Les projets et les disciplines qu’ils ont mobilisées'),
    projects: t('Projects', 'Projets'),
    disciplines: t('Disciplines', 'Disciplines'),
    graph: t('Graph', 'Graphe'),
    matrix: t('Matrix', 'Matrice'),
    viewLabel: t('Representation', 'Représentation'),
    caption: t(
      'Projects against the disciplines they exercised. A filled square means the project did the work; the same relation can be read as a graph.',
      'Les projets et les disciplines qu’ils ont mobilisées. Un carré plein signifie que le projet a fait le travail; la même relation se lit aussi comme un graphe.',
    ),
    yes: t('yes', 'oui'),
    no: t('no', 'non'),
  },

  work: {
    title: t('Selected work', 'Projets choisis'),
    intro: t(
      'Four projects, each with a case study. Team projects say what the team built and, separately, what I built.',
      "Quatre projets, chacun accompagné d'une étude de cas. Pour les projets d'équipe, on distingue ce que l'équipe a réalisé et ce que j'ai réalisé.",
    ),
    lemma: t('Lemma', 'Lemme'),
    caseStudy: t('Read the case study', "Lire l'étude de cas"),
    repository: t('Repository on GitHub', 'Dépôt sur GitHub'),
    diagramBadge: t('Architecture diagram', "Schéma d'architecture"),
    figure: t('Figure', 'Figure'),
    table: t('Table', 'Tableau'),
    opensInNewTab: t('opens in a new tab', 'ouvre un nouvel onglet'),
  },

  about: {
    title: t('About', 'À propos'),
    definition: t('Definition', 'Définition'),
    definitionBody: t(
      'An independent software engineering studio of one: the name under which Abdeljalil Sennaoui publishes the software he designs, builds and tests.',
      "Un studio indépendant de génie logiciel, composé d'une seule personne : le nom sous lequel Abdeljalil Sennaoui publie les logiciels qu'il conçoit, développe et teste.",
    ),
    remark: t('Remark', 'Remarque'),
    remarkBody: t(
      'LEMMA is a personal identity, not a company. There are no employees and no clients, and every project here is one I worked on myself. Where a project was built by a team, its case study says so and separates my part from the rest.',
      "LEMMA est une identité personnelle, pas une entreprise. Il n'y a ni employés ni clients, et chaque projet présenté ici en est un auquel j'ai moi-même travaillé. Lorsqu'un projet a été réalisé en équipe, son étude de cas le précise et distingue ma part du reste.",
    ),
    paragraphs: [
      t(
        'I’m Abdeljalil Sennaoui, a Software Engineering student at Concordia University in Montreal. I like the parts of software that have right answers: rules that must hold, tests that prove they do, and systems that keep working when something around them fails.',
        "Je m'appelle Abdeljalil Sennaoui et j'étudie en génie logiciel à l'Université Concordia, à Montréal. J'aime les parties du logiciel qui ont de bonnes réponses : des règles qui doivent tenir, des tests qui le prouvent, et des systèmes qui continuent de fonctionner quand quelque chose flanche autour d'eux.",
      ),
      t(
        'My interests are back-end and full-stack development, software testing and QA automation, and software architecture. Most of what I build ends up with a pipeline around it, because I trust a result more once a machine has checked it.',
        "Je m'intéresse au développement back-end et full-stack, aux tests logiciels et à l'automatisation de l'assurance qualité, ainsi qu'à l'architecture logicielle. Presque tout ce que je construis finit entouré d'un pipeline, parce que je fais davantage confiance à un résultat une fois qu'une machine l'a vérifié.",
      ),
      t(
        'The name comes from discrete mathematics. A lemma is a result you prove on the way to something larger, and that is how I think about each project.',
        "Le nom vient des mathématiques discrètes. Un lemme est un résultat que l'on démontre en route vers quelque chose de plus grand, et c'est ainsi que je conçois chaque projet.",
      ),
    ],
    facts: {
      name: t('Name', 'Nom'),
      studies: t('Studies', 'Études'),
      studiesValue: t('Software Engineering, Concordia University', 'Génie logiciel, Université Concordia'),
      location: t('Based in', 'Établi à'),
      links: t('Links', 'Liens'),
    },
    resume: t('Résumé (PDF)', 'Curriculum vitæ (PDF)'),
  },

  engineering: {
    title: t('Engineering', 'Ingénierie'),
    intro: t(
      'How I work, and what I have worked with. Each skill links to a place where you can see it in use.',
      "Ma façon de travailler, et les outils que j'ai employés. Chaque compétence renvoie à un endroit où on peut la voir à l'œuvre.",
    ),
    principles: t('Principles', 'Principes'),
    skills: t('Skills', 'Compétences'),
    evidenceHint: t(
      'Skills, and where each can be seen in use. L1 to L4 cite the lemmas above.',
      "Les compétences, et l'endroit où chacune peut être vue à l'œuvre. L1 à L4 renvoient aux lemmes ci-dessus.",
    ),
    area: t('Area', 'Domaine'),
    skillsHead: t('Skills and evidence', 'Compétences et preuves'),
  },

  contact: {
    title: t('Contact', 'Contact'),
    heading: t('Get in touch', 'Écrivez-moi'),
    body: t(
      'I’m interested in software engineering internships, co-op placements and junior roles, and I’m glad to talk about any project on this site. Email is the best way to reach me.',
      "Je m'intéresse aux stages en génie logiciel, aux placements coopératifs et aux postes de niveau débutant, et je discute volontiers de n'importe quel projet présenté sur ce site. Le courriel reste le meilleur moyen de me joindre.",
    ),
    email: t('Email', 'Courriel'),
    github: t('GitHub', 'GitHub'),
    linkedin: t('LinkedIn', 'LinkedIn'),
  },

  footer: {
    tagline: t(
      'Personal software engineering projects by Abdeljalil Sennaoui.',
      'Projets personnels de génie logiciel par Abdeljalil Sennaoui.',
    ),
    source: t('Source of this site', 'Code source de ce site'),
    backToTop: t('Back to top', 'Haut de la page'),
  },

  caseStudy: {
    allWork: t('All work', 'Tous les projets'),
    contents: t('On this page', 'Sur cette page'),
    meta: {
      context: t('Context', 'Contexte'),
      period: t('Period', 'Période'),
      repository: t('Repository', 'Dépôt'),
      demo: t('Live demo', 'Démo en ligne'),
    },
    sections: {
      overview: t('Overview', 'Aperçu'),
      problem: t('Problem', 'Problème'),
      goals: t('Goals', 'Objectifs'),
      technologies: t('Technologies', 'Technologies'),
      architecture: t('Architecture', 'Architecture'),
      role: t('My responsibilities', 'Mes responsabilités'),
      decisions: t('Engineering decisions', "Décisions d'ingénierie"),
      testing: t('Testing and quality', 'Tests et qualité'),
      challenges: t('Challenges', 'Défis'),
      results: t('Results', 'Résultats'),
      links: t('Repository and links', 'Dépôt et liens'),
    },
    results: {
      measure: t('Measure', 'Mesure'),
      value: t('Result', 'Résultat'),
      source: t('Source', 'Source'),
    },
    limitations: t('What this does not show', 'Ce que cela ne démontre pas'),
    noDemo: t(
      'There is no hosted demo for this project. The repository explains how to run it.',
      "Ce projet n'a pas de démo hébergée. Le dépôt explique comment l'exécuter.",
    ),
    next: t('Next', 'Suivant'),
    previous: t('Previous', 'Précédent'),
    endOfProof: t('End of case study', "Fin de l'étude de cas"),
    titleSuffix: t('Case study', 'Étude de cas'),
  },

  notFound: {
    title: t('Page not found', 'Page introuvable'),
    body: t(
      'There is nothing at this address. It may have moved, or the link may be mistyped.',
      "Il n'y a rien à cette adresse. La page a peut-être été déplacée, ou le lien contient une erreur.",
    ),
    home: t('Go to the home page', "Aller à la page d'accueil"),
  },
} satisfies Record<string, unknown>;

export type { Localized };
