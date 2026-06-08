// Central service catalog. Drives the homepage selector, /services, the SEO
// service pages, footer links and dashboard category filters.
// `icon` maps to a lucide-react icon name (resolved in components/ui/Icon.jsx).

export const services = [
  {
    slug: 'electrician-tirana',
    category: 'Electrician',
    name: 'Elektricist',
    title: 'Elektricist në Tiranë',
    icon: 'Zap',
    color: 'amber',
    short: 'Riparime elektrike, instalime, ndriçim, priza, automate dhe mirëmbajtje.',
    seo: {
      title: 'Elektricist Tiranë | Shërbime Elektrike për Shtëpi dhe Biznese',
      description:
        'Kërkon elektricist në Tiranë? Merr oferta nga profesionistë të verifikuar për riparime elektrike, instalime, ndriçim, priza dhe defekte elektrike.',
      keywords: ['elektricist tirane', 'sherbime elektrike tirane', 'electrician tirana'],
    },
    h1: 'Elektricist në Tiranë për Shtëpi dhe Biznese',
    intro:
      'Gjej një elektricist të besueshëm në Tiranë për çdo nevojë — nga një prizë që nuk punon te instalime të plota elektrike. Përshkruaj problemin, merr oferta nga profesionistë të verifikuar dhe zgjidh sipas çmimit, eksperiencës dhe vlerësimeve.',
    problems: [
      { title: 'Riparime elektrike', text: 'Defekte, qarqe të dëmtuara dhe ndërprerje të papritura të energjisë.' },
      { title: 'Instalime elektrike', text: 'Instalime të reja për apartamente, vila, zyra dhe ambiente biznesi.' },
      { title: 'Probleme me prizat', text: 'Priza që nuk punojnë, mbinxehen ose shkëputen vazhdimisht.' },
      { title: 'Probleme me ndriçimin', text: 'Llamba, spote, ndriçim LED dhe panele ndriçimi për çdo ambient.' },
      { title: 'Probleme me automatët', text: 'Automate që bien, kuadro elektrike dhe siguresa të vjetra.' },
      { title: 'Mirëmbajtje elektrike', text: 'Kontrolle periodike dhe mirëmbajtje për shtëpi dhe biznese.' },
    ],
    benefits: [
      'Profesionistë të verifikuar përpara se të aktivizohen',
      'Oferta të krahasueshme për të njëjtën punë',
      'Vlerësime reale nga klientët e mëparshëm',
      'Mundësi për raste urgjente brenda ditës',
    ],
    faqs: [
      { q: 'Sa shpejt mund të gjej një elektricist në Tiranë?', a: 'Për shumicën e zonave të Tiranës, profesionistët mund të dërgojnë oferta brenda pak minutash dhe disa ofrojnë ndërhyrje të njëjtën ditë për raste urgjente.' },
      { q: 'A mund të marr disa oferta për të njëjtën punë?', a: 'Po. Pas kërkesës, disa elektricistë mund të dërgojnë oferta dhe ti i krahason sipas çmimit, kohës së ardhjes dhe vlerësimeve.' },
      { q: 'A mund të shoh review-t e elektricistit?', a: 'Sigurisht. Çdo profil publik tregon vlerësimin mesatar, numrin e review-ve dhe punët e përfunduara.' },
      { q: 'A ofrohen shërbime për biznese?', a: 'Po, shumë profesionistë mbulojnë zyra, dyqane dhe ambiente biznesi, përveç shtëpive.' },
      { q: 'Si funksionon pagesa?', a: 'Çmimi konfirmohet me profesionistin pas vlerësimit të problemit. Pagesa kryhet direkt me profesionistin sipas marrëveshjes.' },
    ],
  },
  {
    slug: 'plumber-tirana',
    category: 'Plumber',
    name: 'Hidraulik',
    title: 'Hidraulik në Tiranë',
    icon: 'Droplets',
    color: 'navy',
    short: 'Rrjedhje uji, tubacione, lavamanë, banjo, kuzhina dhe ndërhyrje të shpejta.',
    seo: {
      title: 'Hidraulik Tiranë | Riparime Hidraulike dhe Rrjedhje Uji',
      description:
        'Kërkon hidraulik në Tiranë? Gjej profesionistë për rrjedhje uji, tubacione, lavamanë, banjo, kuzhina dhe ndërhyrje hidraulike.',
      keywords: ['hidraulik tirane', 'sherbime hidraulike tirane', 'plumber tirana'],
    },
    h1: 'Hidraulik në Tiranë për Riparime dhe Mirëmbajtje',
    intro:
      'Gjej një hidraulik të besueshëm në Tiranë për rrjedhje uji, bllokime, instalime dhe emergjenca. Përshkruaj problemin, merr oferta dhe zgjidh profesionistin që të jep më shumë besim.',
    problems: [
      { title: 'Rrjedhje uji', text: 'Rrjedhje nën lavaman, tualet, makineri larëse ose tubacione të fshehura.' },
      { title: 'Tuba dhe tubacione', text: 'Riparim, zëvendësim dhe instalim tubacionesh të reja.' },
      { title: 'Lavamanë', text: 'Montim, zëvendësim dhe çbllokim lavamanësh dhe rubinetesh.' },
      { title: 'Banjo', text: 'Tualete, dushe, bojlerë dhe instalime të plota banjoje.' },
      { title: 'Kuzhina', text: 'Lidhje uji për kuzhina, lavastovilje dhe makineri larëse.' },
      { title: 'Emergjenca hidraulike', text: 'Ndërhyrje të shpejta për rrjedhje serioze dhe bllokime urgjente.' },
    ],
    benefits: [
      'Ndërhyrje të shpejta për emergjenca',
      'Oferta transparente para fillimit të punës',
      'Profesionistë me eksperiencë të verifikuar',
      'Vlerësime nga klientët realë',
    ],
    faqs: [
      { q: 'A keni hidraulik për emergjenca?', a: 'Po. Disa profesionistë shënojnë disponueshmëri për ndërhyrje të njëjtën ditë në raste rrjedhjesh urgjente.' },
      { q: 'A mund të krahasoj disa oferta?', a: 'Po, mund të marrësh oferta nga disa hidraulikë dhe t’i krahasosh para se të zgjedhësh.' },
      { q: 'A mbulohen edhe bizneset?', a: 'Po, përveç shtëpive, shumë profesionistë mbulojnë lokale, zyra dhe ambiente biznesi.' },
      { q: 'Si përcaktohet çmimi?', a: 'Çmimi i përafërt jepet në ofertë dhe konfirmohet pas vlerësimit të problemit në vend.' },
      { q: 'A mund të shoh punë të mëparshme?', a: 'Po, profilet publike përfshijnë foto pune dhe vlerësime nga klientë të mëparshëm.' },
    ],
  },
  {
    slug: 'air-conditioner-technician-tirana',
    category: 'AC Technician',
    name: 'Teknik Kondicioneri',
    title: 'Teknik Kondicioneri në Tiranë',
    icon: 'Wind',
    color: 'navy',
    short: 'Montim, pastrim, mirëmbajtje, mbushje gazi dhe riparim kondicionerësh.',
    seo: {
      title: 'Teknik Kondicioneri Tiranë | Montim, Pastrim dhe Riparim',
      description:
        'Kërkon teknik kondicioneri në Tiranë? Merr oferta për montim, pastrim, mbushje gazi dhe riparim kondicionerësh nga profesionistë të verifikuar.',
      keywords: ['teknik kondicioneri tirane', 'montim kondicioneri tirane', 'pastrim kondicioneri tirane'],
    },
    h1: 'Teknik Kondicioneri në Tiranë',
    intro:
      'Montim, pastrim, mbushje gazi dhe riparim kondicionerësh në Tiranë. Merr oferta nga teknikë të verifikuar dhe zgjidh sipas çmimit dhe vlerësimeve.',
    problems: [
      { title: 'Montim kondicioneri', text: 'Instalim profesional për shtëpi, zyra dhe biznese.' },
      { title: 'Pastrim kondicioneri', text: 'Pastrim filtri dhe njësive për ajër më të shëndetshëm.' },
      { title: 'Mbushje gazi', text: 'Rimbushje gazi dhe kontroll i sistemit ftohës.' },
      { title: 'Riparim', text: 'Diagnostikim dhe riparim defektesh të kondicionerëve.' },
      { title: 'Mirëmbajtje', text: 'Kontrolle periodike për performancë dhe jetëgjatësi.' },
      { title: 'Zhvendosje', text: 'Çmontim dhe rimontim njësish gjatë lëvizjeve.' },
    ],
    benefits: [
      'Teknikë me eksperiencë në marka të ndryshme',
      'Oferta të qarta për montim dhe mirëmbajtje',
      'Mundësi rezervimi brenda javës',
      'Vlerësime transparente nga klientët',
    ],
    faqs: [
      { q: 'Sa kushton një pastrim kondicioneri?', a: 'Çmimi varet nga numri i njësive dhe gjendja, por jepet qartë në ofertën e teknikut para fillimit.' },
      { q: 'A mund të montoni kondicioner të ri?', a: 'Po, teknikët ofrojnë montim të plotë me garanci sipas marrëveshjes.' },
      { q: 'A bëhet mbushje gazi në vend?', a: 'Po, mbushja e gazit kryhet në vendndodhjen tënde pas diagnostikimit.' },
      { q: 'A mund të krahasoj oferta?', a: 'Po, merr disa oferta dhe zgjidh sipas çmimit, eksperiencës dhe review-ve.' },
    ],
  },
  {
    slug: 'home-repairs-tirana',
    category: 'Home Repairs',
    name: 'Riparime Shtëpie',
    title: 'Riparime Shtëpie në Tiranë',
    icon: 'Hammer',
    color: 'amber',
    short: 'Shërbime praktike për apartamente, shtëpi, zyra dhe ambiente biznesi.',
    seo: {
      title: 'Riparime Shtëpie Tiranë | Mjeshtër për Çdo Nevojë',
      description:
        'Kërkon mjeshtër për riparime shtëpie në Tiranë? Merr oferta për riparime të vogla dhe të mëdha nga profesionistë të verifikuar.',
      keywords: ['riparime shtepie tirane', 'mjeshter per shtepi tirane', 'home repairs tirana'],
    },
    h1: 'Riparime Shtëpie në Tiranë për Çdo Nevojë',
    intro:
      'Nga riparime të vogla deri te ndërhyrje më të mëdha — gjej një mjeshtër të besueshëm në Tiranë. Përshkruaj çfarë të duhet, merr oferta dhe zgjidh profesionistin më të përshtatshëm.',
    problems: [
      { title: 'Riparime të përgjithshme', text: 'Dyer, dritare, mobilje dhe rregullime të ndryshme.' },
      { title: 'Pllaka dhe suvatime', text: 'Riparim pllakash, suvatim dhe rifinitura.' },
      { title: 'Montime', text: 'Montim mobiljesh, raftesh, perdesh dhe pajisjesh.' },
      { title: 'Hidroizolim', text: 'Ndërhyrje për lagështirë dhe rrjedhje.' },
      { title: 'Riparime zyrash', text: 'Mirëmbajtje praktike për ambiente biznesi.' },
      { title: 'Punë të vogla', text: 'Çdo punë e vogël që kërkon dorë mjeshtri.' },
    ],
    benefits: [
      'Një kontakt për shumë lloje punësh',
      'Oferta të qarta para fillimit',
      'Profesionistë lokalë pranë zonës tënde',
      'Vlerësime nga klientët realë',
    ],
    faqs: [
      { q: 'Çfarë lloj punësh mbulohen?', a: 'Nga riparime të vogla deri te ndërhyrje më komplekse për shtëpi, zyra dhe biznese.' },
      { q: 'A mund të dërgoj foto të problemit?', a: 'Po, mund të bashkëngjisësh foto kur dërgon kërkesën për oferta më të sakta.' },
      { q: 'A marr oferta nga disa mjeshtra?', a: 'Po, disa profesionistë mund të dërgojnë oferta që ti i krahason lehtësisht.' },
    ],
  },
  {
    slug: 'painter-tirana',
    category: 'Painter',
    name: 'Bojaxhi',
    title: 'Bojaxhi në Tiranë',
    icon: 'Paintbrush',
    color: 'navy',
    short: 'Lyerje muresh, fasada, suvatime dhe rifinitura për ambiente të reja.',
    seo: {
      title: 'Bojaxhi Tiranë | Lyerje dhe Rifinitura për Shtëpi e Biznese',
      description:
        'Kërkon bojaxhi në Tiranë? Merr oferta për lyerje muresh, fasada dhe rifinitura nga profesionistë të verifikuar.',
      keywords: ['bojaxhi tirane', 'lyerje shtepie tirane', 'painter tirana'],
    },
    h1: 'Bojaxhi në Tiranë për Lyerje dhe Rifinitura',
    intro:
      'Lyerje muresh, fasada dhe rifinitura cilësore në Tiranë. Përshkruaj ambientin, merr oferta dhe zgjidh bojaxhinë me vlerësimet më të mira.',
    problems: [
      { title: 'Lyerje mure', text: 'Lyerje e brendshme për apartamente, shtëpi dhe zyra.' },
      { title: 'Fasada', text: 'Lyerje fasade dhe ambiente të jashtme.' },
      { title: 'Suvatim', text: 'Suvatim dhe përgatitje sipërfaqesh para lyerjes.' },
      { title: 'Rifinitura', text: 'Detaje dhe rifinitura për një rezultat të pastër.' },
      { title: 'Ngjyra dekorative', text: 'Efekte dhe ngjyra dekorative sipas kërkesës.' },
      { title: 'Riparim dëmtimesh', text: 'Mbulim njollash, çarjesh dhe dëmtimesh.' },
    ],
    benefits: [
      'Oferta të qarta sipas m² dhe ambientit',
      'Profesionistë me portofol pune',
      'Vlerësime reale nga klientët',
      'Mundësi planifikimi sipas kohës tënde',
    ],
    faqs: [
      { q: 'Si llogaritet çmimi i lyerjes?', a: 'Zakonisht sipas sipërfaqes (m²) dhe llojit të punës; çmimi jepet qartë në ofertë.' },
      { q: 'A përfshihet përgatitja e mureve?', a: 'Shumë oferta përfshijnë përgatitjen; gjithçka specifikohet në mesazhin e ofertës.' },
      { q: 'A mund të shoh punë të mëparshme?', a: 'Po, profilet publike përmbajnë foto nga punë të kryera.' },
    ],
  },
  {
    slug: 'handyman-tirana',
    category: 'Handyman',
    name: 'Mjeshtër (Handyman)',
    title: 'Mjeshtër në Tiranë',
    icon: 'Wrench',
    color: 'amber',
    short: 'Një mjeshtër për montime, riparime të vogla dhe punë të ndryshme në shtëpi.',
    seo: {
      title: 'Handyman Tiranë | Mjeshtër për Punë të Ndryshme',
      description:
        'Kërkon mjeshtër (handyman) në Tiranë? Merr oferta për montime, riparime të vogla dhe punë të ndryshme nga profesionistë të verifikuar.',
      keywords: ['handyman tirane', 'mjeshter per shtepi tirane', 'handyman tirana'],
    },
    h1: 'Mjeshtër (Handyman) në Tiranë për Punë të Ndryshme',
    intro:
      'Një mjeshtër i besueshëm për montime, riparime të vogla dhe punë të ndryshme në shtëpi e zyrë. Përshkruaj çfarë të duhet dhe merr oferta brenda pak kohe.',
    problems: [
      { title: 'Montim mobiljesh', text: 'Montim mobiljesh, raftesh dhe pajisjesh shtëpiake.' },
      { title: 'Varje dhe fiksime', text: 'Varje tablosh, perdesh, raftesh dhe televizorësh.' },
      { title: 'Riparime të vogla', text: 'Dyer, sirtarë, menteshat dhe rregullime të ndryshme.' },
      { title: 'Zëvendësime', text: 'Zëvendësim çelësash, prizash dhe aksesorësh.' },
      { title: 'Asistencë lëvizjeje', text: 'Ndihmë gjatë lëvizjes dhe sistemimit të ambienteve.' },
      { title: 'Punë të përziera', text: 'Çdo punë e vogël që kërkon një dorë mjeshtri.' },
    ],
    benefits: [
      'Një kontakt për shumë punë të vogla',
      'Oferta të shpejta dhe të qarta',
      'Profesionistë pranë zonës tënde',
      'Vlerësime transparente',
    ],
    faqs: [
      { q: 'A mund të kërkoj disa punë njëherësh?', a: 'Po, përshkruaj të gjitha punët dhe profesionisti përgatit një ofertë të plotë.' },
      { q: 'A merr disa oferta?', a: 'Po, mund të krahasosh oferta nga disa mjeshtra.' },
      { q: 'A mbulohen edhe zyrat?', a: 'Po, shërbimet ofrohen për shtëpi, zyra dhe biznese.' },
    ],
  },
];

// Extra non-SEO categories used in selectors / registration / dashboards.
export const allCategories = [
  ...services.map((s) => ({ key: s.category, label: s.name, icon: s.icon })),
  { key: 'Installer', label: 'Montime', icon: 'PackageOpen' },
  { key: 'Cleaning Service', label: 'Pastrim', icon: 'Sparkles' },
  { key: 'Maintenance', label: 'Mirëmbajtje', icon: 'Settings' },
  { key: 'Other', label: 'Tjetër', icon: 'MoreHorizontal' },
];

export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug);
export const getServiceByCategory = (category) =>
  services.find((s) => s.category === category);

export const categoryLabel = (category) => {
  const c = allCategories.find((x) => x.key === category);
  return c ? c.label : category;
};
