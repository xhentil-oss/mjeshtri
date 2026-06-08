// Demo bids. Each links a professional (proId) to a job (jobId).
// `label` is a smart trust label surfaced in the offer comparison UI.
export const bids = [
  // job-1 — Electrician, Astir
  { id: 'bid-1', jobId: 'job-1', proId: 'pro-arben', price: 2500, arrival: 'Sot pas orës 17:00', completion: '~1 orë', label: 'Më i vlerësuari', message: 'Mund të vij sot pas orës 17:00. Çmimi përfundimtar konfirmohet pasi të kontrolloj problemin.', status: 'pending' },
  { id: 'bid-2', jobId: 'job-1', proId: 'pro-sokol', price: 2000, arrival: 'Nesër paradite', completion: '~1.5 orë', label: 'Vlerë e mirë', message: 'Çmim konkurrues. Mund të vij nesër paradite dhe e zgjidh shpejt.', status: 'pending' },
  { id: 'bid-3', jobId: 'job-1', proId: 'pro-erion', price: 2800, arrival: 'Sot pas orës 19:00', completion: '~1 orë', label: 'Përgjigje e shpejtë', message: 'Përshëndetje, jam i lirë sot në mbrëmje. E kontrolloj dhe e rregulloj në vend.', status: 'pending' },
  { id: 'bid-4', jobId: 'job-1', proId: 'pro-fatjon', price: 2300, arrival: 'Brenda 2 ditësh', completion: '~1.5 orë', label: '', message: 'Mund të ndërhyj brenda dy ditësh me çmim të arsyeshëm.', status: 'pending' },

  // job-2 — Plumber, Komuna e Parisit
  { id: 'bid-5', jobId: 'job-2', proId: 'pro-ilir', price: 4000, arrival: 'Sot pas orës 14:00', completion: '~1 orë', label: 'Më me eksperiencë', message: 'E zgjidh rrjedhjen sot. Çmimi përfshin materialin bazë.', status: 'pending' },
  { id: 'bid-6', jobId: 'job-2', proId: 'pro-fatjon', price: 3500, arrival: 'Nesër paradite', completion: '~1.5 orë', label: 'Vlerë e mirë', message: 'Mund të vij nesër në mëngjes. Çmim i mirë për këtë punë.', status: 'pending' },
  { id: 'bid-7', jobId: 'job-2', proId: 'pro-erion', price: 4500, arrival: 'Sot pas orës 18:00', completion: '~1 orë', label: 'Përgjigje e shpejtë', message: 'I lirë sot në mbrëmje, e kontrolloj dhe e rregulloj.', status: 'pending' },

  // job-3 — AC Technician, Blloku
  { id: 'bid-8', jobId: 'job-3', proId: 'pro-besmir', price: 4000, arrival: 'Të enjten paradite', completion: '~1.5 orë', label: 'Më i vlerësuari', message: 'Pastrim i plotë + mbushje gazi. Konfirmohet pas kontrollit.', status: 'pending' },

  // job-5 — Plumber, Myslym Shyri (in progress, accepted)
  { id: 'bid-9', jobId: 'job-5', proId: 'pro-ilir', price: 2500, arrival: 'E premte paradite', completion: '~2 orë', label: 'Më me eksperiencë', message: 'Montim dhe lidhje bojleri me garanci pune.', status: 'accepted' },

  // job-6 — Electrician, Qendër (completed, accepted)
  { id: 'bid-10', jobId: 'job-6', proId: 'pro-arben', price: 9000, arrival: 'Brenda javës', completion: '~1 ditë', label: 'Më i vlerësuari', message: 'Instalim i plotë LED me materiale cilësore.', status: 'accepted' },
];

export const bidsByJob = (jobId) => bids.filter((b) => b.jobId === jobId);
export const bidsByPro = (proId) => bids.filter((b) => b.proId === proId);
