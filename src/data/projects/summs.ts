import { t } from '../../i18n';
import type { Project } from '../../types/content';

const architectureDocs = t(
  'Architecture documents in the repository',
  "Documents d'architecture du dépôt",
);

// The repository holds design diagrams but no screenshot of the running app,
// so this project shows its architecture diagram instead of a cover image.
export const summs: Project = {
  slug: 'summs',
  order: 3,
  title: 'SUMMS — Smart Urban Mobility Management System',
  shortTitle: 'SUMMS',
  summary: t(
    'A web platform that puts bike-sharing, car-sharing, scooters, parking and transit information behind one booking flow, with every request passing through the same strict MVC chain.',
    "Une plateforme Web qui réunit vélopartage, autopartage, trottinettes, stationnement et information sur le transport en commun dans un seul parcours de réservation, où chaque requête suit la même chaîne MVC rigoureuse.",
  ),

  context: {
    kind: 'team',
    label: t('Team of 6, university course project', 'Équipe de 6, projet de cours universitaire'),
    teamSize: 6,
  },
  period: t('February – April 2026', 'Février – avril 2026'),
  disciplines: ['backend', 'frontend', 'architecture', 'testing', 'cicd', 'data'],

  stack: ['React', 'Node.js', 'Express', 'Firestore', 'Firebase Auth', 'Jest', 'Supertest', 'GitHub Actions'],
  technologies: [
    {
      group: t('Front end', 'Interface Web'),
      items: ['React 18', 'Vite', 'React Router', 'Tailwind CSS', 'Radix UI', 'Recharts', 'Google Maps JavaScript API'],
    },
    {
      group: t('Back end', 'Serveur'),
      items: ['Node.js', 'Express', 'Firebase Admin SDK', 'Firestore', 'Firebase Authentication', 'Zod'],
    },
    {
      group: t('Testing and CI', 'Tests et intégration continue'),
      items: ['Jest', 'Supertest', 'ESLint', 'Prettier', 'GitHub Actions', 'SonarQube Cloud'],
    },
  ],

  repository: {
    url: 'https://github.com/abdeljalilsennaoui/SOEN343-Project-W26',
    label: 'abdeljalilsennaoui/SOEN343-Project-W26',
  },

  overview: [
    t(
      'SUMMS is a platform for urban mobility services. A commuter searches for a bike, car or scooter, books it, pays and completes the ride; a mobility provider manages a fleet; city and system administrators read analytics. Parking and transit information sit alongside. It was built by a team of six for a software architecture and design course, so the brief was as much about how the system is structured as about what it does.',
      "SUMMS est une plateforme de services de mobilité urbaine. Un usager cherche un vélo, une voiture ou une trottinette, le réserve, paie et termine son trajet; un fournisseur de mobilité gère son parc; les administrateurs de la ville et du système consultent des analyses. S'y ajoutent des informations sur le stationnement et le transport en commun. Réalisée par une équipe de six dans le cadre d'un cours d'architecture et de conception logicielles, elle devait soigner autant la structure du système que ses fonctions.",
    ),
    t(
      'The repository is under my account. I set the project up, wrote most of the back-end architecture and its tests, and a large share of the front end.',
      "Le dépôt se trouve sur mon compte. J'ai mis le projet sur pied, écrit l'essentiel de l'architecture du serveur et de ses tests, ainsi qu'une bonne part de l'interface Web.",
    ),
  ],

  problem: [
    t(
      'Each mobility service has its own rules: a vehicle can only be booked by one person for a given window, a booking moves through states and must never skip one, prices change at peak hours, and four kinds of user see different things. Written naively, those rules end up scattered across route handlers as conditionals, and every new feature touches all of them.',
      "Chaque service de mobilité a ses propres règles : un véhicule ne peut être réservé que par une personne pour une plage donnée, une réservation passe d'un état à l'autre sans jamais en sauter, les prix changent aux heures de pointe, et quatre types d'utilisateurs voient des choses différentes. Écrites naïvement, ces règles finissent éparpillées en conditions dans les gestionnaires de routes, et chaque nouvelle fonction les touche toutes.",
    ),
  ],

  goals: [
    t(
      'Route every request through one chain — controller, request handler, command, service, data gateway — with no shortcuts.',
      'Faire passer chaque requête par une seule chaîne — contrôleur, gestionnaire de requêtes, commande, service, passerelle de données — sans raccourci.',
    ),
    t(
      'Use design patterns where they remove a real problem, and document what each one is for.',
      "Recourir aux patrons de conception là où ils éliminent un vrai problème, et documenter l'utilité de chacun.",
    ),
    t(
      'Keep external services — maps, parking, transit, payment — behind interfaces with mock implementations, so the system runs and tests without them.',
      'Placer les services externes — cartes, stationnement, transport en commun, paiement — derrière des interfaces dotées de versions simulées, pour que le système fonctionne et se teste sans eux.',
    ),
    t(
      'Restrict what each of the four roles can see and do, on the server and in the interface.',
      "Limiter ce que chacun des quatre rôles peut voir et faire, sur le serveur comme dans l'interface.",
    ),
  ],

  architecture: {
    body: [
      t(
        'A React front end talks to an Express API. Inside the API, a request becomes a typed request object, the handler looks up the matching command in a registry, the command calls one method on the service that holds all business logic, and the service reads and writes through a data gateway that hides Firestore’s document format.',
        "Une interface React dialogue avec une API Express. Dans l'API, une requête devient un objet de requête typé, le gestionnaire trouve la commande correspondante dans un registre, la commande appelle une méthode du service qui détient toute la logique d'affaires, et ce service lit et écrit par l'entremise d'une passerelle de données qui masque le format des documents Firestore.",
      ),
      t(
        'Eight patterns are in use. A booking’s lifecycle is a state machine in which each state permits only its own transitions, so an illegal one is refused before any write or charge. Pricing is a strategy that can be swapped at run time. Analytics are decoupled twice: an event bus keeps tracking out of the business logic, and visitors add new operations over the event classes without editing them.',
        "Huit patrons sont utilisés. Le cycle de vie d'une réservation est une machine à états où chaque état n'autorise que ses propres transitions : une transition illégale est refusée avant toute écriture ou tout débit. La tarification est une stratégie interchangeable à l'exécution. Les analyses sont découplées à deux titres : un bus d'événements tient le suivi à l'écart de la logique d'affaires, et des visiteurs ajoutent de nouvelles opérations aux classes d'événements sans les modifier.",
      ),
    ],
    diagram: {
      caption: t(
        'The path of one request through the back end, from the repository’s architecture documents.',
        "Le parcours d'une requête dans le serveur, d'après les documents d'architecture du dépôt.",
      ),
      layers: [
        {
          label: t('View', 'Vue'),
          nodes: [{ name: 'React', detail: t('Pages for four roles', 'Pages pour quatre rôles') }],
        },
        {
          label: t('Controller', 'Contrôleur'),
          nodes: [
            { name: 'MobilityController', detail: t('HTTP only', 'HTTP seulement') },
            { name: 'MobilityRequestHandler', detail: t('Looks up the command', 'Trouve la commande') },
            { name: 'Commands', detail: t('23 classes, one per request type', '23 classes, une par type de requête') },
          ],
        },
        {
          label: t('Model', 'Modèle'),
          nodes: [
            { name: 'MobilityService', detail: t('All business logic', "Toute la logique d'affaires") },
            { name: 'BookingStateMachine', detail: t('State', 'État') },
            { name: 'Pricing', detail: t('Strategy', 'Stratégie') },
            { name: 'EventBus', detail: t('Observer', 'Observateur') },
          ],
        },
        {
          label: t('Data and gateways', 'Données et passerelles'),
          nodes: [
            { name: 'MobilityDataGateway', detail: t('Adapter over Firestore', 'Adaptateur vers Firestore') },
            { name: 'Gateways', detail: t('Maps, parking, transit, payment', 'Cartes, stationnement, transport, paiement') },
          ],
        },
      ],
    },
  },

  role: {
    summary: t(
      'A team project with six members, in a repository I created and maintained. My part:',
      "Un projet d'équipe de six membres, dans un dépôt que j'ai créé et tenu à jour. Ma part :",
    ),
    contributions: [
      t(
        'The initial setup: the Express API, the React front end and the CI pipeline.',
        "La mise en place initiale : l'API Express, l'interface React et le pipeline d'intégration continue.",
      ),
      t(
        'The move to Firestore with Firebase Authentication, and the booking system on top of it.',
        "Le passage à Firestore avec Firebase Authentication, puis le système de réservation bâti par-dessus.",
      ),
      t(
        'The MVC refactor that put every request through the full chain, and the State, Strategy, Command and Visitor implementations.',
        "La refonte MVC qui fait passer chaque requête par la chaîne complète, et les mises en œuvre des patrons État, Stratégie, Commande et Visiteur.",
      ),
      t(
        'Ride sharing for car bookings, provider fleet management, capacity-based availability, and role-based guards on routes and navigation.',
        "Le covoiturage pour les réservations de voitures, la gestion du parc des fournisseurs, la disponibilité fondée sur la capacité et les contrôles d'accès par rôle sur les routes et la navigation.",
      ),
      t(
        'The test infrastructure: a stateful in-memory Firestore mock, integration tests for the booking lifecycle and access control, and the SonarQube Cloud analysis job.',
        "L'infrastructure de test : une simulation de Firestore en mémoire qui conserve son état, des tests d'intégration du cycle de vie des réservations et du contrôle d'accès, et la tâche d'analyse SonarQube Cloud.",
      ),
    ],
    evidence: t(
      '61 of the 151 non-merge commits are mine, including the booking state machine and most of the tests. Teammates built other parts of the commands, the front end, the pricing strategies and the report.',
      "61 des 151 commits (hors fusions) sont les miens, dont la machine à états des réservations et la majorité des tests. Des coéquipiers ont réalisé d'autres parties des commandes, de l'interface, des stratégies de tarification et du rapport.",
    ),
  },

  decisions: [
    {
      title: t('Illegal transitions fail before anything is written', "Les transitions illégales échouent avant toute écriture"),
      body: t(
        'The base booking state rejects every action with a 409; each concrete state overrides only the transitions it allows, and the two terminal states override none. The service rebuilds the state machine from the booking’s stored status before each attempt, so a booking cannot be completed twice or confirmed after it failed, and no payment is charged for a transition that was never valid.',
        "L'état de base d'une réservation rejette toute action par un 409; chaque état concret ne redéfinit que les transitions qu'il autorise, et les deux états terminaux n'en redéfinissent aucune. Le service reconstruit la machine à états à partir du statut enregistré avant chaque tentative : une réservation ne peut donc pas être terminée deux fois ni confirmée après un échec, et aucun paiement n'est débité pour une transition qui n'a jamais été valide.",
      ),
    },
    {
      title: t('One command per request type, no switch statement', "Une commande par type de requête, sans instruction switch"),
      body: t(
        'Each of the 23 request types is its own class holding a reference to the service, registered by name. The handler looks a command up and calls execute; it never imports the service or knows what the command does. Adding a request type means adding a class and one registry entry.',
        "Chacun des 23 types de requête est une classe à part qui détient une référence au service et s'inscrit par son nom. Le gestionnaire trouve la commande et appelle execute; il n'importe jamais le service et ignore ce que fait la commande. Ajouter un type de requête revient à ajouter une classe et une entrée au registre.",
      ),
    },
    {
      title: t('One read instead of one per option', 'Une seule lecture plutôt qu’une par option'),
      body: t(
        'Availability was first checked with one Firestore call per mobility option. A batch check now reads the draft and active bookings once and filters in memory. To stay within Firestore’s daily read quota I also throttled the refreshes triggered by window focus, updated parking spots optimistically instead of re-fetching them, and put limits on the analytics queries.',
        "La disponibilité était d'abord vérifiée par un appel à Firestore pour chaque option de mobilité. Une vérification groupée lit désormais une seule fois les réservations provisoires et actives, puis filtre en mémoire. Pour respecter le quota quotidien de lectures de Firestore, j'ai aussi espacé les actualisations déclenchées par le retour sur la fenêtre, mis à jour les places de stationnement de façon optimiste plutôt que de les recharger, et plafonné les requêtes d'analyse.",
      ),
    },
    {
      title: t('Every external service has a mock twin', 'Chaque service externe a son double simulé'),
      body: t(
        'Maps, parking, transit, payment and weather each sit behind an interface chosen by a factory. Parking and transit have real implementations over open data; all five have mocks. The system runs with no third-party account, and tests never reach the network.',
        "Cartes, stationnement, transport en commun, paiement et météo se trouvent chacun derrière une interface choisie par une fabrique. Le stationnement et le transport en commun disposent de versions réelles s'appuyant sur des données ouvertes; les cinq ont une version simulée. Le système fonctionne sans aucun compte tiers, et les tests n'atteignent jamais le réseau.",
      ),
    },
  ],

  testing: [
    t(
      'The back end has 298 test cases in 26 files: 22 unit-test files covering the state machine, pricing strategies, commands, analytics events and visitors, the data mapper and the availability service, and 4 integration-test files that drive the API with Supertest through the booking lifecycle, ride-share flows and analytics access control.',
      "Le serveur compte 298 cas de test dans 26 fichiers : 22 fichiers de tests unitaires couvrant la machine à états, les stratégies de tarification, les commandes, les événements et visiteurs d'analyse, le convertisseur de données et le service de disponibilité, et 4 fichiers de tests d'intégration qui pilotent l'API avec Supertest à travers le cycle de vie des réservations, le covoiturage et le contrôle d'accès aux analyses.",
    ),
    t(
      'Tests run against a stateful in-memory mock of Firestore and a manual mock of the data gateway, so they need no emulator and no credentials. The CI pipeline lints, runs the tests with coverage and sends the report to SonarQube Cloud.',
      "Les tests s'exécutent sur une simulation de Firestore en mémoire qui conserve son état et sur une simulation manuelle de la passerelle de données : ils n'exigent ni émulateur ni identifiants. Le pipeline d'intégration continue analyse le code, exécute les tests avec couverture et transmet le rapport à SonarQube Cloud.",
    ),
  ],

  challenges: [
    {
      title: t('Booking the wrong vehicle', 'La réservation du mauvais véhicule'),
      body: t(
        'When the vehicle a user picked on the map was no longer available, the app silently booked another vehicle of the same type. The map now says the vehicle is already booked, and the seed data pairs each vehicle with exactly one bookable option.',
        "Lorsque le véhicule choisi sur la carte n'était plus disponible, l'application en réservait discrètement un autre du même type. La carte indique désormais que le véhicule est déjà réservé, et les données initiales associent chaque véhicule à une seule option réservable.",
      ),
    },
    {
      title: t('Stale availability on the map', 'Une disponibilité périmée sur la carte'),
      body: t(
        'After a booking was confirmed from the map, markers could briefly show the old availability and let the user act on it. The map now waits for the refreshed data before the booking dialog closes.',
        "Après la confirmation d'une réservation depuis la carte, les marqueurs pouvaient afficher un instant l'ancienne disponibilité et laisser l'utilisateur agir en conséquence. La carte attend désormais les données actualisées avant de fermer la fenêtre de réservation.",
      ),
    },
    {
      title: t('Documentation that drifts from the code', 'Une documentation qui s’éloigne du code'),
      body: t(
        'The class diagram and pattern documents are part of the deliverable, and they fell behind as features landed. Before the final submission I went through them against the implementation — command counts, event lists, gateway implementations — and corrected each mismatch in its own commit.',
        "Le diagramme de classes et les documents sur les patrons font partie du livrable, et ils ont pris du retard à mesure que les fonctions arrivaient. Avant la remise finale, je les ai confrontés à l'implémentation — nombre de commandes, listes d'événements, passerelles réelles — et j'ai corrigé chaque écart dans un commit distinct.",
      ),
    },
  ],

  results: {
    rows: [
      {
        label: t('Design patterns in use', 'Patrons de conception utilisés'),
        value: t(
          '8: Singleton, Observer, Factory Method, Adapter, State, Strategy, Command, Visitor',
          '8 : Singleton, Observateur, Fabrique, Adaptateur, État, Stratégie, Commande, Visiteur',
        ),
        source: architectureDocs,
      },
      {
        label: t('Request types', 'Types de requête'),
        value: t('23 command classes behind one handler', '23 classes de commande derrière un seul gestionnaire'),
        source: architectureDocs,
      },
      {
        label: t('Back-end tests', 'Tests du serveur'),
        value: t('298 test cases in 26 files', '298 cas de test dans 26 fichiers'),
        source: t('Counted in the repository', 'Compté dans le dépôt'),
      },
      {
        label: t('My share of the history', "Ma part de l'historique"),
        value: t('61 of 151 non-merge commits', '61 commits sur 151, hors fusions'),
        source: t('Git history', 'Historique Git'),
      },
    ],
    note: t(
      'Test cases are counted from the test files, not from a test report. No coverage percentage is quoted because I have not re-measured it for this page.',
      "Les cas de test sont comptés à partir des fichiers de test, et non d'un rapport d'exécution. Aucun pourcentage de couverture n'est cité, car je ne l'ai pas mesuré de nouveau pour cette page.",
    ),
  },
};
