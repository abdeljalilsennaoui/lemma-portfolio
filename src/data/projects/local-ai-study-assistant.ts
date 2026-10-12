import { t } from '../../i18n';
import type { Project } from '../../types/content';
import app from '../../assets/projects/local-ai-study-assistant/app.png';

const notes = t('Repository documentation', 'Documentation du dépôt');

export const localAiStudyAssistant: Project = {
  slug: 'local-ai-study-assistant',
  order: 4,
  title: 'Local AI Study Assistant',
  shortTitle: 'Study Assistant',
  summary: t(
    'A study tool that turns lecture PDFs into summaries, flashcards, quizzes and sourced answers, using a language model that runs entirely on the student’s own machine.',
    "Un outil d'étude qui transforme des PDF de cours en résumés, fiches, quiz et réponses appuyées sur leurs sources, grâce à un modèle de langage qui s'exécute entièrement sur l'ordinateur de l'étudiant.",
  ),

  context: {
    kind: 'solo',
    label: t('Solo project', 'Projet individuel'),
  },
  period: t('August 2026', 'Août 2026'),
  disciplines: ['backend', 'architecture', 'testing', 'cicd', 'data'],

  stack: ['Python', 'Streamlit', 'Ollama', 'scikit-learn', 'pypdf', 'pytest', 'GitHub Actions'],
  technologies: [
    {
      group: t('Application', 'Application'),
      items: ['Python 3.11+', 'Streamlit', 'Ollama (local HTTP API)', 'requests', 'pypdf', 'scikit-learn'],
    },
    {
      group: t('Testing and CI', 'Tests et intégration continue'),
      items: ['pytest', 'ruff', 'GitHub Actions', 'Make'],
    },
  ],

  repository: {
    url: 'https://github.com/abdeljalilsennaoui/local-ai-study-assistant',
    label: 'abdeljalilsennaoui/local-ai-study-assistant',
  },

  cover: {
    src: app,
    alt: t(
      'The study assistant in a browser. A sidebar shows “Connected to Ollama”, the selected model and retrieval settings. The main panel has one lecture PDF loaded, a notice that about 13,277 characters of text were extracted, four study modes with Summary selected, and the start of a generated summary.',
      "L'assistant d'étude dans un navigateur. Un panneau latéral indique « Connected to Ollama », le modèle choisi et les réglages de recherche. Le panneau principal montre un PDF de cours chargé, un avis signalant qu'environ 13 277 caractères de texte ont été extraits, quatre modes d'étude dont « Summary » est sélectionné, et le début d'un résumé généré.",
    ),
    caption: t(
      'A lecture PDF loaded and summarised on the device. The interface says how much text was extracted and warns when a long document is truncated.',
      "Un PDF de cours chargé et résumé sur l'appareil. L'interface indique la quantité de texte extraite et prévient lorsqu'un long document est tronqué.",
    ),
  },

  overview: [
    t(
      'The assistant takes lecture PDFs or pasted notes and produces four things: a structured summary, flashcards, a multiple-choice quiz, and answers to questions about the material with the passages they were drawn from. The language model is served by Ollama on the same machine, so no document leaves it. There are no API keys, no cloud service, no database and no tracking.',
      "L'assistant reçoit des PDF de cours ou des notes collées et produit quatre choses : un résumé structuré, des fiches de révision, un quiz à choix multiples et des réponses aux questions sur la matière, accompagnées des passages dont elles sont tirées. Le modèle de langage est servi par Ollama sur la même machine : aucun document n'en sort. Il n'y a ni clé d'API, ni service infonuagique, ni base de données, ni suivi.",
    ),
    t(
      'I wrote the retrieval pipeline myself instead of using a framework — extraction, cleaning, chunking, ranking — so that I can explain and test every stage.',
      "J'ai écrit moi-même la chaîne de recherche documentaire plutôt que d'employer un cadriciel — extraction, nettoyage, découpage, classement — afin de pouvoir expliquer et tester chaque étape.",
    ),
  ],

  problem: [
    t(
      'The tools students use to revise from lecture notes generally require uploading those notes to someone else’s server. For course material that is often not permitted, and it is not free at scale.',
      "Les outils qu'utilisent les étudiants pour réviser à partir de notes de cours exigent généralement de téléverser ces notes sur le serveur d'un tiers. Pour du matériel de cours, c'est souvent interdit, et ce n'est pas gratuit à grande échelle.",
    ),
    t(
      'A model small enough to run on a laptop brings its own problems: a whole chapter does not fit in its context window, and its structured output is unreliable.',
      "Un modèle assez petit pour tourner sur un portable amène ses propres difficultés : un chapitre entier ne tient pas dans sa fenêtre de contexte, et ses sorties structurées sont peu fiables.",
    ),
  ],

  goals: [
    t(
      'Keep every document on the user’s machine: process in memory, write nothing to disk, contact only the local model server.',
      "Garder chaque document sur la machine de l'utilisateur : traiter en mémoire, ne rien écrire sur le disque, ne contacter que le serveur local du modèle.",
    ),
    t(
      'Answer questions only from the uploaded material, and show the passages an answer came from.',
      "Ne répondre aux questions qu'à partir du matériel fourni, et montrer les passages d'où provient une réponse.",
    ),
    t(
      'Never show a broken result: validate what the model returns and fall back to something readable.',
      "Ne jamais afficher un résultat défectueux : valider ce que le modèle renvoie et se rabattre sur quelque chose de lisible.",
    ),
    t(
      'Make the whole pipeline testable without the interface and without a model running.',
      "Rendre toute la chaîne testable sans l'interface et sans modèle en cours d'exécution.",
    ),
  ],

  architecture: {
    body: [
      t(
        'The Streamlit file does presentation only. The logic lives in a package of small modules — document loading, text processing, retrieval, prompts, the Ollama client and response parsing — coordinated by a service layer.',
        "Le fichier Streamlit ne s'occupe que de la présentation. La logique réside dans un paquet de petits modules — chargement des documents, traitement du texte, recherche, invites, client Ollama et analyse des réponses — coordonnés par une couche de service.",
      ),
      t(
        'For question answering, documents are split into overlapping chunks of about 1,500 characters that end on paragraph or sentence boundaries where possible. A TF-IDF matrix is built over the chunks, the question is scored against each one by cosine similarity, and only the top few are sent to the model with instructions to answer from them alone. If nothing matches, the “not found” answer is returned without calling the model at all.',
        "Pour répondre aux questions, les documents sont découpés en segments chevauchants d'environ 1 500 caractères qui se terminent, dans la mesure du possible, à une fin de paragraphe ou de phrase. Une matrice TF-IDF est construite sur ces segments, la question est comparée à chacun par similarité cosinus, et seuls les meilleurs sont transmis au modèle avec la consigne de ne répondre qu'à partir d'eux. Si rien ne correspond, la réponse « introuvable » est renvoyée sans même appeler le modèle.",
      ),
    ],
    diagram: {
      caption: t(
        'The pipeline, from the repository’s architecture document. The local Ollama server is the only network endpoint the application contacts.',
        "La chaîne de traitement, d'après le document d'architecture du dépôt. Le serveur Ollama local est le seul point d'accès réseau que l'application contacte.",
      ),
      layers: [
        {
          label: t('Presentation', 'Présentation'),
          nodes: [{ name: 'app.py', detail: t('Streamlit interface', 'Interface Streamlit') }],
        },
        {
          label: t('Ingestion', 'Ingestion'),
          nodes: [
            { name: 'document_loader', detail: t('PDF and pasted text, in memory', 'PDF et texte collé, en mémoire') },
            { name: 'text_processing', detail: t('Cleaning and chunking', 'Nettoyage et découpage') },
          ],
        },
        {
          label: t('Orchestration', 'Orchestration'),
          nodes: [
            { name: 'study_service' },
            { name: 'retrieval', detail: t('TF-IDF, cosine similarity', 'TF-IDF, similarité cosinus') },
            { name: 'prompts' },
          ],
        },
        {
          label: t('Model', 'Modèle'),
          nodes: [
            { name: 'ollama_client', detail: t('HTTP to localhost', 'HTTP vers localhost') },
            { name: 'response_parser', detail: t('JSON extraction and validation', 'Extraction et validation du JSON') },
          ],
        },
      ],
    },
  },

  role: {
    summary: t(
      'This is a solo project. I designed it, wrote it and tested it.',
      "Il s'agit d'un projet individuel. Je l'ai conçu, écrit et testé.",
    ),
    contributions: [
      t(
        'The ingestion and retrieval pipeline: in-memory PDF extraction, text cleaning, overlapping chunking and TF-IDF ranking.',
        "La chaîne d'ingestion et de recherche : extraction de PDF en mémoire, nettoyage du texte, découpage chevauchant et classement TF-IDF.",
      ),
      t(
        'The Ollama HTTP client, with an exception hierarchy that turns each failure into a readable message.',
        "Le client HTTP pour Ollama, doté d'une hiérarchie d'exceptions qui transforme chaque échec en message lisible.",
      ),
      t(
        'Prompt construction and defensive parsing of the model’s JSON output.',
        "La construction des invites et l'analyse défensive des sorties JSON du modèle.",
      ),
      t(
        'The Streamlit interface, the test suite and the CI workflow.',
        "L'interface Streamlit, la suite de tests et le workflow d'intégration continue.",
      ),
    ],
    evidence: t(
      'Every commit in the repository is mine.',
      'Tous les commits du dépôt sont les miens.',
    ),
  },

  decisions: [
    {
      title: t('TF-IDF instead of embeddings', "TF-IDF plutôt que des plongements"),
      body: t(
        'TF-IDF needs no model download, no vector database and no cost, and its scores can be inspected and debugged. What it gives up is semantic matching: it compares words, not meaning, so a question phrased in different vocabulary than the source retrieves worse. The interface and the documentation say so.',
        "TF-IDF ne demande ni téléchargement de modèle, ni base de données vectorielle, ni dépense, et ses scores peuvent être examinés et débogués. Ce qu'on y perd : la correspondance sémantique. La méthode compare des mots et non du sens; une question formulée dans un autre vocabulaire que la source donne donc de moins bons résultats. L'interface et la documentation le disent.",
      ),
    },
    {
      title: t('No framework for a four-step pipeline', 'Pas de cadriciel pour une chaîne en quatre étapes'),
      body: t(
        'Chunk, vectorise, rank, ground: four steps. Writing them directly keeps the dependency list short and means I can account for each one. The cost is a few convenience helpers I would otherwise have had for free.',
        "Découper, vectoriser, classer, ancrer : quatre étapes. Les écrire directement garde la liste des dépendances courte et me permet de rendre compte de chacune. Le prix : quelques utilitaires pratiques que j'aurais autrement eus gratuitement.",
      ),
    },
    {
      title: t('An injected HTTP session', 'Une session HTTP injectée'),
      body: t(
        'The Ollama client takes its requests.Session through the constructor. Tests pass in a fake that returns canned responses or raises the exact exception under test, so nothing is patched and no fake server runs. The service layer takes a client in the same way, which lets a test assert on the prompt that would have been sent.',
        "Le client Ollama reçoit sa requests.Session par le constructeur. Les tests y injectent un faux objet qui renvoie des réponses préparées ou lève précisément l'exception à l'essai : rien n'est remplacé à chaud et aucun faux serveur ne tourne. La couche de service reçoit un client de la même façon, ce qui permet à un test de vérifier l'invite qui aurait été envoyée.",
      ),
    },
    {
      title: t('Validate the model’s JSON, then fall back', 'Valider le JSON du modèle, puis se rabattre'),
      body: t(
        'Local models often wrap JSON in Markdown fences or put a sentence before it. The parser strips fences, slices from the first bracket to the last, then checks the shape: a quiz question needs exactly four non-empty choices and a correct answer that matches one of them. If that fails, the user sees the error and the raw response, not a broken quiz.',
        "Les modèles locaux enveloppent souvent le JSON dans des balises Markdown ou le font précéder d'une phrase. L'analyseur retire les balises, découpe du premier crochet au dernier, puis vérifie la structure : une question de quiz doit comporter exactement quatre choix non vides et une bonne réponse qui correspond à l'un d'eux. En cas d'échec, l'utilisateur voit l'erreur et la réponse brute, et non un quiz défectueux.",
      ),
    },
    {
      title: t('Uploaded documents are untrusted input', 'Les documents téléversés sont des entrées non fiables'),
      body: t(
        'A PDF can contain text that reads like an instruction. Document text is wrapped in explicit delimiters and the system message declares everything inside to be reference material, never instructions. This reduces the risk; it does not remove it, and the documentation does not claim otherwise.',
        "Un PDF peut contenir du texte qui ressemble à une consigne. Le texte des documents est encadré de délimiteurs explicites, et le message système déclare que tout ce qui s'y trouve est du matériel de référence, jamais des instructions. Cela réduit le risque sans l'éliminer, et la documentation ne prétend pas le contraire.",
      ),
    },
  ],

  testing: [
    t(
      'Six test modules with 71 test functions. Every HTTP call is replaced by an injected fake, so the suite needs no Ollama, no network and no external PDF, and it runs in GitHub Actions together with the ruff linter on every push and pull request.',
      "Six modules de test totalisant 71 fonctions de test. Chaque appel HTTP est remplacé par un faux objet injecté : la suite n'a besoin ni d'Ollama, ni du réseau, ni de PDF externe, et elle s'exécute dans GitHub Actions avec l'analyseur ruff à chaque poussée et à chaque demande de tirage.",
    ),
    t(
      'The tests cover the code around the model, not the model. There is no end-to-end test against a live model, because that would make the pipeline depend on Ollama being installed on the runner.',
      "Les tests couvrent le code qui entoure le modèle, et non le modèle. Il n'existe pas de test de bout en bout avec un modèle réel, car le pipeline dépendrait alors de la présence d'Ollama sur l'exécuteur.",
    ),
  ],

  challenges: [
    {
      title: t('A timeout reported as “not running”', "Un délai d'attente signalé comme « arrêté »"),
      body: t(
        'In the requests library, ConnectTimeout inherits from both ConnectionError and Timeout. With the except blocks in the wrong order, every connect timeout was reported as “Ollama is not running”, which sends a user looking in the wrong place. The order is fixed and a test now pins it.',
        "Dans la bibliothèque requests, ConnectTimeout hérite à la fois de ConnectionError et de Timeout. Avec les blocs except dans le mauvais ordre, chaque délai de connexion dépassé était signalé comme « Ollama n'est pas en cours d'exécution », ce qui envoyait l'utilisateur chercher au mauvais endroit. L'ordre est corrigé et un test le fige désormais.",
      ),
    },
    {
      title: t('A chunking loop that must terminate', 'Une boucle de découpage qui doit se terminer'),
      body: t(
        'With overlap, the next chunk starts before the previous one ends, and a careless configuration could leave the cursor standing still. The next start is always at least one character further on, and an overlap as large as the chunk size is rejected up front. Both rules are covered by tests.',
        "Avec le chevauchement, le segment suivant commence avant la fin du précédent, et une configuration imprudente pourrait immobiliser le curseur. Le début suivant avance toujours d'au moins un caractère, et un chevauchement aussi grand que la taille du segment est refusé d'emblée. Ces deux règles sont couvertes par des tests.",
      ),
    },
  ],

  results: {
    rows: [
      {
        label: t('Study modes', "Modes d'étude"),
        value: t('4: summary, flashcards, quiz, question answering', '4 : résumé, fiches, quiz, questions-réponses'),
        source: notes,
      },
      {
        label: t('Automated tests', 'Tests automatisés'),
        value: t('71 test functions in 6 modules', '71 fonctions de test dans 6 modules'),
        source: t('Counted in the repository', 'Compté dans le dépôt'),
      },
      {
        label: t('Continuous integration', 'Intégration continue'),
        value: t('Lint and tests; latest run succeeded', 'Analyse et tests; dernière exécution réussie'),
        source: t('GitHub Actions, checked 12 October 2026', 'GitHub Actions, vérifié le 12 octobre 2026'),
      },
      {
        label: t('Network endpoints contacted', "Points d'accès réseau contactés"),
        value: t('1, on localhost', '1, sur localhost'),
        source: notes,
      },
    ],
    note: t(
      'There are no benchmark or accuracy figures here because none were measured.',
      "Aucun chiffre de performance ou d'exactitude ne figure ici, car aucun n'a été mesuré.",
    ),
  },

  limitations: [
    t(
      'No OCR: scanned PDFs with no extractable text are rejected with a clear message.',
      "Aucune reconnaissance optique : les PDF numérisés sans texte extractible sont refusés avec un message clair.",
    ),
    t(
      'Summary, flashcard and quiz modes use only the first 12,000 characters or so of a long document, and the interface says when that happens.',
      "Les modes résumé, fiches et quiz n'utilisent que les 12 000 premiers caractères environ d'un long document, et l'interface le signale.",
    ),
    t(
      'Output quality is bounded by whichever local model the user has installed.',
      "La qualité des résultats dépend du modèle local que l'utilisateur a installé.",
    ),
  ],
};
