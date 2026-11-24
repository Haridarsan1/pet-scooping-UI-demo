import { useState, useMemo } from 'react';
import { PRICING_CONFIG } from '../data/pricing.js';

export function usePricing(initialValues = {}) {
  // petType: 'dog' | 'cat' | 'both'
  const [petType, setPetType] = useState(initialValues.petType || 'dog');
  const [petName, setPetName] = useState(initialValues.petName || '');
  const [dogCount, setDogCount] = useState(initialValues.dogCount || 1);
  const [catCount, setCatCount] = useState(initialValues.catCount || (initialValues.petType === 'cat' ? 1 : 0));
  
  // Service frequency selections
  // Yard scooping: 0 (none), 1 (1x/week), 2 (2x/week), 3 (3x/week)
  const [yardFrequency, setYardFrequency] = useState(initialValues.yardFrequency ?? 1);
  
  // Litter care: 0 (none), 0.5 (biweekly), 1 (1x/week), 2 (2x/week)
  const [litterFrequency, setLitterFrequency] = useState(initialValues.litterFrequency ?? (initialValues.petType === 'cat' ? 1 : 0));
  
  // Grooming: 0 (none), 1 (1x/month), 2 (2x/month)
  const [groomFrequency, setGroomFrequency] = useState(initialValues.groomFrequency ?? 0);
  
  // Home vet visits: boolean
  const [vetEnabled, setVetEnabled] = useState(initialValues.vetEnabled ?? false);
  
  // Training: boolean
  const [trainingEnabled, setTrainingEnabled] = useState(initialValues.trainingEnabled ?? false);

  // Handle switching pet types smoothly with eligibility rules
  const handleSetPetType = (newType) => {
    setPetType(newType);
    if (newType === 'dog') {
      if (dogCount === 0) setDogCount(1);
      setCatCount(0);
      setLitterFrequency(0);
      if (yardFrequency === 0) setYardFrequency(1);
    } else if (newType === 'cat') {
      setDogCount(0);
      if (catCount === 0) setCatCount(1);
      setYardFrequency(0);
      setTrainingEnabled(false);
      if (litterFrequency === 0) setLitterFrequency(1);
    } else if (newType === 'both') {
      if (dogCount === 0) setDogCount(1);
      if (catCount === 0) setCatCount(1);
      if (yardFrequency === 0) setYardFrequency(1);
      if (litterFrequency === 0) setLitterFrequency(1);
    }
  };

  // Eligibility flags
  const isDogEligible = petType === 'dog' || petType === 'both';
  const isCatEligible = petType === 'cat' || petType === 'both';

  // Eligible pets for grooming:
  // Dogs only: dogCount
  // Cats only: catCount
  // Both: dogCount + catCount
  const groomPetCount = useMemo(() => {
    if (petType === 'both') return Math.max(1, dogCount + catCount);
    if (petType === 'cat') return Math.max(1, catCount);
    return Math.max(1, dogCount);
  }, [petType, dogCount, catCount]);

  // Calculations
  const calculations = useMemo(() => {
    const lines = [];

    // 1. Yard Waste Removal (Dogs only)
    let yardBase = 0;
    let dogExtra = 0;
    if (isDogEligible && yardFrequency > 0) {
      const tier = PRICING_CONFIG.services.yardWaste.frequencies.find(f => f.value === yardFrequency);
      yardBase = tier ? tier.monthlyPrice : 0;
      const extraDogs = Math.max(0, dogCount - 1);
      dogExtra = extraDogs * PRICING_CONFIG.services.yardWaste.additionalPetRate;

      lines.push({
        id: 'yard',
        service: 'Yard Waste Removal',
        detail: yardFrequency === 1 ? '1× a week pickup' : `${yardFrequency}× a week pickup`,
        monthlyAmount: yardBase,
        isRecurring: true
      });

      if (dogExtra > 0) {
        lines.push({
          id: 'yard-extra-dogs',
          service: 'Additional Dogs (Yard Scooping)',
          detail: `${extraDogs} additional dog${extraDogs > 1 ? 's' : ''} (+$12/mo each)`,
          monthlyAmount: dogExtra,
          isRecurring: true
        });
      }
    }

    // 2. Litter Box Care (Cats only)
    let litterBase = 0;
    let catExtra = 0;
    if (isCatEligible && litterFrequency > 0) {
      const tier = PRICING_CONFIG.services.litterCare.frequencies.find(f => f.value === litterFrequency);
      litterBase = tier ? tier.monthlyPrice : 0;
      const extraCats = Math.max(0, catCount - 1);
      catExtra = extraCats * PRICING_CONFIG.services.litterCare.additionalPetRate;

      const freqLabel = litterFrequency === 0.5 ? 'Every 2 weeks' : `${litterFrequency}× a week`;
      lines.push({
        id: 'litter',
        service: 'Litter Box Care',
        detail: `${freqLabel} maintenance`,
        monthlyAmount: litterBase,
        isRecurring: true
      });

      if (catExtra > 0) {
        lines.push({
          id: 'litter-extra-cats',
          service: 'Additional Cats (Litter Boxes)',
          detail: `${extraCats} additional cat${extraCats > 1 ? 's' : ''} (+$10/mo each)`,
          monthlyAmount: catExtra,
          isRecurring: true
        });
      }
    }

    // 3. Grooming: Number of eligible pets × Grooming frequency × Per-session rate ($69)
    let groomAmount = 0;
    if (groomFrequency > 0) {
      groomAmount = groomPetCount * groomFrequency * PRICING_CONFIG.services.grooming.perSessionRate;
      const petLabel = groomPetCount === 1 ? '1 pet' : `${groomPetCount} pets`;
      const freqLabel = groomFrequency === 1 ? '1 session/mo' : '2 sessions/mo';
      lines.push({
        id: 'grooming',
        service: 'In-Home Pet Grooming',
        detail: `${freqLabel} for ${petLabel} ($69/pet/session)`,
        monthlyAmount: groomAmount,
        isRecurring: true
      });
    }

    // 4. Veterinary
    let vetAmount = 0;
    if (vetEnabled) {
      vetAmount = PRICING_CONFIG.services.veterinary.monthlyRate;
      lines.push({
        id: 'veterinary',
        service: 'Home Veterinary Care',
        detail: 'Quarterly exam + scheduled partner vet messaging',
        monthlyAmount: vetAmount,
        isRecurring: true
      });
    }

    // 5. Training (Dogs only)
    let trainAmount = 0;
    if (isDogEligible && trainingEnabled) {
      trainAmount = PRICING_CONFIG.services.training.monthlyRate;
      lines.push({
        id: 'training',
        service: 'Pet Training & Manners',
        detail: 'Two 60-min in-home private sessions / month',
        monthlyAmount: trainAmount,
        isRecurring: true
      });
    }

    const monthlyTotal = yardBase + dogExtra + litterBase + catExtra + groomAmount + vetAmount + trainAmount;
    const activeServicesCount = (yardFrequency > 0 && isDogEligible ? 1 : 0) +
      (litterFrequency > 0 && isCatEligible ? 1 : 0) +
      (groomFrequency > 0 ? 1 : 0) +
      (vetEnabled ? 1 : 0) +
      (trainingEnabled && isDogEligible ? 1 : 0);

    return {
      lines,
      monthlyTotal,
      activeServicesCount,
      oneTimeTotal: 0,
      currencySymbol: PRICING_CONFIG.currencySymbol
    };
  }, [petType, dogCount, catCount, yardFrequency, litterFrequency, groomFrequency, vetEnabled, trainingEnabled, isDogEligible, isCatEligible, groomPetCount]);

  return {
    petType,
    setPetType: handleSetPetType,
    petName,
    setPetName,
    dogCount,
    setDogCount,
    catCount,
    setCatCount,
    yardFrequency,
    setYardFrequency,
    litterFrequency,
    setLitterFrequency,
    groomFrequency,
    setGroomFrequency,
    vetEnabled,
    setVetEnabled,
    trainingEnabled,
    setTrainingEnabled,
    isDogEligible,
    isCatEligible,
    groomPetCount,
    ...calculations
  };
}
