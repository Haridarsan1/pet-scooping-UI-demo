import React, { useState } from 'react';
import { Header } from '../components/layout/Header.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { HeroSection } from '../components/landing/HeroSection.jsx';
import { TrustIndicators } from '../components/landing/TrustIndicators.jsx';
import { ServicesSection } from '../components/landing/ServicesSection.jsx';
import { HowItWorks } from '../components/landing/HowItWorks.jsx';
import { StoryScroll } from '../components/landing/StoryScroll.jsx';
import { WhyPawKeep } from '../components/landing/WhyPawKeep.jsx';
import { CareTeam } from '../components/landing/CareTeam.jsx';
import { PricingBuilder } from '../components/landing/PricingBuilder.jsx';
import { DashboardPreview } from '../components/landing/DashboardPreview.jsx';
import { Testimonials } from '../components/landing/Testimonials.jsx';
import { CommunitySection } from '../components/landing/CommunitySection.jsx';
import { FarewellCare } from '../components/landing/FarewellCare.jsx';
import { FAQ } from '../components/landing/FAQ.jsx';
import { FinalCTA } from '../components/landing/FinalCTA.jsx';

import { SignInModal } from '../components/modals/SignInModal.jsx';
import { ServiceDetailModal } from '../components/modals/ServiceDetailModal.jsx';
import { CheckoutModal } from '../components/modals/CheckoutModal.jsx';
import { FarewellModal } from '../components/modals/FarewellModal.jsx';

import { usePricing } from '../hooks/usePricing.js';
import { useAvailability } from '../hooks/useAvailability.js';
import '../styles/tokens.css';
import '../styles/global.css';

export function LandingPage() {
  const pricing = usePricing();
  const zipAvailability = useAvailability();

  // Modals state
  const [signInOpen, setSignInOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [farewellOpen, setFarewellOpen] = useState(false);

  const handleLearnMoreService = (service) => {
    setSelectedService(service);
    setServiceModalOpen(true);
  };

  const handleSelectInPlan = (service) => {
    // If adding a dog or cat service, ensure pet type is compatible
    if (service.targetPet === 'cat' && pricing.petType === 'dog') {
      pricing.setPetType('both');
    } else if (service.targetPet === 'dog' && pricing.petType === 'cat') {
      pricing.setPetType('both');
    }

    // Activate the appropriate service
    if (service.id === 'yard-waste' && pricing.yardFrequency === 0) {
      pricing.setYardFrequency(1);
    } else if (service.id === 'litter-care' && pricing.litterFrequency === 0) {
      pricing.setLitterFrequency(1);
    } else if (service.id === 'grooming' && pricing.groomFrequency === 0) {
      pricing.setGroomFrequency(1);
    } else if (service.id === 'veterinary') {
      pricing.setVetEnabled(true);
    } else if (service.id === 'training') {
      pricing.setTrainingEnabled(true);
    }
  };

  return (
    <div style={{ width: '100%', overflowX: 'clip', backgroundColor: 'var(--pk-white)' }}>
      {/* 1. Sticky Navigation Header */}
      <Header
        onOpenSignIn={() => setSignInOpen(true)}
        onOpenPlanBuilder={() => {
          const el = document.getElementById('plan');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2. Hero Section */}
      <HeroSection
        onBuildPlan={() => {
          const el = document.getElementById('plan');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        petType={pricing.petType}
        setPetType={pricing.setPetType}
        zipAvailability={zipAvailability}
      />

      {/* 3. Trust Indicators */}
      <TrustIndicators />

      {/* 4. Dedicated Services Catalog */}
      <ServicesSection
        onLearnMore={handleLearnMoreService}
        onSelectInPlan={handleSelectInPlan}
      />

      {/* 5. How PawKeep Works */}
      <HowItWorks
        onBuildPlan={() => {
          const el = document.getElementById('plan');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 6. Animated Storytelling Experience (Refactored) */}
      <StoryScroll
        petName={pricing.petName}
        petType={pricing.petType}
      />

      {/* 7. Why PawKeep (Comparison) */}
      <WhyPawKeep
        onBuildPlan={() => {
          const el = document.getElementById('plan');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 8. Meet the Care Team */}
      <CareTeam />

      {/* 9. Interactive Pricing Builder */}
      <PricingBuilder
        pricing={pricing}
        onProceedToCheckout={() => setCheckoutOpen(true)}
      />

      {/* 10. Dashboard Preview Showcase */}
      <DashboardPreview />

      {/* 11. Customer Testimonials */}
      <Testimonials />

      {/* 12. Apartment Communities & HOAs */}
      <CommunitySection />

      {/* 13. Farewell Care */}
      <FarewellCare
        onOpenFarewellModal={() => setFarewellOpen(true)}
      />

      {/* 14. Frequently Asked Questions */}
      <FAQ />

      {/* 15. Final Call to Action */}
      <FinalCTA
        onBuildPlan={() => {
          const el = document.getElementById('plan');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 16. Comprehensive Footer */}
      <Footer onOpenSignIn={() => setSignInOpen(true)} />

      {/* Floating Plan Quick-Bar (Visible when services are selected) */}
      {pricing.activeServicesCount > 0 && (
        <div
          style={{
            position: 'fixed',
            bottom: '16px',
            left: '12px',
            right: '12px',
            margin: '0 auto',
            maxWidth: '560px',
            width: 'calc(100% - 24px)',
            boxSizing: 'border-box',
            zIndex: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            padding: '10px 14px',
            borderRadius: '18px',
            background: 'var(--pk-charcoal)',
            color: 'var(--pk-white)',
            boxShadow: '0 12px 36px rgba(0,0,0,0.35)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: '1 1 auto' }}>
            <span
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: 'var(--pk-blush)',
                color: 'var(--pk-charcoal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '14px',
                flexShrink: 0
              }}
            >
              {pricing.activeServicesCount}
            </span>
            <div style={{ minWidth: 0, overflow: 'hidden' }}>
              <strong style={{ fontSize: '13px', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {pricing.petName ? `${pricing.petName}’s Plan` : 'Your Care Plan'} ({pricing.activeServicesCount} {pricing.activeServicesCount === 1 ? 'service' : 'services'})
              </strong>
              <span style={{ fontSize: '12px', color: '#D8D5DA' }}>
                ${pricing.monthlyTotal}/month
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            <a
              href="#plan"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 12px',
                minHeight: '38px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.14)',
                color: 'var(--pk-white)',
                fontWeight: 700,
                fontSize: '13px',
                textDecoration: 'none'
              }}
            >
              Edit
            </a>
            <button
              type="button"
              onClick={() => setCheckoutOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 14px',
                minHeight: '38px',
                borderRadius: '10px',
                border: 'none',
                background: 'var(--pk-coral)',
                color: 'var(--pk-white)',
                fontWeight: 800,
                fontSize: '13px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              Subscribe →
            </button>
          </div>
        </div>
      )}

      {/* Global Modals */}
      <SignInModal
        isOpen={signInOpen}
        onClose={() => setSignInOpen(false)}
      />

      <ServiceDetailModal
        service={selectedService}
        isOpen={serviceModalOpen}
        onClose={() => setServiceModalOpen(false)}
        onSelectInPlan={handleSelectInPlan}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        pricing={pricing}
      />

      <FarewellModal
        isOpen={farewellOpen}
        onClose={() => setFarewellOpen(false)}
      />
    </div>
  );
}
export default LandingPage;
