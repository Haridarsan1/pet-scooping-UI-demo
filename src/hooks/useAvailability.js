import { useState } from 'react';
import { PRICING_CONFIG } from '../data/pricing.js';

export function useAvailability() {
  const [zipInput, setZipInput] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'checking' | 'available' | 'waitlist' | 'error'
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const checkZip = (zip) => {
    const cleanZip = (zip || zipInput).trim().replace(/[^\d]/g, '').slice(0, 5);
    
    if (cleanZip.length !== 5) {
      setStatus('error');
      setErrorMessage('Please enter a valid 5-digit US ZIP code.');
      return;
    }

    setStatus('checking');
    setErrorMessage('');

    // Simulate quick network check
    setTimeout(() => {
      const match = PRICING_CONFIG.coveredZipCodes.find(item => item.zip === cleanZip);
      
      if (match) {
        setStatus('available');
        setResult({
          zip: match.zip,
          city: match.city,
          state: match.state,
          isCovered: true,
          servicesAvailable: ['Yard Waste', 'Litter Care', 'Grooming', 'Veterinary', 'Training']
        });
      } else {
        // Fallback for demo: ZIPs starting with 7, 8, 9, 6, 3 have selected metro coverage
        const metroPrefixes = ['78', '80', '98', '94', '60', '30', '75', '28', '85'];
        const prefix = cleanZip.slice(0, 2);
        if (metroPrefixes.includes(prefix)) {
          setStatus('available');
          setResult({
            zip: cleanZip,
            city: 'Metro Service Zone',
            state: 'US',
            isCovered: true,
            servicesAvailable: ['Yard Waste', 'Grooming', 'Veterinary', 'Training']
          });
        } else {
          setStatus('waitlist');
          setResult({
            zip: cleanZip,
            isCovered: false,
            message: `PawKeep is expanding rapidly! ZIP ${cleanZip} is on our immediate expansion roadmap.`
          });
        }
      }
    }, 450);
  };

  const reset = () => {
    setStatus('idle');
    setResult(null);
    setErrorMessage('');
  };

  return {
    zipInput,
    setZipInput,
    status,
    result,
    errorMessage,
    checkZip,
    reset
  };
}
