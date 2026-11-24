// Care Team structure clearly distinguishing coordination, providers, and licensed vets
// All bio details are clearly structured role placeholders for transparency.

export const CARE_TEAM_ROLES = [
  {
    id: 'coordinators',
    category: 'PawKeep Coordination Team',
    badge: 'Your Dedicated Concierge',
    roleTitle: 'Care Coordinator',
    placeholderName: 'Jamie R. & Regional Team',
    experiencePlaceholder: '5+ years in veterinary logistics & customer care',
    specialization: 'Central scheduling, custom plan adjustments, and 7-day care support',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Friendly PawKeep Care Coordinator working with pet care schedules',
    description: 'Your single point of contact who keeps all your pet services synchronized, manages gate access notes, and ensures your visits happen smoothly on time.',
    isLicensedVet: false
  },
  {
    id: 'specialists',
    category: 'Field Care Providers',
    badge: 'Certified & Background Checked',
    roleTitle: 'Certified Care Provider',
    placeholderName: 'Marcus T. & Certified Caretakers',
    experiencePlaceholder: 'Fear-Free certified handling, CPR & pet first-aid trained',
    specialization: 'Lawn waste removal, in-home grooming, and cat litter care',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Dedicated pet caretaker holding a dog leash outdoors',
    description: 'The consistent, caring face your pet learns to love. Every caretaker is fully vetted, background-checked, insured, and trained in low-stress handling.',
    isLicensedVet: false
  },
  {
    id: 'veterinarians',
    category: 'Licensed Veterinary Partners',
    badge: 'Licensed DVM Professionals',
    roleTitle: 'Partner Veterinarian (DVM)',
    placeholderName: 'Dr. Sarah Lin, DVM & Medical Partners',
    experiencePlaceholder: 'State Board Licensed DVMs with 8+ years clinical experience',
    specialization: 'Preventative examinations, core vaccines, and gentle home passing',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Licensed veterinarian in medical scrubs smiling warmly',
    description: 'All clinical medical diagnostics and treatments are conducted by independently licensed veterinary doctors in your state, bringing hospital-standard care directly to your living room.',
    isLicensedVet: true,
    regulatoryNote: 'Clinical veterinary services provided exclusively through state-licensed DVM partners.'
  }
];
