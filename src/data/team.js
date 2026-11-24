// Care Team structure clearly distinguishing coordination, field providers, and licensed veterinarians.
// All role profiles are representative descriptions; no invented employee names or unconfirmed certifications.

export const CARE_TEAM_ROLES = [
  {
    id: 'coordinators',
    category: 'PawKeep Coordination Team',
    badge: 'Care Coordination',
    roleTitle: 'PawKeep Care Coordinator',
    roleScope: 'Central Logistics & Support',
    coreResponsibility: 'Visit coordination, caretaker dispatch, schedule adjustments, and pet profile records.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'PawKeep Care Coordinator reviewing scheduling logistics',
    description: 'Your primary liaison who keeps routine appointments synchronized, updates gate access notes, and coordinates service schedules.',
    isLicensedVet: false
  },
  {
    id: 'specialists',
    category: 'Field Care Providers',
    badge: 'Dedicated Field Team',
    roleTitle: 'Field Care Provider',
    roleScope: 'Direct Routine Service',
    coreResponsibility: 'Scheduled yard scooping, indoor cat litter care, and in-home bath & brush appointments.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Field pet caretaker with leash outdoors',
    description: 'Dedicated caretakers assigned to your home for recurring exterior yard scooping, litter maintenance, and gentle in-home grooming.',
    isLicensedVet: false
  },
  {
    id: 'veterinarians',
    category: 'Licensed Veterinary Partners',
    badge: 'Licensed Medical Partners',
    roleTitle: 'Partner Veterinarian (DVM)',
    roleScope: 'Independent Clinical Practice',
    coreResponsibility: 'Routine physical examinations, preventative wellness checkups, core vaccinations, and in-home hospice/euthanasia.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Licensed veterinarian in clinic apparel',
    description: 'All clinical medical examinations, prescription therapies, and medical procedures are provided exclusively by independently licensed Doctors of Veterinary Medicine (DVM).',
    isLicensedVet: true,
    regulatoryNote: 'Clinical veterinary care is conducted exclusively by state-licensed DVM partners and independent veterinary facilities.'
  }
];
