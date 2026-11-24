// Centralized Pricing & Subscription Configuration
// NOTE: All values are prototype demonstration figures for the US market.

export const PRICING_CONFIG = {
  currency: 'USD',
  currencySymbol: '$',
  isPrototype: true,
  disclaimer: 'All pricing shown represents prototype configurations for product demonstration and planning purposes. Final rates may vary by US service region and property specifications.',
  
  // Service base rates & frequency tiers
  services: {
    yardWaste: {
      id: 'yardWaste',
      name: 'Yard Waste Removal',
      supportedPets: ['dog'],
      frequencies: [
        { value: 0, label: 'None', monthlyPrice: 0 },
        { value: 1, label: 'Once a week', monthlyPrice: 79 },
        { value: 2, label: 'Twice a week', monthlyPrice: 139 },
        { value: 3, label: '3× a week', monthlyPrice: 189 }
      ],
      // Pet surcharge logic: only applies if service is active
      additionalPetRate: 12, // per additional dog per month
      maxPetsIncluded: 1
    },
    litterCare: {
      id: 'litterCare',
      name: 'Litter Box Care',
      supportedPets: ['cat'],
      frequencies: [
        { value: 0, label: 'None', monthlyPrice: 0 },
        { value: 0.5, label: 'Every 2 weeks', monthlyPrice: 45 },
        { value: 1, label: 'Once a week', monthlyPrice: 69 },
        { value: 2, label: 'Twice a week', monthlyPrice: 119 }
      ],
      additionalPetRate: 10, // per additional cat per month (extra box)
      maxPetsIncluded: 1
    },
    grooming: {
      id: 'grooming',
      name: 'Pet Grooming',
      supportedPets: ['dog', 'cat'],
      frequencies: [
        { value: 0, label: 'None', monthlyPrice: 0 },
        { value: 1, label: 'Once a month', monthlyPrice: 69 },
        { value: 2, label: 'Twice a month', monthlyPrice: 138 }
      ],
      // Grooming is per-pet appointment
      perSessionRate: 69
    },
    veterinary: {
      id: 'veterinary',
      name: 'Home Veterinary Care',
      supportedPets: ['dog', 'cat'],
      monthlyRate: 49,
      frequencyLabel: 'Quarterly exam + 24/7 vet chat'
    },
    training: {
      id: 'training',
      name: 'Pet Training',
      supportedPets: ['dog'],
      monthlyRate: 119,
      frequencyLabel: 'Two 60-min sessions / month'
    }
  },

  // One-time setup / initial sanitation fee (waived on annual or during promotions)
  initialVisitFee: 0,

  // Sample US metro availability zones
  coveredZipCodes: [
    { zip: '78701', city: 'Austin', state: 'TX', active: true },
    { zip: '78704', city: 'Austin', state: 'TX', active: true },
    { zip: '80202', city: 'Denver', state: 'CO', active: true },
    { zip: '98101', city: 'Seattle', state: 'WA', active: true },
    { zip: '94103', city: 'San Francisco', state: 'CA', active: true },
    { zip: '60601', city: 'Chicago', state: 'IL', active: true },
    { zip: '30309', city: 'Atlanta', state: 'GA', active: true },
    { zip: '75201', city: 'Dallas', state: 'TX', active: true },
    { zip: '28202', city: 'Charlotte', state: 'NC', active: true },
    { zip: '85004', city: 'Phoenix', state: 'AZ', active: true }
  ]
};
