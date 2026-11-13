import { t } from '../../i18n';
import type { Project } from '../../types/content';
import map from '../../assets/projects/summs/map.png';
import transitRoute from '../../assets/projects/summs/transit-route.png';
import transitSteps from '../../assets/projects/summs/transit-steps.png';
import route from '../../assets/projects/summs/route.png';
import contextDiagram from '../../assets/projects/summs/context-diagram.png';
import architectureDiagram from '../../assets/projects/summs/architecture-diagram.png';
import statePattern from '../../assets/projects/summs/state-pattern.jpg';
import commandPattern from '../../assets/projects/summs/command-pattern.jpg';
import domainModel from '../../assets/projects/summs/domain-model.png';

const architectureDocs = t(
  'Architecture documents in the repository',
  "Documents d'architecture du dépôt",
);

export const summs: Project = {
  slug: 'summs',
  order: 3,
  title: 'SUMMS — Smart Urban Mobility Management System',
  shortTitle: 'SUMMS',
  summary: t(
    'A web platform that puts bike-sharing, car-sharing, scooters, parking and transit information behind one booking flow, with every request passing through the same strict MVC chain.',
    "Une plateforme Web qui réunit vélopartage, autopartage, trottinettes, stationnement et information sur le transport en commun dans un seul parcours de réservation, où chaque requête suit la même chaîne MVC rigoureuse.",
  ),

  proof: {
    figure: t('298', '298'),
    claim: t(
      'back-end test cases, eight design patterns',
      'cas de test côté serveur, huit patrons de conception',
    ),
  },

  context: {
    kind: 'team',
    label: t('Team of 6, university course project', 'Équipe de 6, projet de cours universitaire'),
    teamSize: 6,
  },
  period: t('February to April 2026', 'Février à avril 2026'),
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

  // The screenshots are ones I took of the running application in winter
  // 2026; the repository itself holds none. They are small because they were
  // saved small. The diagrams after them are the team's own, from its report.
  cover: {
    src: map,
    alt: t(
      'The map page of the application, whose interface is titled CityFlow. A navigation bar offers Home, Book, My Bookings, Ride Share, Map, Parking and Transit, with a “Commuter” role badge and a sign-out button. Under it, origin and destination fields and buttons to route, reset, pick either point on the map, and show rentals, transit or parking. A side panel has tabs for the route, parking and two bookings, with the origin set to “Downtown Montreal hub”. The rest is a dark map of downtown Montréal dotted with transit stop markers.',
      "La page de la carte de l'application, dont l'interface porte le nom CityFlow. Une barre de navigation propose Home, Book, My Bookings, Ride Share, Map, Parking et Transit, avec un badge de rôle « Commuter » et un bouton de déconnexion. En dessous, des champs d'origine et de destination et des boutons pour tracer un itinéraire, réinitialiser, choisir l'un ou l'autre point sur la carte et afficher les locations, le transport en commun ou le stationnement. Un panneau latéral comporte des onglets pour l'itinéraire, le stationnement et deux réservations, avec l'origine fixée à « Downtown Montreal hub ». Le reste est une carte sombre du centre-ville de Montréal, parsemée de marqueurs d'arrêts.",
    ),
    caption: t(
      'The map page, signed in as a commuter, with the transit layer on. The team named the product CityFlow. I built the first version of this page and its booking flow; a teammate added the transit layer.',
      "La page de la carte, avec une session d'usager et la couche de transport en commun activée. L'équipe a nommé le produit CityFlow. J'ai réalisé la première version de cette page et son parcours de réservation; un autre membre de l'équipe y a ajouté la couche de transport en commun.",
    ),
  },
  gallery: [
    {
      src: transitRoute,
      alt: t(
        'A dark map of Montréal between the Plateau and downtown. A route runs from a point A near Papineau station to a point B near Place-des-Arts: a dotted walking segment, then two bus legs drawn as white lines and labelled 361 and 356.',
        "Une carte sombre de Montréal, entre le Plateau et le centre-ville. Un itinéraire relie un point A, près de la station Papineau, à un point B, près de Place-des-Arts : un segment de marche en pointillé, puis deux trajets d'autobus tracés en blanc et étiquetés 361 et 356.",
      ),
      caption: t(
        'A transit route drawn on the map: a walk, then bus lines 361 and 356. Transit routing was built by a teammate.',
        "Un itinéraire en transport en commun tracé sur la carte : de la marche, puis les lignes d'autobus 361 et 356. Le calcul des itinéraires en transport en commun est l'œuvre d'un autre membre de l'équipe.",
      ),
    },
    {
      src: transitSteps,
      alt: t(
        'The navigation panel for that route, from “Your live location” to Sherbrooke / Du Parc. A transit summary reads 26 min, 2.8 km, 2 lines. Below, the steps in order: a 7-minute walk of 0.4 km; bus 361 for 4 stops, 2 minutes and 0.8 km; a 1-minute walk; bus 356 for 5 stops, 5 minutes and 1.4 km; and a last 1-minute walk of 89 m to the destination.',
        "Le panneau de navigation de cet itinéraire, de « Your live location » jusqu'à Sherbrooke / Du Parc. Un sommaire indique 26 min, 2,8 km et 2 lignes. En dessous, les étapes dans l'ordre : 7 minutes de marche sur 0,4 km; l'autobus 361 pour 4 arrêts, 2 minutes et 0,8 km; 1 minute de marche; l'autobus 356 pour 5 arrêts, 5 minutes et 1,4 km; et une dernière minute de marche, sur 89 m, jusqu'à la destination.",
      ),
      caption: t(
        'The same route as steps in the side panel: 26 minutes, 2.8 km, two bus lines.',
        "Le même itinéraire, étape par étape, dans le panneau latéral : 26 minutes, 2,8 km, deux lignes d'autobus.",
      ),
    },
    {
      src: route,
      alt: t(
        'The dark map of downtown Montréal with a single white route line from a point A near McGill station, up and around past the Université du Québec à Montréal, to a point B between Saint-Laurent and Place-d’Armes stations.',
        "La carte sombre du centre-ville de Montréal avec un seul tracé blanc, d'un point A près de la station McGill, qui monte et contourne l'Université du Québec à Montréal, jusqu'à un point B situé entre les stations Saint-Laurent et Place-d'Armes.",
      ),
      caption: t(
        'A route between two points picked on the map downtown.',
        'Un itinéraire entre deux points choisis sur la carte, au centre-ville.',
      ),
    },
    {
      src: contextDiagram,
      alt: t(
        'A context diagram with SUMMS in a circle at the centre. Around it: commuters, mobility providers, city administrators and a system administrator, and the outside systems it talks to: Firebase Auth, Google Firestore, the Google Maps API, the STM GTFS feed, the Overpass API and a mocked payment gateway. Labelled arrows show what passes each way.',
        "Un diagramme de contexte avec SUMMS dans un cercle au centre. Autour : les usagers, les fournisseurs de mobilité, les administrateurs municipaux et un administrateur du système, ainsi que les systèmes externes avec lesquels il échange : Firebase Auth, Google Firestore, l'API Google Maps, le flux GTFS de la STM, l'API Overpass et une passerelle de paiement simulée. Des flèches étiquetées indiquent ce qui circule dans chaque sens.",
      ),
      caption: t(
        'The system in its context: four kinds of user and six outside services. From the team’s Phase II report.',
        "Le système dans son contexte : quatre types d'utilisateurs et six services externes. Tiré du rapport de phase II de l'équipe.",
      ),
    },
    {
      src: architectureDiagram,
      alt: t(
        'An architecture diagram in boxes. A controller box holds the mobility controller and presenter. An interactor box holds mobility requests, the request handler, responses, the mobility service, entities and the data gateway. Below are commuter and admin presenters with their view models and views, and a database box with the mobility data mapper and the SUMMS database.',
        "Un schéma d'architecture en boîtes. Une boîte « contrôleur » contient le contrôleur et le présentateur de mobilité. Une boîte « interacteur » contient les requêtes de mobilité, le gestionnaire de requêtes, les réponses, le service de mobilité, les entités et la passerelle de données. En dessous, les présentateurs « usager » et « administrateur » avec leurs modèles de vue et leurs vues, et une boîte « base de données » avec le mappeur de données et la base SUMMS.",
      ),
      caption: t(
        'The team’s architecture diagram: the request chain drawn with its presenters and views.',
        "Le schéma d'architecture de l'équipe : la chaîne de requêtes dessinée avec ses présentateurs et ses vues.",
      ),
    },
    {
      src: statePattern,
      alt: t(
        'A class diagram of the State pattern. MobilityService calls a BookingStateMachine, which holds a BookingState. The abstract state declares toActive, toComplete and toFailed; four concrete states, Draft, Active, Complete and Failed, each implement only the transitions they allow.',
        "Un diagramme de classes du patron État. MobilityService appelle une BookingStateMachine, qui détient un BookingState. L'état abstrait déclare toActive, toComplete et toFailed; quatre états concrets, Draft, Active, Complete et Failed, ne mettent chacun en œuvre que les transitions qu'ils autorisent.",
      ),
      caption: t(
        'The booking state machine, which I implemented. A draft can become active or failed, an active booking can complete, and nothing else is a legal move.',
        "La machine à états des réservations, que j'ai mise en œuvre. Un brouillon peut devenir actif ou échoué, une réservation active peut se terminer, et aucun autre déplacement n'est permis.",
      ),
    },
    {
      src: commandPattern,
      alt: t(
        'A class diagram of the Command pattern. A MobilityRequestHandler looks up a command in a CommandRegistry and calls execute on it. Six example commands, among them GetVehiclesCommand and CreateBookingDraftCommand, each hold a MobilityService receiver and call one of its methods.',
        "Un diagramme de classes du patron Commande. Un MobilityRequestHandler trouve une commande dans un CommandRegistry et appelle sa méthode execute. Six commandes données en exemple, dont GetVehiclesCommand et CreateBookingDraftCommand, détiennent chacune un récepteur MobilityService et appellent l'une de ses méthodes.",
      ),
      caption: t(
        'The Command pattern as the report draws it: one handler, a registry, and a command class per request type.',
        "Le patron Commande tel que le rapport le dessine : un seul gestionnaire, un registre et une classe de commande par type de requête.",
      ),
    },
    {
      src: domainModel,
      alt: t(
        'A domain model in UML: bookings, payments and payment receipts, mobility options, vehicles, mobility service providers, parking facilities and spots, cities, trips, users and analytics events, joined by associations with multiplicities, with the enumerations listed down the right-hand side.',
        "Un modèle du domaine en UML : réservations, paiements et reçus de paiement, options de mobilité, véhicules, fournisseurs de services de mobilité, stationnements et places, villes, trajets, utilisateurs et événements d'analyse, reliés par des associations avec leurs multiplicités; les énumérations sont listées du côté droit.",
      ),
      caption: t(
        'The domain model from the team’s report.',
        "Le modèle du domaine tiré du rapport de l'équipe.",
      ),
    },
  ],

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
      'Route every request through one chain (controller, request handler, command, service, data gateway) with no shortcuts.',
      'Faire passer chaque requête par une seule chaîne (contrôleur, gestionnaire de requêtes, commande, service, passerelle de données), sans raccourci.',
    ),
    t(
      'Use design patterns where they remove a real problem, and document what each one is for.',
      "Recourir aux patrons de conception là où ils éliminent un vrai problème, et documenter l'utilité de chacun.",
    ),
    t(
      'Keep external services (maps, parking, transit, payment) behind interfaces with mock implementations, so the system runs and tests without them.',
      'Placer les services externes (cartes, stationnement, transport en commun, paiement) derrière des interfaces dotées de versions simulées, pour que le système fonctionne et se teste sans eux.',
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
        'The class diagram and pattern documents are part of the deliverable, and they fell behind as features landed. Before the final submission I went through them against the implementation (command counts, event lists, gateway implementations) and corrected each mismatch in its own commit.',
        "Le diagramme de classes et les documents sur les patrons font partie du livrable, et ils ont pris du retard à mesure que les fonctions arrivaient. Avant la remise finale, je les ai confrontés à l'implémentation (nombre de commandes, listes d'événements, passerelles réelles) et j'ai corrigé chaque écart dans un commit distinct.",
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
