// Demo reviews linked to professionals by proId.
export const reviews = [
  {
    id: 'rev-1', proId: 'pro-arben', customer: 'Klient demo', area: 'Astir',
    rating: 5, date: '2025-05-12',
    text: 'Elektricisti erdhi në kohë, shpjegoi problemin qartë dhe e rregulloi shpejt. Shërbim shumë profesional.',
    breakdown: { quality: 5, communication: 5, punctuality: 5, value: 4 },
  },
  {
    id: 'rev-2', proId: 'pro-arben', customer: 'Biznes demo', area: 'Qendër',
    rating: 5, date: '2025-04-28',
    text: 'Instaloi ndriçimin e zyrës pa probleme. Çmimi ishte siç u dakordësua.',
    breakdown: { quality: 5, communication: 4, punctuality: 5, value: 5 },
  },
  {
    id: 'rev-3', proId: 'pro-arben', customer: 'Klient demo', area: 'Komuna e Parisit',
    rating: 4, date: '2025-04-10',
    text: 'Punë e mirë, vetëm pak vonesë në fillim por më njoftoi paraprakisht.',
    breakdown: { quality: 5, communication: 4, punctuality: 3, value: 4 },
  },
  {
    id: 'rev-4', proId: 'pro-ilir', customer: 'Klient demo', area: 'Blloku',
    rating: 5, date: '2025-05-20',
    text: 'Zgjidhi rrjedhjen nën lavaman brenda gjysmë ore. Shumë i shpejtë.',
    breakdown: { quality: 5, communication: 5, punctuality: 5, value: 5 },
  },
  {
    id: 'rev-5', proId: 'pro-ilir', customer: 'Klient demo', area: 'Myslym Shyri',
    rating: 5, date: '2025-05-02',
    text: 'Profesionist serioz, çmim i drejtë dhe punë e pastër.',
    breakdown: { quality: 5, communication: 5, punctuality: 4, value: 5 },
  },
  {
    id: 'rev-6', proId: 'pro-besmir', customer: 'Klient demo', area: 'Ali Demi',
    rating: 5, date: '2025-06-01',
    text: 'Pastroi dhe mbushi gazin e kondicionerit. Ftohja u përmirësua menjëherë.',
    breakdown: { quality: 5, communication: 4, punctuality: 5, value: 4 },
  },
  {
    id: 'rev-7', proId: 'pro-besmir', customer: 'Biznes demo', area: 'Fresku',
    rating: 4, date: '2025-05-15',
    text: 'Montim i mirë i dy njësive. Do e rekomandoja.',
    breakdown: { quality: 4, communication: 4, punctuality: 4, value: 4 },
  },
  {
    id: 'rev-8', proId: 'pro-erion', customer: 'Klient demo', area: 'Selitë',
    rating: 5, date: '2025-05-25',
    text: 'Montoi gjithë mobiljet e dhomës dhe vari televizorin. Shpejt dhe me kujdes.',
    breakdown: { quality: 5, communication: 5, punctuality: 5, value: 5 },
  },
  {
    id: 'rev-9', proId: 'pro-erion', customer: 'Klient demo', area: 'Porcelan',
    rating: 5, date: '2025-05-08',
    text: 'Shumë i besueshëm për punë të vogla. E thirra sërish.',
    breakdown: { quality: 5, communication: 5, punctuality: 4, value: 5 },
  },
  {
    id: 'rev-10', proId: 'pro-gentian', customer: 'Klient demo', area: 'Laprakë',
    rating: 5, date: '2025-04-30',
    text: 'Lyerje e pastër e gjithë apartamentit, afatet u respektuan plotësisht.',
    breakdown: { quality: 5, communication: 4, punctuality: 5, value: 5 },
  },
];

export const reviewsByPro = (proId) => reviews.filter((r) => r.proId === proId);
