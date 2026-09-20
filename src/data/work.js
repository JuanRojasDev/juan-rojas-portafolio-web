// ─── Capturas ───
// Generadas desde cada sitio en vivo y optimizadas; viven en el repo para no
// depender de ningún servicio externo.
import aitecShot from "../images/work/aitec.jpg";
import inventioShot from "../images/work/inventio.jpg";
import inventioMobile from "../images/work/inventio-mobile.jpg";
import ganappiShot from "../images/work/ganappi.jpg";
import ganappiMobile from "../images/work/ganappi-mobile.jpg";
import ecoreservasShot from "../images/work/ecoreservas.jpg";
import ecoreservasMobile from "../images/work/ecoreservas-mobile.jpg";
import epmShot from "../images/work/geovisor-epm.jpg";
import epmMobile from "../images/work/geovisor-epm-mobile.jpg";
import triharShot from "../images/work/trihar.jpg";
import triharMobile from "../images/work/trihar-mobile.jpg";
import neertaShot from "../images/work/neerta.jpg";
import neerta2 from "../images/work/neerta-2.jpg";
import neerta3 from "../images/work/neerta-3.jpg";
import inventio2 from "../images/work/inventio-2.jpg";
import ganappiModulos from "../images/work/ganappi-modulos.jpg";
import ganappiComo from "../images/work/ganappi-como.jpg";
import ganappiBusiness from "../images/work/ganappi-business.jpg";

// ─── Work — modelo de datos de los case studies ───
// Cada proyecto se renderiza como una página propia en /work/:slug
//
// TODO(Juan): confirmar el rol exacto, el año y los créditos de los proyectos
// nuevos; los textos salen de lo que publica cada sitio.
// TODO(Juan): faltan las capturas. Mientras `gallery` esté vacío, el proyecto
// se muestra con su color de marca.

export const work = [
  {
    slug: "aitec",
    title: "AITEC",
    subtitle: { es: "Sitio web corporativo", en: "Corporate website" },
    role: { es: "Diseño & Desarrollo", en: "Design & Development" },
    credits: { es: "Cliente: AITEC S.A.S.", en: "Client: AITEC S.A.S." },
    location: "Colombia",
    year: "2026",
    accent: "#0E7C5A",
    liveUrl: "https://aitec.com.co/",
    repoUrl: "",
    stack: ["Next.js", "React", "JavaScript", "CSS", "SEO"],
    categories: ["web"],
    featured: true,
    intro: {
      es: "El sitio corporativo completo de una empresa de soluciones ambientales: identidad, arquitectura de contenido y rendimiento.",
      en: "The complete corporate site for an environmental solutions company: identity, content architecture and performance.",
    },
    body: {
      es: [
        "AITEC llegaba sin presencia digital propia y necesitaba un sitio que comunicara autoridad técnica sin caer en el lenguaje frío del sector industrial.",
        "Construí el sitio completo en Next.js: diseño responsivo, optimización SEO, formularios de contacto integrados y secciones de servicios y productos pensadas para que el equipo comercial pudiera dirigir tráfico a páginas concretas.",
      ],
      en: [
        "AITEC had no digital presence of its own and needed a site that conveyed technical authority without the cold language of the industrial sector.",
        "I built the entire site in Next.js: responsive design, SEO optimization, integrated contact forms, and service and product sections designed so the sales team could drive traffic to specific pages.",
      ],
    },
    gallery: [
      { src: aitecShot, alt: "Home del sitio corporativo de AITEC", hero: true },
    ],
  },
  {
    slug: "inventio",
    title: "Invent.io",
    subtitle: { es: "Plataforma corporativa de software", en: "Software company platform" },
    role: { es: "Diseño & Desarrollo", en: "Design & Development" },
    credits: { es: "Cliente: Invent.io", en: "Client: Invent.io" },
    location: "Colombia",
    year: "2026",
    accent: "#1D4ED8",
    liveUrl: "https://www.inventio.com.co/",
    repoUrl: "",
    stack: ["React", "JavaScript", "CSS", "SEO"],
    categories: ["web"],
    featured: true,
    intro: {
      es: "El sitio de una casa de software que construye sistemas empresariales, geovisores ArcGIS y aplicaciones nativas.",
      en: "The site of a software house building enterprise systems, ArcGIS geoviewers and native applications.",
    },
    body: {
      es: [
        "Invent.io ofrece desarrollo de sistemas cliente/servidor, portales web, aplicaciones geográficas ArcGIS, apps móviles iOS y Android, integración SOA y planes estratégicos PETI. El reto era ordenar ese catálogo tan amplio sin que el visitante se perdiera.",
        "Estructuré el sitio por servicios, con una ruta de lectura que va de la capacidad general al detalle de cada solución, y una sección de plataformas tecnológicas que respalda la propuesta con lo concreto: ArcGIS, CI/CD con Jenkins y Artifactory, y bases de datos relacionales y no relacionales.",
      ],
      en: [
        "Invent.io offers client/server systems, web portals, ArcGIS geographic applications, iOS and Android apps, SOA integration and PETI strategic plans. The challenge was organising that wide catalogue without losing the visitor.",
        "I structured the site around services, with a reading path that moves from the general capability to each solution's detail, plus a technology section backing the pitch with specifics: ArcGIS, CI/CD with Jenkins and Artifactory, and relational and non-relational databases.",
      ],
    },
    gallery: [
      { src: inventioShot, alt: "Home de Invent.io", hero: true },
      {
        bg: "light",
        items: [
          { src: inventio2, alt: "Portada de Invent.io", device: "monitor" },
        ],
      },
      {
        bg: "accent",
        items: [
          { src: inventioMobile, alt: "Invent.io en movil", device: "phone" },
        ],
      },
    ],
  },
  {
    slug: "ganappi",
    title: "GanAppi",
    subtitle: { es: "Software de gestión ganadera", en: "Livestock management software" },
    role: { es: "Diseño & Desarrollo", en: "Design & Development" },
    credits: { es: "Producto propio", en: "Own product" },
    location: "Colombia",
    year: "2026",
    accent: "#2E7D32",
    liveUrl: "https://ganappi.com/",
    repoUrl: "",
    stack: ["React", "JavaScript", "CSS", "App móvil", "Web"],
    categories: ["web", "mobile"],
    featured: true,
    intro: {
      es: "Potreros, rotación, hato y sanidad en una sola plataforma, pensada para la finca real y no para la hoja de cálculo.",
      en: "Paddocks, rotation, herd and animal health in a single platform, built for the real farm rather than the spreadsheet.",
    },
    body: {
      es: [
        "La ganadería sigue funcionando con hojas sueltas: quién entró a qué potrero, cuánto descansó el pasto, qué animal recibió tratamiento. La información existe, pero no se puede consultar cuando hace falta.",
        "GanAppi organiza esa operación en módulos: control de áreas y ocupación de potreros, entradas, salidas y tiempos de descanso del pastoreo rotacional, inventario del hato con lotes y movimientos, y tareas de sanidad y mantenimiento.",
        "Cada movimiento registrado en campo se convierte en reportes de operación, sostenibilidad y productividad para administradores y asesores.",
      ],
      en: [
        "Cattle ranching still runs on loose sheets: which animals entered which paddock, how long the grass rested, which animal was treated. The information exists, but it cannot be consulted when it is needed.",
        "GanAppi organises that operation into modules: paddock area and occupancy control, entries, exits and rest times for rotational grazing, herd inventory with lots and movements, and health and maintenance tasks.",
        "Every movement recorded in the field becomes operational, sustainability and productivity reporting for managers and advisors.",
      ],
    },
    gallery: [
      { src: ganappiShot, alt: "Plataforma GanAppi", hero: true },
      {
        bg: "light",
        items: [
          { src: ganappiModulos, alt: "Modulos de GanAppi", device: "monitor" },
        ],
      },
      {
        bg: "accent",
        items: [
          { src: ganappiComo, alt: "Como funciona GanAppi", device: "browser" },
        ],
      },
      {
        bg: "light",
        items: [
          { src: ganappiBusiness, alt: "GanAppi Business", device: "laptop" },
          { src: ganappiMobile, alt: "GanAppi en movil", device: "phone" },
        ],
      },
    ],
  },
  {
    slug: "ecoreservas",
    title: "Red de Ecoreservas",
    subtitle: { es: "Visualización territorial para Ecopetrol", en: "Territorial visualisation for Ecopetrol" },
    role: { es: "Desarrollo & Visualización de datos", en: "Development & Data visualisation" },
    credits: { es: "Cliente: Ecopetrol", en: "Client: Ecopetrol" },
    location: "Colombia",
    year: "2026",
    accent: "#00843D",
    liveUrl: "https://dvw8aqhptjkjt.cloudfront.net/red-de-ecoreservas.html",
    repoUrl: "",
    stack: ["JavaScript", "Visualización de datos", "AWS CloudFront"],
    categories: ["web"],
    featured: true,
    intro: {
      es: "La red de ecorreservas de Ecopetrol, designadas en siete núcleos regionales, contada como un recorrido por el territorio.",
      en: "Ecopetrol's network of eco-reserves, designated across seven regional hubs, told as a journey through the territory.",
    },
    body: {
      es: [
        "Un programa de conservación se suele comunicar con un PDF y un mapa estático. El objetivo aquí era que la red de ecorreservas se entendiera de un vistazo: cuántas son, dónde están y qué protege cada núcleo regional.",
        "Desarrollé una pieza de visualización que recorre las ecorreservas designadas en los siete núcleos, con el detalle de cada una accesible desde el propio recorrido.",
      ],
      en: [
        "A conservation programme is usually communicated with a PDF and a static map. The goal here was for the eco-reserve network to be understood at a glance: how many there are, where they are, and what each regional hub protects.",
        "I built a visualisation piece that walks through the eco-reserves designated across the seven hubs, with each one's detail reachable from the journey itself.",
      ],
    },
    gallery: [
      { src: ecoreservasShot, alt: "Red de Ecoreservas de Ecopetrol", hero: true },
      {
        bg: "light",
        items: [
          { src: ecoreservasShot, alt: "Recorrido por la red de ecoreservas", device: "monitor" },
        ],
      },
      {
        bg: "accent",
        items: [
          { src: ecoreservasMobile, alt: "Red de Ecoreservas en movil", device: "phone" },
        ],
      },
    ],
  },
  {
    slug: "geovisor-epm",
    title: "Monitoreo de Fauna",
    subtitle: { es: "Geovisor Hidroituango · EPM", en: "Hidroituango geoviewer · EPM" },
    role: { es: "Desarrollo & Visualización de datos", en: "Development & Data visualisation" },
    credits: { es: "Cliente: Grupo EPM", en: "Client: Grupo EPM" },
    location: "Cañón del Cauca, Colombia",
    year: "2026",
    accent: "#14532D",
    liveUrl: "https://d2qzs8td102d7o.cloudfront.net/expedicion?periodo=2026-09",
    repoUrl: "",
    stack: ["JavaScript", "GIS", "Visualización de datos", "AWS CloudFront"],
    categories: ["web"],
    featured: true,
    intro: {
      es: "Treinta y nueve transectos y veintitrés estaciones de fototrampeo siguiendo felinos silvestres y nutria neotropical en el cañón del Cauca.",
      en: "Thirty-nine transects and twenty-three camera-trap stations tracking wild cats and neotropical otter in the Cauca canyon.",
    },
    body: {
      es: [
        "Entre Ituango y Toledo el Cauca corta un cañón de mil metros de desnivel. El monitoreo de fauna del proyecto Hidroituango recorre ese terreno registrando huellas, heces y rasguños, y dejando cámaras amarradas a la altura del pecho de un ocelote.",
        "El geovisor convierte esos datos de campo en un recorrido: cada transecto con su longitud, su desnivel y sus puntos GPS, y cada estación con sus registros y especies detectadas por franja horaria.",
        "La navegación es el propio scroll: avanzas por el cañón y los datos del tramo se van revelando a medida que subes el filo.",
      ],
      en: [
        "Between Ituango and Toledo the Cauca cuts a canyon a thousand metres deep. The Hidroituango fauna monitoring programme walks that terrain recording tracks, scat and scratches, and leaving cameras tied at the chest height of an ocelot.",
        "The geoviewer turns that field data into a journey: each transect with its length, elevation gain and GPS points, and each station with its records and species detected by time band.",
        "Navigation is the scroll itself: you move along the canyon and each section's data is revealed as you climb the ridge.",
      ],
    },
    gallery: [
      { src: epmShot, alt: "Geovisor de monitoreo de fauna de Hidroituango", hero: true },
      {
        bg: "light",
        items: [
          { src: epmShot, alt: "Recorrido virtual del geovisor", device: "laptop" },
        ],
      },
      {
        bg: "accent",
        items: [
          { src: epmMobile, alt: "Geovisor EPM en movil", device: "phone" },
        ],
      },
    ],
  },
  {
    slug: "trihar",
    title: "TRIHAR",
    subtitle: { es: "Dashboard de hato de cría", en: "Breeding herd dashboard" },
    role: { es: "Desarrollo & Visualización de datos", en: "Development & Data visualisation" },
    credits: { es: "Cliente: Trihar", en: "Client: Trihar" },
    location: "Colombia",
    year: "2026",
    accent: "#7C4A21",
    liveUrl: "https://d31m8xx3s8zm3h.cloudfront.net/",
    repoUrl: "",
    stack: ["React", "Visualización de datos", "3D", "AWS CloudFront"],
    categories: ["web"],
    featured: false,
    intro: {
      es: "El estado de un hato de cría completo —372 animales— con sus alertas, sus tendencias y un potrero en 3D que se puede recorrer.",
      en: "The state of a full breeding herd — 372 animals — with its alerts, trends and a 3D paddock you can walk through.",
    },
    body: {
      es: [
        "Un hato de cría genera indicadores que solo sirven si se leen a tiempo: intervalo entre partos, mortalidad al parto, preñeces confirmadas, animales que pierden peso.",
        "El panel abre con lo urgente —cuántos animales necesitan atención y cuántos son críticos— y desde ahí permite bajar al detalle: hembras paridas, preñez confirmada en palpación, inventario en pie valorizado y tendencias históricas.",
        "El potrero es navegable en 3D: cada animal lleva su orejera, las rojas marcan a los que hay que revisar, y al tocar uno se abre su ficha.",
      ],
      en: [
        "A breeding herd produces indicators that are only useful if read in time: calving interval, calving mortality, confirmed pregnancies, animals losing weight.",
        "The dashboard opens with what is urgent — how many animals need attention and how many are critical — and from there lets you drill down: calved females, pregnancy confirmed by palpation, valued standing inventory and historical trends.",
        "The paddock is navigable in 3D: every animal wears its ear tag, red ones mark those needing review, and tapping one opens its record.",
      ],
    },
    gallery: [
      { src: triharShot, alt: "Dashboard del hato de cria de TRIHAR", hero: true },
      {
        bg: "light",
        items: [
          { src: triharShot, alt: "Panorama del hato", device: "monitor" },
        ],
      },
      {
        bg: "accent",
        items: [
          { src: triharMobile, alt: "TRIHAR en movil", device: "phone" },
        ],
      },
    ],
  },
  {
    slug: "cascajal",
    title: "Geovisor Cascajal",
    subtitle: { es: "Validación con machine learning", en: "Machine learning validation" },
    role: { es: "Machine Learning & Desarrollo", en: "Machine Learning & Development" },
    credits: { es: "Proyecto cliente", en: "Client project" },
    location: "Colombia",
    year: "2026",
    accent: "#A45A2A",
    liveUrl: "https://d3o4oqp3v0aouo.cloudfront.net/",
    repoUrl: "",
    // Acceso de demostración que Juan quiere publicar junto al proyecto
    demoCredentials: { user: "Cascajal", password: "validacion" },
    stack: ["Machine Learning", "Python", "GIS", "AWS CloudFront"],
    categories: ["ml"],
    featured: false,
    intro: {
      es: "Un geovisor con modelos de machine learning para validar información territorial.",
      en: "A geoviewer with machine learning models to validate territorial information.",
    },
    body: {
      es: [
        // TODO(Juan): cuéntame qué valida el modelo y sobre qué datos, para
        // escribir este caso con el mismo nivel de detalle que los demás.
        "El geovisor incorpora modelos de machine learning al proceso de validación de la información territorial, de modo que la revisión deja de ser puramente manual.",
      ],
      en: [
        "The geoviewer brings machine learning models into the territorial data validation process, so the review stops being purely manual.",
      ],
    },
    gallery: [],
  },
  {
    slug: "neerta",
    title: "Neerta",
    subtitle: { es: "Operaciones y transporte empresarial", en: "Operations and corporate transport" },
    role: { es: "Diseño & Desarrollo", en: "Design & Development" },
    credits: { es: "Cliente: Neerta", en: "Client: Neerta" },
    location: "Bogotá, D.C — Colombia",
    year: "2026",
    accent: "#0F3D3E",
    liveUrl: "https://www.neerta.com/",
    repoUrl: "",
    stack: ["React", "JavaScript", "CSS", "SEO"],
    categories: ["web"],
    featured: false,
    intro: {
      es: "Gestión confiable para operaciones que producen valor: transporte empresarial con trazabilidad y vehículos propios.",
      en: "Reliable management for operations that produce value: corporate transport with traceability and an own fleet.",
    },
    body: {
      es: [
        "Neerta alquila vehículos —camionetas, sobre todo— para apoyar la ejecución de contratos y operaciones empresariales, con experiencia probada en el Aeropuerto El Dorado y el Aeropuerto de Cartagena.",
        "El sitio ordena los servicios por línea de operación y apoya la propuesta en lo que diferencia a la empresa: coordinación operativa del servicio, trazabilidad, seguimiento y flota propia.",
      ],
      en: [
        "Neerta rents vehicles — pickups, mainly — to support the execution of corporate contracts and operations, with proven experience at El Dorado and Cartagena airports.",
        "The site organises services by operational line and backs the pitch with what sets the company apart: operational coordination, traceability, tracking and an own fleet.",
      ],
    },
    gallery: [
      { src: neertaShot, alt: "Home de Neerta", hero: true },
      {
        bg: "light",
        items: [
          { src: neerta2, alt: "Servicios de Neerta", device: "monitor" },
        ],
      },
      {
        bg: "accent",
        items: [
          { src: neerta3, alt: "Operacion de Neerta", device: "browser" },
        ],
      },
    ],
  },
  {
    slug: "snake-meta",
    title: "Snake Meta",
    subtitle: { es: "App de identificación de serpientes", en: "Snake identification app" },
    role: { es: "Desarrollo móvil & Backend", en: "Mobile & Backend Development" },
    credits: { es: "Universidad de los Llanos", en: "Universidad de los Llanos" },
    location: "Meta, Colombia",
    year: "2024",
    accent: "#2F5D3A",
    liveUrl: "https://drive.google.com/file/d/1_r6n5F9CfS1D_fHqH1YTVAttY6iJlGXn/view?usp=sharing",
    repoUrl: "https://github.com/JuanRojasDev/Snake-Meta/tree/main",
    stack: ["Flutter", "Python", "FastAPI", "SQLAlchemy", "Firebase", "Google Maps"],
    categories: ["mobile"],
    featured: false,
    intro: {
      es: "Una app para prevenir, informar y preservar las especies de serpientes del Meta, con georreferenciación de avistamientos.",
      en: "An app to prevent, inform and preserve the snake species of Meta, with sighting georeferencing.",
    },
    body: {
      es: [
        "En el Meta, el accidente ofídico se trata tarde porque nadie sabe qué especie mordió. La información existe, pero vive en documentos que nadie consulta en el campo.",
        "Construí una app en Flutter con arquitectura MVVM y Live Data, respaldada por una API en FastAPI que guarda la taxonomía, los datos y la información de cada especie del departamento.",
        "Integré la API de Google Maps para georreferenciar cada avistamiento en la base de datos local del usuario, de modo que la app funciona también sin señal — el escenario real de uso.",
      ],
      en: [
        "In Meta, snakebites are treated late because nobody knows which species bit. The information exists, but it lives in documents nobody reads in the field.",
        "I built a Flutter app with MVVM architecture and Live Data, backed by a FastAPI service storing the taxonomy, data and information for every species in the region.",
        "I integrated the Google Maps API to georeference each sighting in the user local database, so the app works offline too — the real usage scenario.",
      ],
    },
    gallery: [
      {
        src: "https://i.ibb.co/ffbchB6/1710953065501.jpg",
        alt: "Snake Meta",
        full: true,
      },
    ],
  },
  {
    slug: "aktua",
    title: "Aktua",
    subtitle: { es: "Comunidades de barrio", en: "Neighborhood communities" },
    role: { es: "Backend & Arquitectura", en: "Backend & Architecture" },
    credits: { es: "Con Camila Santacruz", en: "With Camila Santacruz" },
    location: "Colombia",
    year: "2024",
    accent: "#B4472E",
    liveUrl: "https://cloud.protopie.io/p/9e25b9516ea6b9c252f5179d",
    repoUrl: "https://github.com/Aktua-co",
    stack: ["Flutter", "Python", "FastAPI", "PostgreSQL", "Docker", "JWT"],
    categories: ["mobile"],
    featured: false,
    intro: {
      es: "Una PWA construida en Scrum para crear comunidades de barrio unidas, seguras y colaborativas.",
      en: "A PWA built in Scrum to create united, safe and collaborative neighborhood communities.",
    },
    body: {
      es: [
        "Desarrollamos una PWA bajo marco Scrum con el objetivo de fomentar comunidades de vecinos conectadas.",
        "Del lado del servidor levanté los servicios de publicaciones, comentarios y calificaciones con FastAPI, Uvicorn y Poetry, con SQLAlchemy sobre PostgreSQL, y dockericé el proyecto para hacerlo multiplataforma.",
        "La aplicación móvil se construyó en Flutter, compatible con iOS y Android desde una sola base de código.",
      ],
      en: [
        "We developed a PWA under a Scrum framework aimed at fostering connected neighborhood communities.",
        "On the server side I built the posts, comments and ratings services with FastAPI, Uvicorn and Poetry, using SQLAlchemy over PostgreSQL, and dockerized the project to make it cross-platform.",
        "The mobile app was built in Flutter, compatible with iOS and Android from a single codebase.",
      ],
    },
    gallery: [
      {
        src: "https://i.ibb.co/rDfB3Hh/1710960857056.jpg",
        alt: "Aktua",
        full: true,
      },
    ],
  },
  {
    slug: "unillanos",
    title: "Unillanos",
    subtitle: { es: "Landing de agradecimientos", en: "Acknowledgments landing" },
    role: { es: "Diseño & Desarrollo", en: "Design & Development" },
    credits: { es: "Universidad de los Llanos", en: "Universidad de los Llanos" },
    location: "Meta, Colombia",
    year: "2024",
    accent: "#8A6B1F",
    liveUrl: "https://acknowledgment-c1.vercel.app/",
    repoUrl: "https://github.com/JuanRojasDev/landing-page-unillanos",
    stack: ["Astro", "Tailwind CSS", "Material UI", "JavaScript"],
    categories: ["web"],
    featured: false,
    intro: {
      es: "Una landing de agradecimientos para la graduación, bilingüe y con carrusel de la cohorte.",
      en: "A graduation acknowledgments landing page, bilingual and with a cohort carousel.",
    },
    body: {
      es: [
        "Diseñé y desarrollé en Astro y Tailwind una página dedicada a los agradecimientos de graduación de mis compañeros de estudio.",
        "El discurso se puede leer en español e inglés, y un carrusel recorre las fotos de quienes se graduaban.",
      ],
      en: [
        "I designed and built a page in Astro and Tailwind dedicated to my classmates graduation acknowledgments.",
        "The speech can be read in Spanish and English, and a carousel runs through photos of the graduating cohort.",
      ],
    },
    gallery: [
      {
        src: "https://i.ibb.co/xbr5HwF/speechunillanos.png",
        alt: "Landing Unillanos",
        full: true,
      },
    ],
  },
];

export const featuredWork = work.filter((p) => p.featured);

export const getWork = (slug) => work.find((p) => p.slug === slug);

export const getNextWork = (slug) => {
  const i = work.findIndex((p) => p.slug === slug);
  return work[(i + 1) % work.length];
};
