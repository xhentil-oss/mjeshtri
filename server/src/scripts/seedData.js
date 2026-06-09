// Demo data ported from the frontend src/data/* modules. Kept server-side so the
// API has the same content the UI was built against. Safe to delete or replace
// with real data once the marketplace is live.

export const customers = [
  { id: 'cust-1', name: 'Eralda Meta', email: 'klient@demo.al', phone: '+355 69 111 1111', area: 'Komuna e Parisit' },
  { id: 'cust-2', name: 'Biznesi Demo SHPK', email: 'biznes@demo.al', phone: '+355 69 222 2222', area: 'Qendër' },
  { id: 'cust-3', name: 'Drini Bega', email: 'drini@demo.al', phone: '+355 69 444 4444', area: 'Astir' },
  { id: 'cust-4', name: 'Marsida Lleshi', email: 'marsida@demo.al', phone: '+355 69 555 5555', area: 'Fresku' },
];

// Each professional also gets a login. pro-arben uses the documented demo email.
export const professionals = [
  {
    id: 'pro-arben', email: 'profesionist@demo.al', phone: '+355 69 333 3333',
    slug: 'electrician-arben-tirana', name: 'Arben Hoxha', category: 'Electrician',
    areas: ['Astir', 'Yzberisht', 'Komuna e Parisit', 'Qendër'], city: 'Tiranë',
    rating: 4.9, reviews: 128, completedJobs: 210, experience: 8, verified: true, featured: true,
    responseTime: 'mesatarisht 12 min', availability: 'I disponueshëm sot', business: 'Hoxha Electric',
    bio: 'Elektricist me 8 vjet eksperiencë në riparime, instalime dhe kuadro elektrike për shtëpi dhe biznese në Tiranë. Punë e pastër, çmime transparente dhe ndërhyrje të shpejta për raste urgjente.',
    skills: ['Riparime elektrike', 'Instalime', 'Kuadro elektrike', 'Ndriçim LED', 'Automate'],
    portfolio: ['#1f467c', '#2c5d9e', '#ff7a1a', '#163a64'],
  },
  {
    id: 'pro-ilir', email: 'pro-ilir@demo.al', phone: '+355 69 333 0002',
    slug: 'plumber-ilir-tirana', name: 'Ilir Kola', category: 'Plumber',
    areas: ['Blloku', 'Myslym Shyri', 'Qendër', 'Don Bosko'], city: 'Tiranë',
    rating: 4.8, reviews: 96, completedJobs: 175, experience: 10, verified: true, featured: true,
    responseTime: 'mesatarisht 18 min', availability: 'I disponueshëm brenda 24 orëve', business: 'Kola Hidro',
    bio: 'Hidraulik me 10 vjet eksperiencë. I specializuar në rrjedhje uji, tubacione, banjo dhe kuzhina. Ofroj ndërhyrje urgjente dhe oferta të qarta para fillimit të punës.',
    skills: ['Rrjedhje uji', 'Tubacione', 'Banjo', 'Kuzhina', 'Emergjenca'],
    portfolio: ['#163a64', '#1f467c', '#2c5d9e', '#0a2540'],
  },
  {
    id: 'pro-besmir', email: 'pro-besmir@demo.al', phone: '+355 69 333 0003',
    slug: 'ac-technician-besmir-tirana', name: 'Besmir Dervishi', category: 'AC Technician',
    areas: ['Ali Demi', 'Fresku', 'Laprakë', 'Qendër'], city: 'Tiranë',
    rating: 4.7, reviews: 74, completedJobs: 132, experience: 6, verified: true, featured: true,
    responseTime: 'mesatarisht 25 min', availability: 'I disponueshëm këtë javë', business: 'Cool Air Tirana',
    bio: 'Teknik kondicioneri me 6 vjet eksperiencë në montim, pastrim, mbushje gazi dhe riparim për të gjitha markat kryesore. Mirëmbajtje periodike për shtëpi dhe biznese.',
    skills: ['Montim', 'Pastrim', 'Mbushje gazi', 'Riparim', 'Mirëmbajtje'],
    portfolio: ['#2c5d9e', '#ff7a1a', '#163a64', '#1f467c'],
  },
  {
    id: 'pro-erion', email: 'pro-erion@demo.al', phone: '+355 69 333 0004',
    slug: 'handyman-erion-tirana', name: 'Erion Leka', category: 'Handyman',
    areas: ['Kombinat', 'Selitë', 'Porcelan', 'Yzberisht'], city: 'Tiranë',
    rating: 4.9, reviews: 110, completedJobs: 190, experience: 7, verified: true, featured: true,
    responseTime: 'mesatarisht 15 min', availability: 'I disponueshëm sot', business: '',
    bio: 'Mjeshtër për punë të ndryshme në shtëpi dhe zyra — montime, riparime të vogla, varje dhe fiksime. Një kontakt i vetëm për shumë nevoja.',
    skills: ['Montim mobiljesh', 'Riparime të vogla', 'Varje & fiksime', 'Zëvendësime'],
    portfolio: ['#0a2540', '#1f467c', '#2c5d9e', '#ff7a1a'],
  },
  {
    id: 'pro-gentian', email: 'pro-gentian@demo.al', phone: '+355 69 333 0005',
    slug: 'painter-gentian-tirana', name: 'Gentian Mara', category: 'Painter',
    areas: ['Rruga e Durrësit', '21 Dhjetori', 'Laprakë'], city: 'Tiranë',
    rating: 4.8, reviews: 63, completedJobs: 98, experience: 9, verified: true, featured: false,
    responseTime: 'mesatarisht 30 min', availability: 'I disponueshëm këtë javë', business: 'Mara Color',
    bio: 'Bojaxhi me 9 vjet eksperiencë në lyerje të brendshme, fasada dhe rifinitura. Punë e pastër dhe afate të respektuara.',
    skills: ['Lyerje mure', 'Fasada', 'Suvatim', 'Rifinitura'],
    portfolio: ['#ff7a1a', '#2c5d9e', '#163a64', '#1f467c'],
  },
  {
    id: 'pro-sokol', email: 'pro-sokol@demo.al', phone: '+355 69 333 0006',
    slug: 'electrician-sokol-tirana', name: 'Sokol Bregu', category: 'Electrician',
    areas: ['Don Bosko', 'Laprakë', 'Rruga e Durrësit'], city: 'Tiranë',
    rating: 4.6, reviews: 41, completedJobs: 70, experience: 4, verified: true, featured: false,
    responseTime: 'mesatarisht 22 min', availability: 'I disponueshëm brenda 24 orëve', business: '',
    bio: 'Elektricist i ri me energji dhe çmime konkurruese për riparime dhe instalime në shtëpi e zyra.',
    skills: ['Riparime elektrike', 'Priza', 'Ndriçim', 'Instalime'],
    portfolio: ['#1f467c', '#163a64', '#2c5d9e', '#0a2540'],
  },
  {
    id: 'pro-fatjon', email: 'pro-fatjon@demo.al', phone: '+355 69 333 0007',
    slug: 'plumber-fatjon-tirana', name: 'Fatjon Shehu', category: 'Plumber',
    areas: ['Astir', 'Yzberisht', 'Kombinat'], city: 'Tiranë',
    rating: 4.7, reviews: 58, completedJobs: 104, experience: 5, verified: false, featured: false,
    responseTime: 'mesatarisht 28 min', availability: 'I disponueshëm këtë javë', business: '',
    bio: 'Hidraulik për riparime dhe instalime në shtëpi. Aktualisht në proces verifikimi.',
    skills: ['Rrjedhje uji', 'Lavamanë', 'Banjo'],
    portfolio: ['#2c5d9e', '#1f467c', '#163a64', '#0a2540'],
  },
];

export const jobs = [
  { id: 'job-1', category: 'Electrician', area: 'Astir', title: 'Priza pa korrent në një dhomë', description: 'Prizat në një dhomë nuk punojnë. Të tjerat në apartament funksionojnë normalisht. Ndoshta problem me qarkun ose automatin.', urgency: 'Sot', budget: null, status: 'Open for Bids', postedAt: '2025-06-05', customerId: 'cust-1', photos: ['#1f467c', '#2c5d9e'], contact: 'WhatsApp' },
  { id: 'job-2', category: 'Plumber', area: 'Komuna e Parisit', title: 'Rrjedhje uji nën lavamanin e kuzhinës', description: 'Ka një rrjedhje uji nën lavamanin e kuzhinës që po lag dollapin. Duhet ndërhyrje sa më shpejt.', urgency: 'Brenda 24 orëve', budget: '3,000 - 5,000 ALL', status: 'Open for Bids', postedAt: '2025-06-04', customerId: 'cust-1', photos: ['#163a64'], contact: 'Telefon' },
  { id: 'job-3', category: 'AC Technician', area: 'Blloku', title: 'Kondicioneri kërkon pastrim dhe mbushje gazi', description: 'Kondicioneri nuk ftoh si më parë. Ka kohë pa u pastruar dhe mendoj se i duhet edhe mbushje gazi.', urgency: 'Këtë javë', budget: '4,000 ALL', status: 'Open for Bids', postedAt: '2025-06-03', customerId: 'cust-2', photos: [], contact: 'WhatsApp' },
  { id: 'job-4', category: 'Home Repairs', area: 'Yzberisht', title: 'Riparime të vogla në banjo', description: 'Dera e banjos nuk mbyllet mirë dhe disa pllaka janë shkëputur. Punë e vogël por kërkon mjeshtër.', urgency: 'Jo urgjente', budget: null, status: 'Pending', postedAt: '2025-06-02', customerId: 'cust-2', photos: ['#0a2540'], contact: 'Telefon' },
  { id: 'job-5', category: 'Plumber', area: 'Myslym Shyri', title: 'Montim bojleri elektrik', description: 'Kam blerë një bojler të ri 80L dhe më duhet montimi dhe lidhja.', urgency: 'Këtë javë', budget: '2,000 - 3,000 ALL', status: 'In Progress', postedAt: '2025-05-30', customerId: 'cust-1', selectedProId: 'pro-ilir', photos: [], contact: 'WhatsApp' },
  { id: 'job-6', category: 'Electrician', area: 'Qendër', title: 'Instalim ndriçimi për zyrë', description: 'Na duhet instalim ndriçimi LED për një zyrë rreth 60 m².', urgency: 'Këtë javë', budget: null, status: 'Completed', postedAt: '2025-05-18', completedAt: '2025-05-22', customerId: 'cust-2', selectedProId: 'pro-arben', photos: [], contact: 'Telefon', reviewed: true },
];

export const bids = [
  { id: 'bid-1', jobId: 'job-1', proId: 'pro-arben', price: 2500, arrival: 'Sot pas orës 17:00', completion: '~1 orë', label: 'Më i vlerësuari', message: 'Mund të vij sot pas orës 17:00. Çmimi përfundimtar konfirmohet pasi të kontrolloj problemin.', status: 'pending' },
  { id: 'bid-2', jobId: 'job-1', proId: 'pro-sokol', price: 2000, arrival: 'Nesër paradite', completion: '~1.5 orë', label: 'Vlerë e mirë', message: 'Çmim konkurrues. Mund të vij nesër paradite dhe e zgjidh shpejt.', status: 'pending' },
  { id: 'bid-3', jobId: 'job-1', proId: 'pro-erion', price: 2800, arrival: 'Sot pas orës 19:00', completion: '~1 orë', label: 'Përgjigje e shpejtë', message: 'Përshëndetje, jam i lirë sot në mbrëmje. E kontrolloj dhe e rregulloj në vend.', status: 'pending' },
  { id: 'bid-4', jobId: 'job-1', proId: 'pro-fatjon', price: 2300, arrival: 'Brenda 2 ditësh', completion: '~1.5 orë', label: '', message: 'Mund të ndërhyj brenda dy ditësh me çmim të arsyeshëm.', status: 'pending' },
  { id: 'bid-5', jobId: 'job-2', proId: 'pro-ilir', price: 4000, arrival: 'Sot pas orës 14:00', completion: '~1 orë', label: 'Më me eksperiencë', message: 'E zgjidh rrjedhjen sot. Çmimi përfshin materialin bazë.', status: 'pending' },
  { id: 'bid-6', jobId: 'job-2', proId: 'pro-fatjon', price: 3500, arrival: 'Nesër paradite', completion: '~1.5 orë', label: 'Vlerë e mirë', message: 'Mund të vij nesër në mëngjes. Çmim i mirë për këtë punë.', status: 'pending' },
  { id: 'bid-7', jobId: 'job-2', proId: 'pro-erion', price: 4500, arrival: 'Sot pas orës 18:00', completion: '~1 orë', label: 'Përgjigje e shpejtë', message: 'I lirë sot në mbrëmje, e kontrolloj dhe e rregulloj.', status: 'pending' },
  { id: 'bid-8', jobId: 'job-3', proId: 'pro-besmir', price: 4000, arrival: 'Të enjten paradite', completion: '~1.5 orë', label: 'Më i vlerësuari', message: 'Pastrim i plotë + mbushje gazi. Konfirmohet pas kontrollit.', status: 'pending' },
  { id: 'bid-9', jobId: 'job-5', proId: 'pro-ilir', price: 2500, arrival: 'E premte paradite', completion: '~2 orë', label: 'Më me eksperiencë', message: 'Montim dhe lidhje bojleri me garanci pune.', status: 'accepted' },
  { id: 'bid-10', jobId: 'job-6', proId: 'pro-arben', price: 9000, arrival: 'Brenda javës', completion: '~1 ditë', label: 'Më i vlerësuari', message: 'Instalim i plotë LED me materiale cilësore.', status: 'accepted' },
];

export const reviews = [
  { id: 'rev-1', proId: 'pro-arben', customer: 'Klient demo', area: 'Astir', rating: 5, date: '2025-05-12', text: 'Elektricisti erdhi në kohë, shpjegoi problemin qartë dhe e rregulloi shpejt. Shërbim shumë profesional.', breakdown: { quality: 5, communication: 5, punctuality: 5, value: 4 } },
  { id: 'rev-2', proId: 'pro-arben', customer: 'Biznes demo', area: 'Qendër', rating: 5, date: '2025-04-28', text: 'Instaloi ndriçimin e zyrës pa probleme. Çmimi ishte siç u dakordësua.', breakdown: { quality: 5, communication: 4, punctuality: 5, value: 5 } },
  { id: 'rev-3', proId: 'pro-arben', customer: 'Klient demo', area: 'Komuna e Parisit', rating: 4, date: '2025-04-10', text: 'Punë e mirë, vetëm pak vonesë në fillim por më njoftoi paraprakisht.', breakdown: { quality: 5, communication: 4, punctuality: 3, value: 4 } },
  { id: 'rev-4', proId: 'pro-ilir', customer: 'Klient demo', area: 'Blloku', rating: 5, date: '2025-05-20', text: 'Zgjidhi rrjedhjen nën lavaman brenda gjysmë ore. Shumë i shpejtë.', breakdown: { quality: 5, communication: 5, punctuality: 5, value: 5 } },
  { id: 'rev-5', proId: 'pro-ilir', customer: 'Klient demo', area: 'Myslym Shyri', rating: 5, date: '2025-05-02', text: 'Profesionist serioz, çmim i drejtë dhe punë e pastër.', breakdown: { quality: 5, communication: 5, punctuality: 4, value: 5 } },
  { id: 'rev-6', proId: 'pro-besmir', customer: 'Klient demo', area: 'Ali Demi', rating: 5, date: '2025-06-01', text: 'Pastroi dhe mbushi gazin e kondicionerit. Ftohja u përmirësua menjëherë.', breakdown: { quality: 5, communication: 4, punctuality: 5, value: 4 } },
  { id: 'rev-7', proId: 'pro-besmir', customer: 'Biznes demo', area: 'Fresku', rating: 4, date: '2025-05-15', text: 'Montim i mirë i dy njësive. Do e rekomandoja.', breakdown: { quality: 4, communication: 4, punctuality: 4, value: 4 } },
  { id: 'rev-8', proId: 'pro-erion', customer: 'Klient demo', area: 'Selitë', rating: 5, date: '2025-05-25', text: 'Montoi gjithë mobiljet e dhomës dhe vari televizorin. Shpejt dhe me kujdes.', breakdown: { quality: 5, communication: 5, punctuality: 5, value: 5 } },
  { id: 'rev-9', proId: 'pro-erion', customer: 'Klient demo', area: 'Porcelan', rating: 5, date: '2025-05-08', text: 'Shumë i besueshëm për punë të vogla. E thirra sërish.', breakdown: { quality: 5, communication: 5, punctuality: 4, value: 5 } },
  { id: 'rev-10', proId: 'pro-gentian', customer: 'Klient demo', area: 'Laprakë', rating: 5, date: '2025-04-30', text: 'Lyerje e pastër e gjithë apartamentit, afatet u respektuan plotësisht.', breakdown: { quality: 5, communication: 4, punctuality: 5, value: 5 } },
];
