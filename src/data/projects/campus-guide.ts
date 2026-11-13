import { t } from '../../i18n';
import type { Project } from '../../types/content';
import campusMap from '../../assets/projects/campus-guide/campus-map.png';
import buildingInfo from '../../assets/projects/campus-guide/building-info.png';
import buildingOutlines from '../../assets/projects/campus-guide/building-outlines.png';
import mockupCampusSwitching from '../../assets/projects/campus-guide/mockup-campus-switching.png';
import mockupCrossCampusRoute from '../../assets/projects/campus-guide/mockup-cross-campus-route.png';
import mockupStepByStep from '../../assets/projects/campus-guide/mockup-step-by-step.png';
import mockupShuttleStops from '../../assets/projects/campus-guide/mockup-shuttle-stops.png';
import mockupNextClass from '../../assets/projects/campus-guide/mockup-next-class.png';
import qualityGate from '../../assets/projects/campus-guide/quality-gate.png';
import componentDiagram from '../../assets/projects/campus-guide/component-diagram.png';

const counted = t(
  'Counted on the main branch, April 2026',
  'Compté sur la branche main, avril 2026',
);

// The pictures are frames from the acceptance-test recordings in the team's
// wiki (06 Testing Plan and Report). Each shows the app on an emulator beside
// the test run that drives it. They are 800 px wide because the recordings are.
export const campusGuide: Project = {
  slug: 'campus-guide',
  order: 2,
  title: 'CampusGuide',
  shortTitle: 'CampusGuide',
  summary: t(
    'An Android app for finding your way around Concordia’s two campuses: outdoor and indoor directions, the shuttle, and a route to your next class.',
    "Une application Android pour s'orienter sur les deux campus de Concordia : itinéraires extérieurs et intérieurs, navette, et trajet vers le prochain cours.",
  ),

  proof: {
    figure: t('831', '831'),
    claim: t(
      'unit tests, on a team of eleven',
      'tests unitaires, dans une équipe de onze',
    ),
  },

  context: {
    kind: 'team',
    label: t('Team of 11, university course project', 'Équipe de 11, projet de cours universitaire'),
    teamSize: 11,
  },
  period: t('January to April 2026', 'Janvier à avril 2026'),
  disciplines: ['android', 'frontend', 'testing', 'cicd'],

  stack: [
    'Kotlin',
    'Jetpack Compose',
    'Google Maps SDK',
    'Routes API',
    'Robolectric',
    'Espresso',
    'GitHub Actions',
    'SonarQube Cloud',
  ],
  technologies: [
    {
      group: t('Application', 'Application'),
      items: [
        'Kotlin',
        'Jetpack Compose',
        'Material 3',
        'Google Maps SDK for Android',
        'Maps Compose',
        'Play Services Location',
        'Google Routes API',
        'Concordia Open Data API',
        'Retrofit',
        'OkHttp',
        'kotlinx.serialization',
        'DataStore',
      ],
    },
    {
      group: t('Testing', 'Tests'),
      items: [
        'JUnit 4',
        'Robolectric',
        'Mockito',
        'MockWebServer',
        'kotlinx-coroutines-test',
        'Compose UI Test',
        'Espresso',
        'UI Automator',
      ],
    },
    {
      group: t('Build and CI', 'Build et intégration continue'),
      items: ['Gradle (Kotlin DSL)', 'GitHub Actions', 'JaCoCo', 'SonarQube Cloud', 'Android Lint'],
    },
  ],

  cover: {
    src: campusMap,
    alt: t(
      'Android Studio. On the left, a terminal running the instrumented test class ViewCampusMapsUITest, with three of three tests completed and none failed. On the right, a Pixel 9a emulator showing the CampusGuide map of the Sir George Williams campus: red markers on the buildings, a search bar, buttons for the SGW and Loyola campuses, and tabs for Map, Directions, Calendar and POI.',
      "Android Studio. À gauche, un terminal exécute la classe de tests instrumentés ViewCampusMapsUITest : trois tests sur trois terminés, aucun échec. À droite, un émulateur Pixel 9a affiche la carte du campus Sir George Williams dans CampusGuide : des marqueurs rouges sur les pavillons, une barre de recherche, des boutons pour les campus SGW et Loyola, et les onglets Map, Directions, Calendar et POI.",
    ),
    caption: t(
      'The campus map on an emulator, beside the UI test run that drives it. A frame from a test recording in the project wiki.',
      "La carte du campus sur un émulateur, à côté de l'exécution des tests d'interface qui la pilotent. Image tirée d'un enregistrement de test du wiki du projet.",
    ),
  },
  gallery: [
    {
      src: buildingInfo,
      alt: t(
        'The emulator shows a sheet that has slid up over the map for the J.W. McConnell Building, code LB: its address, 1400 De Maisonneuve Blvd. W.; its accessibility features, an accessible entrance and an accessible elevator; its opening hours for weekdays and weekends; and a “View More Details” button. The terminal beside it is running BuildingInfoPopupUITest.',
        "L'émulateur affiche une fiche qui s'est glissée par-dessus la carte pour le pavillon J.W. McConnell, code LB : son adresse, 1400 De Maisonneuve Blvd. W.; ses caractéristiques d'accessibilité, soit une entrée et un ascenseur accessibles; ses heures d'ouverture en semaine et la fin de semaine; et un bouton « View More Details ». Le terminal voisin exécute BuildingInfoPopupUITest.",
      ),
      caption: t(
        'Tapping a building opens its details: address, accessibility and opening hours. A frame from the recording of that feature’s UI tests.',
        "Toucher un pavillon ouvre sa fiche : adresse, accessibilité et heures d'ouverture. Image tirée de l'enregistrement des tests d'interface de cette fonction.",
      ),
    },
    {
      src: buildingOutlines,
      alt: t(
        'The emulator shows the map zoomed in on the streets around Concordia University downtown. Each campus building is filled in with a red tint and carries a marker, and the SGW campus button is selected.',
        "L'émulateur affiche la carte, agrandie sur les rues qui entourent l'Université Concordia au centre-ville. Chaque pavillon du campus est rempli d'une teinte rouge et porte un marqueur, et le bouton du campus SGW est sélectionné.",
      ),
      caption: t(
        'Campus buildings drawn as shaded outlines over the map, from GeoJSON polygons. A frame from the same recording.',
        "Les pavillons du campus, dessinés en surimpression sur la carte à partir de polygones GeoJSON. Image tirée du même enregistrement.",
      ),
    },
    // Mockups from the team's wiki (05 User Interface Design), drawn by a
    // teammate in Figma. These five are the stories I went on to implement.
    {
      src: mockupCampusSwitching,
      alt: t(
        'A page from the mockup document for user stories US-1.1, view the SGW and Loyola campus maps, and US-1.3, switch between them. A phone screen shows the Loyola campus map covered in red building pins, with a search bar on top, SGW and LOY toggle buttons near the bottom and a navigation bar under them. Callouts around the screen explain each control; several are tagged “Accessibility” or “Navigation”.',
        "Une page du document de maquettes pour les récits utilisateur US-1.1, afficher les cartes des campus SGW et Loyola, et US-1.3, passer de l'un à l'autre. Un écran de téléphone montre la carte du campus Loyola couverte de repères rouges, avec une barre de recherche en haut, des boutons SGW et LOY vers le bas et une barre de navigation en dessous. Des annotations autour de l'écran expliquent chaque commande; plusieurs portent l'étiquette « Accessibility » ou « Navigation ».",
      ),
      caption: t(
        'The mockup for the campus maps and the SGW and Loyola toggle, drawn by a teammate in Figma, with a callout for every control. I built the toggle it describes.',
        "La maquette des cartes de campus et du sélecteur SGW et Loyola, dessinée dans Figma par un membre de l'équipe, avec une annotation pour chaque commande. J'ai réalisé le sélecteur qu'elle décrit.",
      ),
    },
    {
      src: mockupCrossCampusRoute,
      alt: t(
        'A mockup of the directions panel for a route from “Your location” to the Central Building (CC). A tag reads “This is a cross-campus route”. Under “Choose your travel mode” the walking icon is selected, and the route is given as via Rue Sherbrooke O, 1 hr 33 min, 6.6 km, with Go and Cancel buttons. Below, a map shows the route as a purple line between the two campuses.',
        "Une maquette du panneau d'itinéraire pour un trajet de « Your location » au pavillon central (CC). Une étiquette indique « This is a cross-campus route ». Sous « Choose your travel mode », l'icône de marche est sélectionnée, et l'itinéraire est donné par la rue Sherbrooke O, 1 h 33 min, 6,6 km, avec des boutons Go et Cancel. En dessous, une carte montre le trajet en violet entre les deux campus.",
      ),
      caption: t(
        'The mockup for cross-campus routing (US-2.5): the panel says outright that the route crosses campuses. I implemented this story.',
        "La maquette des itinéraires d'un campus à l'autre (US-2.5) : le panneau indique en toutes lettres que le trajet change de campus. J'ai mis en œuvre ce récit.",
      ),
    },
    {
      src: mockupStepByStep,
      alt: t(
        'A mockup of step-by-step directions from Faubourg Ste-Catherine (FB) to the Concordia shuttle bus stop: 6 minutes, 400 m. The steps read “Head toward Rue Guy”, “Turn left onto Rue Guy” and “Turn right onto Blvd. De Maisonneuve Ouest”, each with a distance and an arrow icon, followed by Go and Cancel buttons. A map below draws the walk as a dotted blue line ending at a shuttle pin. Callouts explain each part.',
        "Une maquette d'un itinéraire étape par étape, de Faubourg Ste-Catherine (FB) à l'arrêt de la navette de Concordia : 6 minutes, 400 m. Les étapes indiquent « Head toward Rue Guy », « Turn left onto Rue Guy » et « Turn right onto Blvd. De Maisonneuve Ouest », chacune avec une distance et une flèche, suivies des boutons Go et Cancel. Une carte, en dessous, trace la marche en pointillé bleu jusqu'à un repère de navette. Des annotations expliquent chaque partie.",
      ),
      caption: t(
        'The mockup for the step-by-step directions panel (US-2.7). Its acceptance criteria are printed above it: steps in order, and a way back to the map without losing the route. I built this panel.',
        "La maquette du panneau d'itinéraire étape par étape (US-2.7). Ses critères d'acceptation sont imprimés au-dessus : des étapes dans l'ordre, et un retour à la carte sans perdre l'itinéraire. J'ai réalisé ce panneau.",
      ),
    },
    {
      src: mockupShuttleStops,
      alt: t(
        'A mockup for user story US-3.1, view shuttle stops on the map. The Sir George Williams map shows red building pins and, beside the Henry F. Hall Building, a blue square pin with a bus icon and the word “Shuttle”. A callout reads “Shuttle location pin with icon and text support.”',
        "Une maquette pour le récit utilisateur US-3.1, afficher les arrêts de navette sur la carte. La carte du campus Sir George Williams montre des repères rouges pour les pavillons et, près du pavillon Henry F. Hall, un repère carré bleu avec une icône d'autobus et le mot « Shuttle ». Une annotation indique « Shuttle location pin with icon and text support. »",
      ),
      caption: t(
        'The mockup for shuttle stops (US-3.1): a blue square with an icon and a word, so that it does not depend on colour to stand apart from the building pins. I built the stop markers.',
        "La maquette des arrêts de navette (US-3.1) : un carré bleu avec une icône et un mot, pour qu'il se distingue des repères de pavillons sans dépendre de la couleur. J'ai réalisé les marqueurs d'arrêt.",
      ),
    },
    {
      src: mockupNextClass,
      alt: t(
        'A mockup for user story US-4B.4, determine the next class based on the current time. A daily schedule for April 10th 2026 lists three classes. Two that have passed are greyed out with disabled buttons. The third, SOEN 321 – U LECTURE, is labelled “Upcoming class”, outlined in red, and has an enabled “Directions to classroom” button. Accessibility callouts note that the upcoming class is marked by text and pattern as well as colour.',
        "Une maquette pour le récit utilisateur US-4B.4, déterminer le prochain cours selon l'heure. Un horaire quotidien du 10 avril 2026 présente trois cours. Deux cours déjà passés sont grisés, avec des boutons désactivés. Le troisième, SOEN 321 – U LECTURE, porte la mention « Upcoming class », est encadré de rouge et offre un bouton « Directions to classroom » actif. Des annotations d'accessibilité précisent que le prochain cours est signalé par du texte et un motif en plus de la couleur.",
      ),
      caption: t(
        'The mockup for the next class (US-4B.4): past classes are disabled and the upcoming one carries the button. I built the directions to the next class.',
        "La maquette du prochain cours (US-4B.4) : les cours passés sont désactivés et le prochain porte le bouton. J'ai réalisé l'itinéraire vers le prochain cours.",
      ),
    },
    {
      src: qualityGate,
      alt: t(
        'The SonarQube Cloud summary for ConcordiaCampusGuide on the main branch: quality gate “Passed”. Under New Code it lists 31 new issues, 0 accepted issues, 92.81% coverage on 176 new lines to cover against a required 80%, 0.0% duplications and 0 security hotspots.',
        "Le sommaire SonarQube Cloud de ConcordiaCampusGuide pour la branche main : seuil de qualité « Passed ». Sous New Code figurent 31 nouveaux problèmes, 0 problème accepté, une couverture de 92,81 % sur 176 nouvelles lignes à couvrir pour un minimum exigé de 80 %, 0,0 % de duplication et 0 point sensible de sécurité.",
      ),
      caption: t(
        'The quality gate on 8 February 2026, after the second sprint, from the project wiki. I wired JaCoCo into this report. It is one sprint’s reading of new code, not a final measurement: the wiki records between 82.6% and 92.8% from sprint to sprint.',
        "Le seuil de qualité au 8 février 2026, après le deuxième sprint, d'après le wiki du projet. C'est moi qui ai relié JaCoCo à ce rapport. Il s'agit de la lecture d'un sprint sur le nouveau code, et non d'une mesure finale : le wiki consigne entre 82,6 % et 92,8 % d'un sprint à l'autre.",
      ),
    },
    {
      src: componentDiagram,
      alt: t(
        'A component diagram titled “Concordia Campus Guide – Component Diagram”. Compose screens and view models in a presentation layer call use cases in a domain layer, which call repositories in a data layer; adapters in an integration layer reach the Google Maps SDK, the Concordia Open Data API, the Google Routes and Places APIs and the fused location provider. Local storage holds a DataStore and a Room database.',
        "Un diagramme de composants intitulé « Concordia Campus Guide – Component Diagram ». Des écrans Compose et des ViewModels, dans une couche de présentation, appellent des cas d'utilisation d'une couche domaine, qui appellent des dépôts d'une couche de données; des adaptateurs d'une couche d'intégration joignent le SDK Google Maps, l'API de données ouvertes de Concordia, les API Routes et Places de Google et le fournisseur de localisation. Le stockage local comprend un DataStore et une base Room.",
      ),
      caption: t(
        'The team’s component diagram from the first sprint, from the project wiki.',
        "Le diagramme de composants de l'équipe au premier sprint, tiré du wiki du projet.",
      ),
    },
  ],

  repository: {
    url: 'https://github.com/ShadiiAM/ConcordiaCampusGuide',
    label: 'ShadiiAM/ConcordiaCampusGuide',
    note: t(
      'The team repository, hosted on a teammate’s account. My commits there are under my own GitHub identity.',
      "Le dépôt de l'équipe, hébergé sur le compte d'un coéquipier. Mes commits y figurent sous ma propre identité GitHub.",
    ),
  },

  overview: [
    t(
      'CampusGuide is a navigation app for Concordia University’s Sir George Williams and Loyola campuses, built over one term by an eleven-person team, The Null Pointers. It draws the campus buildings on a map, gives outdoor directions in several travel modes, routes indoors between rooms and floors, knows the shuttle schedule, and can take a student from where they are to their next class.',
      "CampusGuide est une application de navigation pour les campus Sir George Williams et Loyola de l'Université Concordia, réalisée en une session par une équipe de onze personnes, The Null Pointers. Elle dessine les pavillons sur une carte, propose des itinéraires extérieurs selon plusieurs modes de déplacement, guide à l'intérieur d'une salle à l'autre et d'un étage à l'autre, connaît l'horaire de la navette et peut mener un étudiant de sa position jusqu'à son prochain cours.",
    ),
    t(
      'I was one of five developers on the front-end side of the team. This page describes the app as a whole, then separates out the parts I built.',
      "J'étais l'un des cinq développeurs du volet frontal de l'équipe. Cette page décrit l'application dans son ensemble, puis distingue les parties que j'ai réalisées.",
    ),
  ],

  problem: [
    t(
      'A timetable gives a student a building code and a room number, on one of two campuses several kilometres apart. A general-purpose map app stops at the front door: it does not know which floor the room is on, when the next shuttle between campuses leaves, or which class comes next.',
      "Un horaire donne à l'étudiant un code de pavillon et un numéro de salle, sur l'un des deux campus séparés de plusieurs kilomètres. Une application de cartographie générale s'arrête à la porte d'entrée : elle ignore à quel étage se trouve la salle, quand part la prochaine navette entre les campus et quel cours vient ensuite.",
    ),
  ],

  goals: [
    t(
      'Show both campuses with their buildings clearly distinguished from the surrounding city, and switch between them in one tap.',
      "Afficher les deux campus en distinguant nettement leurs pavillons du reste de la ville, et passer de l'un à l'autre d'un seul geste.",
    ),
    t(
      'Give outdoor directions on foot, by car, by public transit and by the Concordia shuttle, including between the two campuses.',
      "Proposer des itinéraires extérieurs à pied, en voiture, en transport en commun et avec la navette de Concordia, y compris d'un campus à l'autre.",
    ),
    t(
      'Route indoors between rooms on different floors, with accessibility-aware options.',
      "Guider à l'intérieur entre des salles situées à des étages différents, avec des options tenant compte de l'accessibilité.",
    ),
    t(
      'Read a student’s course schedule and offer directions to the next class.',
      "Lire l'horaire de cours d'un étudiant et proposer un itinéraire vers son prochain cours.",
    ),
  ],

  architecture: {
    body: [
      t(
        'A single-activity Jetpack Compose app. Screens and reusable composables sit on top of ViewModels that hold the UI state. Repositories wrap the outside services: Google’s Routes API for outdoor directions and Concordia’s Open Data API for course schedules.',
        "Une application Jetpack Compose à activité unique. Les écrans et les composables réutilisables reposent sur des ViewModels qui détiennent l'état de l'interface. Des dépôts de données encapsulent les services externes : l'API Routes de Google pour les itinéraires extérieurs et l'API de données ouvertes de Concordia pour les horaires de cours.",
      ),
      t(
        'Campus buildings are GeoJSON polygons, parsed and drawn as map overlays. Indoor navigation is its own engine, built by teammates: floor graphs loaded from assets, Dijkstra’s algorithm for the shortest path on a floor, and a router that joins floors together.',
        "Les pavillons sont des polygones GeoJSON, analysés puis dessinés en surimpression sur la carte. La navigation intérieure constitue un moteur à part, réalisé par des coéquipiers : des graphes d'étage chargés depuis les ressources, l'algorithme de Dijkstra pour le plus court chemin sur un étage, et un routeur qui relie les étages entre eux.",
      ),
      t(
        'The shuttle is modelled as a domain class behind a data-source interface, so its schedule logic can be tested without a map on screen.',
        "La navette est modélisée par une classe du domaine placée derrière une interface de source de données : sa logique d'horaire se teste ainsi sans carte à l'écran.",
      ),
    ],
    diagram: {
      caption: t(
        'Layers of the app, drawn from the source tree. This is a diagram, not a screenshot.',
        "Les couches de l'application, d'après l'arborescence du code. Il s'agit d'un schéma, et non d'une capture d'écran.",
      ),
      layers: [
        {
          label: t('Screens', 'Écrans'),
          nodes: [
            { name: 'Map', detail: t('Buildings, routes, shuttle', 'Pavillons, itinéraires, navette') },
            { name: 'Indoor map', detail: t('Floors and rooms', 'Étages et salles') },
            { name: 'Calendar', detail: t('Schedule, next class', 'Horaire, prochain cours') },
            { name: 'Points of interest' },
            { name: 'Accessibility' },
          ],
        },
        {
          label: t('State', 'État'),
          nodes: [
            { name: 'ViewModels', detail: t('Search, location, indoor navigation, calendar', 'Recherche, position, navigation intérieure, calendrier') },
          ],
        },
        {
          label: t('Domain and data', 'Domaine et données'),
          nodes: [
            { name: 'Directions repositories' },
            { name: 'Indoor pathfinding', detail: t('Dijkstra', 'Dijkstra') },
            { name: 'ShuttleTracker' },
            { name: 'GeoJSON parser' },
            { name: 'CalendarRepository' },
          ],
        },
        {
          label: t('External services', 'Services externes'),
          nodes: [
            { name: 'Google Maps SDK' },
            { name: 'Google Routes API' },
            { name: 'Concordia Open Data API' },
          ],
        },
      ],
    },
  },

  role: {
    summary: t(
      'A team project with eleven members. I worked on the front-end side, and set up much of the build, test and coverage tooling. What I built, in the order it landed:',
      "Un projet d'équipe de onze membres. J'ai travaillé au volet frontal et mis en place une bonne partie de l'outillage de build, de test et de couverture. Voici ce que j'ai réalisé, dans l'ordre d'arrivée :",
    ),
    contributions: [
      t(
        'Foundations: the first Google Maps integration, the GitHub Actions workflows, and JaCoCo coverage reporting into SonarQube Cloud.',
        "Fondations : la première intégration de Google Maps, les workflows GitHub Actions et le rapport de couverture JaCoCo vers SonarQube Cloud.",
      ),
      t(
        'Campus switching: the toggle between the two campuses, the saved campus preference, the camera animation and the swap of building polygons.',
        "Changement de campus : le sélecteur entre les deux campus, la mémorisation du campus choisi, l'animation de la caméra et le remplacement des polygones de pavillons.",
      ),
      t(
        'Cross-campus routing between Sir George Williams and Loyola, with end-to-end tests that do not depend on the device’s GPS.',
        "Itinéraires d'un campus à l'autre, entre Sir George Williams et Loyola, avec des tests de bout en bout qui ne dépendent pas du GPS de l'appareil.",
      ),
      t(
        'The step-by-step directions panel, with expand and collapse.',
        "Le panneau d'itinéraire étape par étape, qui se déplie et se replie.",
      ),
      t(
        'Shuttle stops: the ShuttleTracker domain class, the stop markers on the map and the stop information sheet.',
        "Arrêts de navette : la classe de domaine ShuttleTracker, les marqueurs d'arrêt sur la carte et la fiche d'information d'un arrêt.",
      ),
      t(
        'Directions to the next class from the daily schedule, and the acceptance tests for the calendar features.',
        "L'itinéraire vers le prochain cours à partir de l'horaire du jour, et les tests d'acceptation des fonctions de calendrier.",
      ),
    ],
    evidence: t(
      '100 of the 507 non-merge commits on the main branch are mine. Indoor navigation, points of interest and the accessibility screens were built by teammates.',
      "100 des 507 commits (hors fusions) de la branche main sont les miens. La navigation intérieure, les points d'intérêt et les écrans d'accessibilité ont été réalisés par des coéquipiers.",
    ),
  },

  decisions: [
    {
      title: t('Parse off the main thread, attach on it', "Analyser hors du fil principal, afficher sur celui-ci"),
      body: t(
        'Building polygons come from GeoJSON files large enough to freeze the interface when parsed during start-up. I moved coordinate parsing to a background dispatcher, kept the map calls on the main thread where the Maps SDK requires them, and loaded each campus’s overlay only when it is first shown.',
        "Les polygones des pavillons proviennent de fichiers GeoJSON assez volumineux pour figer l'interface lorsqu'ils sont analysés au démarrage. J'ai déplacé l'analyse des coordonnées vers un répartiteur d'arrière-plan, conservé les appels à la carte sur le fil principal, comme l'exige le SDK Maps, et chargé la surimpression de chaque campus seulement à son premier affichage.",
      ),
    },
    {
      title: t('Fast unit tests over heavyweight ones', 'Des tests unitaires rapides plutôt que lourds'),
      body: t(
        'Early coverage came from Robolectric tests that started whole activities. They were slow and ran the suite out of memory. I deleted 203 of them and replaced the approach: logic extracted into methods that plain unit tests can reach, and instrumented tests for what needs the Compose runtime.',
        "La couverture initiale reposait sur des tests Robolectric qui démarraient des activités entières. Ils étaient lents et épuisaient la mémoire de la suite. J'en ai supprimé 203 et changé d'approche : la logique est extraite dans des méthodes à la portée de simples tests unitaires, et des tests instrumentés couvrent ce qui exige l'environnement d'exécution de Compose.",
      ),
    },
    {
      title: t('A domain class before any markers', 'Une classe de domaine avant tout marqueur'),
      body: t(
        'For the shuttle I first extracted a ShuttleTracker class and a stop model behind a data-source interface, and only then drew markers and the information sheet on top. The schedule logic is covered by unit tests that never touch a map.',
        "Pour la navette, j'ai d'abord extrait une classe ShuttleTracker et un modèle d'arrêt derrière une interface de source de données, puis seulement dessiné les marqueurs et la fiche d'information par-dessus. La logique d'horaire est couverte par des tests unitaires qui ne touchent jamais à une carte.",
      ),
    },
    {
      title: t('Measure the code that can be measured', 'Mesurer le code qui peut être mesuré'),
      body: t(
        'Composable layout code and map rendering cannot be exercised by unit tests. I excluded those layers from the coverage calculation, so the quality gate reports on logic that unit tests can reach, and documented the reasoning in the repository’s testing guide.',
        "Le code de mise en page des composables et l'affichage de la carte ne peuvent pas être exercés par des tests unitaires. J'ai exclu ces couches du calcul de couverture, pour que le seuil de qualité porte sur la logique atteignable par des tests unitaires, et j'ai consigné ce raisonnement dans le guide de test du dépôt.",
      ),
    },
  ],

  testing: [
    t(
      'On the main branch there are 831 unit-test methods in 63 files and 72 instrumented test methods in 27 files. Unit tests use JUnit 4, Robolectric and Mockito; instrumented tests use Compose UI Test and Espresso, and most are written as numbered acceptance tests.',
      "La branche main compte 831 méthodes de test unitaire réparties dans 63 fichiers et 72 méthodes de test instrumenté dans 27 fichiers. Les tests unitaires s'appuient sur JUnit 4, Robolectric et Mockito; les tests instrumentés, sur Compose UI Test et Espresso, sont pour la plupart rédigés comme des tests d'acceptation numérotés.",
    ),
    t(
      'Four GitHub Actions workflows build the app, run the unit tests and Android Lint, produce the JaCoCo report for SonarQube Cloud, and build a release APK.',
      "Quatre workflows GitHub Actions construisent l'application, exécutent les tests unitaires et Android Lint, produisent le rapport JaCoCo destiné à SonarQube Cloud et génèrent un APK de publication.",
    ),
  ],

  challenges: [
    {
      title: t('The app froze on map load', "L'application figeait au chargement de la carte"),
      body: t(
        'Adding the second campus made the map screen stop responding at start-up. The cause was GeoJSON parsing on the main thread. Moving it off fixed the freeze and exposed the next problem: attaching overlays from a background thread crashed, because the Maps SDK is main-thread only. The final shape parses in the background and attaches on the main thread.',
        "L'ajout du second campus a rendu l'écran de la carte inerte au démarrage. La cause : l'analyse du GeoJSON sur le fil principal. La déplacer a réglé le gel et révélé le problème suivant : attacher les surimpressions depuis un fil d'arrière-plan faisait planter l'application, car le SDK Maps ne fonctionne que sur le fil principal. La version finale analyse en arrière-plan et attache sur le fil principal.",
      ),
    },
    {
      title: t('A test suite that ran out of memory', 'Une suite de tests à court de mémoire'),
      body: t(
        'As coverage tests accumulated, the suite began failing with out-of-memory errors and tests interfered with each other through static mocks and shared coroutine scopes. Raising the heap bought time; what fixed it was removing the heavyweight tests, replacing static mocks with injectable hooks, and stopping coroutine scopes from leaking between tests.',
        "À mesure que les tests de couverture s'accumulaient, la suite s'est mise à échouer faute de mémoire, et les tests se perturbaient entre eux par des simulacres statiques et des portées de coroutines partagées. Augmenter la mémoire allouée a fait gagner du temps; la solution a consisté à retirer les tests lourds, à remplacer les simulacres statiques par des points d'injection et à empêcher les portées de coroutines de déborder d'un test à l'autre.",
      ),
    },
    {
      title: t('Coverage reporting on a new build toolchain', 'Rapport de couverture sur une nouvelle chaîne de build'),
      body: t(
        'The project used version 9 of the Android Gradle Plugin, and the usual JaCoCo and SonarQube configuration did not work with it. Getting coverage to appear in the quality gate took several iterations on class paths, task wiring and double-indexed sources.',
        "Le projet utilisait la version 9 du plugin Android Gradle, avec laquelle la configuration habituelle de JaCoCo et de SonarQube ne fonctionnait pas. Faire apparaître la couverture dans le seuil de qualité a demandé plusieurs itérations sur les chemins de classes, l'enchaînement des tâches et des sources indexées en double.",
      ),
    },
  ],

  results: {
    rows: [
      {
        label: t('Delivered', 'Livré'),
        value: t(
          'Campus maps, outdoor and indoor directions, shuttle, schedule and points of interest',
          "Cartes des campus, itinéraires extérieurs et intérieurs, navette, horaire et points d'intérêt",
        ),
        source: t('Source tree on the main branch', 'Arborescence du code sur la branche main'),
      },
      {
        label: t('Unit tests', 'Tests unitaires'),
        value: t('831 test methods in 63 files', '831 méthodes de test dans 63 fichiers'),
        source: counted,
      },
      {
        label: t('Instrumented tests', 'Tests instrumentés'),
        value: t('72 test methods in 27 files', '72 méthodes de test dans 27 fichiers'),
        source: counted,
      },
      {
        label: t('My share of the history', "Ma part de l'historique"),
        value: t('100 of 507 non-merge commits', '100 commits sur 507, hors fusions'),
        source: t('Git history of the main branch', 'Historique Git de la branche main'),
      },
    ],
    note: t(
      'Test figures are counted from test annotations in the source, not from a test report. No coverage percentage is quoted because the repository does not hold a final measured report.',
      "Les chiffres de tests sont comptés à partir des annotations de test dans le code, et non d'un rapport d'exécution. Aucun pourcentage de couverture n'est cité, car le dépôt ne contient pas de rapport final mesuré.",
    ),
  },
};
