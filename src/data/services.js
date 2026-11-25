// Centralized Services Catalog for PawKeep
// Clearly distinguishes Dog services vs Cat services vs Shared/Specialist services.

export const SERVICES = [
  {
    id: 'yard-waste',
    title: 'Yard Waste Removal',
    subtitle: 'Recurring dog waste removal & residential lawn maintenance',
    category: 'Daily Care',
    targetPet: 'dog',
    targetPetLabel: 'Dogs only',
    badge: 'Popular Dog Care',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Golden retriever on clean residential lawn',
    shortDescription: 'Scheduled scooping, debris bagging, and gate latch check to keep your yard clean, safe, and fresh.',
    description: 'A recurring yard service for dog owners. A dedicated local caretaker clears dog waste across your lawn on your chosen schedule, bags the waste, and confirms your gate latch before departure.',
    benefits: [
      'Helps maintain cleaner, more hygienic residential lawns',
      'Time-stamped gate latch verification photo with every visit',
      'Scheduled recurring cadence tailored to your household'
    ],
    whatsIncluded: [
      'Full perimeter yard walk and waste collection',
      'Bagging and off-site disposal',
      'Gate latch double-check with confirmation photo',
      'Regular visit summaries in your member dashboard'
    ],
    pricingExplanation: 'Illustrative prototype pricing: from $79/mo (once weekly). Twice-weekly ($139/mo) and 3× weekly ($189/mo) available for dog households.',
    isSubscriptionService: true,
    availableFrequencies: [
      { id: '1x_week', label: '1× a week', value: 1, basePrice: 79 },
      { id: '2x_week', label: '2× a week', value: 2, basePrice: 139 },
      { id: '3x_week', label: '3× a week', value: 3, basePrice: 189 }
    ]
  },
  {
    id: 'litter-care',
    title: 'Litter Box Care',
    subtitle: 'Recurring indoor cat litter maintenance & box sanitization',
    category: 'Daily Care',
    targetPet: 'cat',
    targetPetLabel: 'Cats only',
    badge: 'Essential Cat Care',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Domestic cat resting indoors',
    shortDescription: 'Dedicated litter box maintenance, waste removal, and full box wiping to keep your home fresh and your cat comfortable.',
    description: 'Indoor cat litter care treated as a dedicated, specialized service. Our caretakers perform scheduled scooping, refill topping, and periodic box washing with pet-safe solutions.',
    benefits: [
      'Maintains clean litter box conditions for indoor feline hygiene',
      'Routine waste removal without the chore of heavy disposal',
      'Pet-safe, cat-friendly cleaning products'
    ],
    whatsIncluded: [
      'Litter sifting and waste haul-away',
      'Litter topping with preferred client supply',
      'Box wiping with pet-safe wash',
      'Surrounding floor mat sweep'
    ],
    pricingExplanation: 'Illustrative prototype pricing: from $69/mo (once weekly visit). Additional cat boxes calculated at +$10/mo.',
    isSubscriptionService: true,
    availableFrequencies: [
      { id: 'biweekly', label: 'Every 2 weeks', value: 0.5, basePrice: 45 },
      { id: '1x_week', label: '1× a week', value: 1, basePrice: 69 },
      { id: '2x_week', label: '2× a week', value: 2, basePrice: 119 }
    ]
  },
  {
    id: 'grooming',
    title: 'Pet Grooming at Home',
    subtitle: 'Bathing, brushing, coat treatment & gentle nail clipping',
    category: 'Wellness',
    targetPet: 'both',
    targetPetLabel: 'Dogs & Cats',
    badge: 'In-Home Comfort',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Pet receiving gentle grooming and coat care',
    shortDescription: 'Gentle bath, blowout, thorough brush-out, nail trims, and ear cleaning conducted in your home.',
    description: 'One-on-one grooming appointments at home. Avoid car rides and crowded waiting rooms with scheduled bathing, brushing, and basic hygiene care tailored to your companion.',
    benefits: [
      'Quiet, one-on-one attention in your pet’s familiar surroundings',
      'Eliminates car transportation stress and waiting cage anxiety',
      'Gentle coat care, deshedding, and nail trimming'
    ],
    whatsIncluded: [
      'Warm bath with coat-appropriate shampoo',
      'Blow-dry and thorough brush-out',
      'Gentle nail trim and smoothing grind',
      'Ear cleaning and eye-area wipe'
    ],
    pricingExplanation: 'Illustrative prototype pricing: $69 per pet per session (scheduled 1× or 2× monthly based on household pet count).',
    isSubscriptionService: true,
    availableFrequencies: [
      { id: 'none', label: 'None', value: 0, basePrice: 0 },
      { id: '1x_month', label: '1× a month', value: 1, basePrice: 69 },
      { id: '2x_month', label: '2× a month', value: 2, basePrice: 138 }
    ]
  },
  {
    id: 'veterinary',
    title: 'Home Veterinary Care',
    subtitle: 'Preventative wellness checkups conducted by state-licensed partner veterinarians',
    category: 'Clinical Health',
    targetPet: 'both',
    targetPetLabel: 'Dogs & Cats',
    badge: 'Licensed Medical Partner',
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Licensed veterinarian examining a calm pet at home',
    shortDescription: 'Routine physical exams, core vaccinations, and preventative care on your couch. Services delivered by licensed veterinary partners.',
    description: 'Routine preventative veterinary appointments in your living room. We partner with licensed veterinary practitioners who conduct preventative health assessments where your pet feels calmest.',
    benefits: [
      'Unhurried wellness consultations in a low-stress home environment',
      'Reduced carrier and vehicle distress for pets and owners',
      'Digital health logs and reminder tracking in your member dashboard'
    ],
    whatsIncluded: [
      'Physical wellness and vital sign examination',
      'Core vaccination review and updates as recommended',
      'Parasite prevention counseling',
      'Telehealth messaging with partner veterinary team during support hours'
    ],
    pricingExplanation: 'Illustrative prototype pricing: $49/mo membership (includes quarterly checkup visit & partner veterinary messaging).',
    isSubscriptionService: true,
    regulatoryDisclosure: 'All clinical medical exams, diagnostics, treatments, and prescriptions are provided exclusively by independently licensed Doctors of Veterinary Medicine (DVM) and partner veterinary clinics within your state.'
  },
  {
    id: 'training',
    title: 'Pet Training & Manners',
    subtitle: 'Positive-reinforcement training for everyday household obedience',
    category: 'Enrichment',
    targetPet: 'dog',
    targetPetLabel: 'Dogs (Cat behavior on request)',
    badge: 'Structured Training',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Person practicing positive reinforcement training with attentive dog',
    shortDescription: 'Two 60-minute in-person private sessions a month focusing on loose-leash walking, door manners, and calm greetings.',
    description: 'Structured positive-reinforcement coaching tailored to your home and neighborhood routines. Build reliable everyday habits with professional guidance for puppies and adult dogs.',
    benefits: [
      'Practical training conducted in your real-world home environment',
      'Actionable practice exercises between monthly sessions',
      'Supportive approach for impulse control and leash manners'
    ],
    whatsIncluded: [
      'Two 60-minute private one-on-one training sessions per month',
      'Progressive skill tracking and milestone notes',
      'Guidance for family members on consistent cue usage',
      'Follow-up training summary notes in your dashboard'
    ],
    pricingExplanation: 'Illustrative prototype pricing: $119/mo (includes two 60-minute monthly in-home sessions).',
    isSubscriptionService: true
  },
  {
    id: 'farewell',
    title: 'Farewell Care Coordination',
    subtitle: 'Compassionate end-of-life logistics, gentle home passing & memorials',
    category: 'Specialist Support',
    targetPet: 'both',
    targetPetLabel: 'Dogs & Cats',
    badge: 'Compassionate Support',
    image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Loving pet resting peacefully with comforting companion',
    shortDescription: 'Private end-of-life care coordination, in-home passing delivered by licensed partner vets, gentle transfer, and grief resources.',
    description: 'Saying goodbye is a profoundly sensitive experience. Our dedicated farewell coordinators help arrange in-home passing with an independent licensed partner veterinarian, dignified aftercare, and bereavement support resources.',
    benefits: [
      'Peaceful in-home passing in your pet’s familiar setting',
      'Respectful coordination of aftercare and transport arrangements',
      'Access to pet bereavement counseling resources'
    ],
    whatsIncluded: [
      'Consultation with a dedicated farewell care coordinator',
      'In-home passing conducted by a licensed partner veterinarian',
      'Gentle transfer to local pet memorial partners',
      'Commemorative keepsake options (clay paw print, fur clipping)',
      'Pet loss bereavement guidance resources'
    ],
    pricingExplanation: 'Arranged as dedicated care coordination packages. Specific options and scheduling are confirmed upon consultation.',
    isSubscriptionService: false,
    dedicatedSection: true
  }
];
