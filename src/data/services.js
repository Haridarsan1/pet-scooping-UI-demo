// Centralized Services Catalog for PawKeep
// Clearly distinguishes Dog services vs Cat services vs Shared/Specialist services.

export const SERVICES = [
  {
    id: 'yard-waste',
    title: 'Yard Waste Removal',
    subtitle: 'Recurring dog waste removal & residential lawn sanitization',
    category: 'Daily Care',
    targetPet: 'dog',
    targetPetLabel: 'Dogs only',
    badge: 'Popular Dog Care',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Happy golden retriever sitting on clean green suburban lawn',
    shortDescription: 'Weekly scheduled scooping, debris bagging, and gate sanitization to keep your yard clean, safe, and fresh.',
    description: 'Never worry about pet waste pickup again. A dedicated PawKeep caretaker clears every corner of your yard on your chosen cadence, bags and hauls away the waste, and checks your gates before leaving.',
    benefits: [
      'Eliminates lawn parasites and bad odors',
      'Contactless service with photo gate verification',
      'Free double-check if you spot a missed spot'
    ],
    whatsIncluded: [
      'Full yard walk and waste collection',
      'Biodegradable bag & off-site disposal',
      'Gate latch double-check with time-stamped photo',
      'Pet-safe turf deodorizer spray (optional add-on)'
    ],
    pricingExplanation: 'Prototype pricing: from $79/mo (once weekly). Twice-weekly ($139/mo) and 3× weekly ($189/mo) available.',
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
    subtitle: 'Recurring indoor cat litter maintenance & deep sanitization',
    category: 'Daily Care',
    targetPet: 'cat',
    targetPetLabel: 'Cats only',
    badge: 'Essential Cat Care',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Calm domestic cat resting comfortably indoors',
    shortDescription: 'Dedicated litter box maintenance, waste removal, and full box sanitization so your home stays fresh and your cat stays healthy.',
    description: 'Indoor cats need pristine litter conditions for urinary health and calm behavior. Our caretakers perform weekly or bi-weekly scooping, refills with your preferred brand, and periodic deep scrubbing.',
    benefits: [
      'Reduces feline respiratory and urinary stress',
      'Zero heavy litter lifting or unpleasant disposal',
      'Hospital-grade, cat-safe sanitization'
    ],
    whatsIncluded: [
      'Complete litter sifting and waste haul-away',
      'Litter topping or full clean replacement',
      'Box wiping with enzymatic feline-safe wash',
      'Surrounding floor sweep and mat vacuum'
    ],
    pricingExplanation: 'Prototype pricing: from $69/mo (once weekly visit). Additional boxes +$10/mo.',
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
    imageAlt: 'Fluffy dog receiving gentle grooming and coat care',
    shortDescription: 'Professional bath, blowout, deshedding, nail trims, and ear cleaning done in the comfort of your own home or mobile suite.',
    description: 'Skip the stress of leaving your pet locked in a noisy commercial salon cage for hours. Our certified groomers come directly to you for quiet, one-on-one pampering tailored to your pet’s temperament.',
    benefits: [
      'Zero stressful car rides or salon waiting cages',
      'Consistent familiar groomer building trust with your pet',
      'Custom hypoallergenic and coat-specific botanicals'
    ],
    whatsIncluded: [
      'Warm bath with natural coat-matched shampoo',
      'Blow-dry, thorough brush-out and deshedding',
      'Gentle nail trim and smoothing grind',
      'Ear cleaning and eye-area cleansing'
    ],
    pricingExplanation: 'Prototype pricing: $69 per session (scheduled 1× or 2× monthly or on-demand).',
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
    subtitle: 'Convenient preventative checkups by licensed veterinary professionals',
    category: 'Clinical Health',
    targetPet: 'both',
    targetPetLabel: 'Dogs & Cats',
    badge: 'Licensed Medical Partner',
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Veterinarian gently examining a calm pet at home',
    shortDescription: 'Routine physical exams, core vaccinations, and wellness visits on your couch. Services performed by licensed veterinary partners.',
    description: 'Veterinary care without the panic of crates and clinical waiting rooms. We partner with licensed, vetted local veterinary doctors and technicians who provide routine care where your pet feels safest.',
    benefits: [
      'No carrier struggle or frightened pet behavior in clinics',
      'Longer, unhurried 45-minute wellness consultations',
      'Digital health history and reminder tracking in your app'
    ],
    whatsIncluded: [
      'Comprehensive nose-to-tail physical exam',
      'Core vaccination updates & titer counseling',
      'Heartworm and parasite preventative review',
      '24/7 asynchronous telehealth messaging with licensed vet team'
    ],
    pricingExplanation: 'Prototype pricing: $49/mo membership (includes quarterly checkup visit & ongoing vet messaging).',
    isSubscriptionService: true,
    regulatoryDisclosure: 'All clinical medical exams, treatments, and prescriptions are provided exclusively by independently licensed veterinary doctors and partner veterinary clinics within your state.'
  },
  {
    id: 'training',
    title: 'Pet Training & Manners',
    subtitle: 'Positive-reinforcement training for calm everyday behavior',
    category: 'Enrichment',
    targetPet: 'dog',
    targetPetLabel: 'Dogs (Cat behavior on request)',
    badge: 'Certified Trainers',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Person practicing positive reinforcement training with attentive dog',
    shortDescription: 'Two 60-minute in-person sessions a month focused on loose-leash walking, impulse control, polite door manners, and calm greetings.',
    description: 'Transform daily walks and doorbell chaos into calm, enjoyable routines. Our trainers use humane, science-backed positive reinforcement methods that build confidence and mutual respect.',
    benefits: [
      'Real-world training in your neighborhood and home',
      'Personalized homework plans between monthly sessions',
      'Great for puppies, rescues, and high-energy companions'
    ],
    whatsIncluded: [
      'Two 60-minute private one-on-one sessions per month',
      'Customized behavior and milestone progression log',
      'Direct trainer chat for quick habit troubleshooting',
      'Family coaching so everyone uses consistent cues'
    ],
    pricingExplanation: 'Prototype pricing: $119/mo (includes two 60-minute monthly sessions).',
    isSubscriptionService: true
  },
  {
    id: 'farewell',
    title: 'Farewell Care Coordination',
    subtitle: 'Compassionate end-of-life support, gentle home passing & memorials',
    category: 'Specialist Support',
    targetPet: 'both',
    targetPetLabel: 'Dogs & Cats',
    badge: 'Compassionate Care',
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Caring pet owner gently comforting an aging pet',
    shortDescription: 'Gentle, private end-of-life care coordination, licensed in-home veterinary euthanasia, aftercare transport, and family grief counseling.',
    description: 'Saying goodbye is one of life’s most profound moments. Our dedicated farewell care coordinators handle every arrangement with grace, privacy, and compassion, allowing you to focus on loving your companion.',
    benefits: [
      'Peaceful passing at home in your pet’s favorite spot',
      'Zero clinical paperwork or payment awkwardness at the moment of care',
      'Ongoing pet-loss grief counseling for children and adults'
    ],
    whatsIncluded: [
      'Pre-planning consultation with end-of-life coordinator',
      'Licensed mobile veterinarian visit for peaceful in-home passing',
      'Gentle transfer to verified pet crematory or cemetery partners',
      'Custom commemorative keepsakes (clay paw print, hair locket)',
      'Complimentary sessions with certified pet bereavement counselor'
    ],
    pricingExplanation: 'Handled as dedicated, non-recurring care packages. Pre-planning discounts available for active PawKeep members.',
    isSubscriptionService: false,
    dedicatedSection: true
  }
];
