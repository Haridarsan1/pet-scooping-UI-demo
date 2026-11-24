# PawKeep – All-In-One Pet Care Subscription Platform

Modern, conversion-focused landing page and interactive subscription configurator for **PawKeep**, an all-in-one pet-care subscription service built for the United States market.

> **Business Proposition:** *"Everything Your Pet Needs. One Caring Team."*  
> PawKeep unites yard waste removal, litter-box care, in-home grooming, veterinary care coordination, and positive reinforcement dog training into a single customizable monthly subscription.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run Vite development server
npm run dev

# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 🛠️ Tech Stack & Architecture

- **Core:** React 18 + Vite
- **Typography:** Google Fonts (`Unbounded` for headlines, `Manrope` for body copy)
- **Styling:** CSS variables (`src/pawkeep.css`), modern responsive flex/grid layouts, bento grids, and zero third-party UI framework bloat.
- **Accessibility:** Semantic HTML5, ARIA dialog roles, focus management, keyboard accessibility (`Esc` dismissals), high color contrast, and `@media (prefers-reduced-motion: reduce)` support.
- **State Management:** Custom React hooks (`usePricing`, `useScrollProgress`, `useZipCheck`) providing predictable, isolated business logic.

---

## 📁 Repository Structure

```
pawkeep-landing/
├── public/                 # Static public assets
├── src/
│   ├── components/
│   │   ├── common/         # Reusable UI primitives (Button, Modal, SectionHeading, etc.)
│   │   ├── layout/         # Header, Mobile Drawer, Footer, Floating QuickPlanBar
│   │   ├── landing/        # Landing page sections:
│   │   │   ├── Hero.jsx            # High-conversion hero with ZIP checker & trust metrics
│   │   │   ├── ServicesGrid.jsx    # Interactive 6-service grid with detail modals
│   │   │   ├── HowItWorks.jsx      # 3-step onboarding flow with visual cards
│   │   │   ├── StorySection.jsx    # Smooth requestAnimationFrame yard transformation engine
│   │   │   ├── WhyPawKeep.jsx      # Coordinated team vs. random gig marketplace comparison
│   │   │   ├── CareTeam.jsx        # Transparent representative care roles & veterinary boundary
│   │   │   ├── PricingBuilder.jsx  # Dynamic real-time subscription calculator
│   │   │   ├── DashboardPreview.jsx# Pet parent portal preview (tracking, visits, logs)
│   │   │   ├── Testimonials.jsx    # Customer scenario reviews & community ratings
│   │   │   ├── CommunitySection.jsx# HOA & multi-family commercial inquiry form
│   │   │   ├── FarewellCare.jsx    # Compassionate end-of-life care coordination
│   │   │   └── FaqAccordion.jsx    # Comprehensive accordion FAQ with category filters
│   │   ├── modals/         # Detail, Checkout, Sign-In, and Farewell modals
│   │   └── pricing/        # PetSelector and PlanSummary components
│   ├── data/               # Structured business configurations:
│   │   ├── faqs.js         # FAQ items categorized by topic
│   │   ├── pricing.js      # Base prices, frequencies, and multi-pet surcharges
│   │   ├── services.js     # Service descriptions, details, and inclusions
│   │   ├── team.js         # Representative care role descriptions & boundaries
│   │   ├── testimonials.js # Illustrative customer scenario cards
│   │   └── zipCodes.js     # Demonstration US ZIP database & status metadata
│   ├── hooks/              # Custom hooks:
│   │   ├── usePricing.js   # Dynamic pricing calculations, eligibility & itemized breakdown
│   │   ├── useScrollProgress.js # Story scroll RAF easing engine
│   │   └── useZipCheck.js  # 5-digit ZIP validation & coverage status
│   ├── pages/
│   │   └── LandingPage.jsx # Root composition view wiring all sections and modal state
│   ├── App.jsx             # Top-level React entry
│   ├── index.css           # Base styles
│   ├── main.jsx            # React root mount
│   ├── pawkeep.css         # Design tokens, keyframes, responsive & reduced-motion styles
│   └── sx.js               # CSS helper
├── vercel.json             # Vercel deployment headers and routing rules
└── package.json
```

---

## 🧮 Pricing Calculation Logic (`src/hooks/usePricing.js`)

All pricing models reflect illustrative prototype configurations:

1. **Dog Waste Removal (`yardWaste`):**
   - Active when `isDogEligible` (`petType` is `'dog'` or `'both'`) and frequency > 0.
   - Frequency tiers: 1×/wk ($79/mo), 2×/wk ($139/mo), 3×/wk ($189/mo).
   - Multi-dog surcharge: Additional dogs beyond the first incur `+$12/mo` per extra dog.
2. **Cat Litter Box Care (`litterCare`):**
   - Active when `isCatEligible` (`petType` is `'cat'` or `'both'`) and frequency > 0.
   - Frequency tiers: 1×/wk ($45/mo), 2×/wk ($85/mo), 3×/wk ($125/mo).
   - Multi-cat surcharge: Additional cats beyond the first incur `+$10/mo` per extra cat.
3. **In-Home Pet Grooming (`grooming`):**
   - Calculated per eligible pet:
     $$\text{Total} = \text{Eligible Pets} \times \text{Frequency (sessions/mo)} \times \$69$$
   - Dog-only: multiplied by `dogCount`.
   - Cat-only: multiplied by `catCount`.
   - Both: multiplied by `dogCount + catCount`.
4. **Home Veterinary Care (`vetCare`):**
   - +$49/mo flat add-on (Quarterly preventative exams & partner telemedicine coordination).
5. **Positive Reinforcement Training (`training`):**
   - +$119/mo flat add-on (Dog eligible only; two 60-minute in-home sessions monthly).

---

## ⚖️ Regulatory & Prototype Boundaries

1. **Veterinary Boundary:**
   PawKeep is a pet-care subscription platform providing routine non-medical care (scooping, litter maintenance, grooming, basic training) and care logistics. All clinical veterinary medicine, physical medical exams, diagnostics, treatments, and euthanasia are provided exclusively by independently licensed and insured veterinary partner clinics and veterinarians.
2. **Prototype Disclosures:**
   All pricing, schedules, ZIP coverage zones, and service packages displayed on this site represent demonstration prototype data.
3. **Simulated Workflows:**
   - **Checkout Modal:** Multi-step subscription review simulation. Collects demonstration inputs; charges no credit card and creates no live financial agreement.
   - **Community Form:** Validates HOA property inquiries locally; does not transmit inquiries to a backend CRM.
   - **Farewell Support Modal:** Captures phone and contact inputs for demonstration purposes without activating live dispatchers.

---

## 📱 Viewport QA Standards

Tested across 5 responsive breakpoints:
- **Desktop:** 1440px
- **Laptop:** 1280px
- **Tablet:** 768px
- **Mobile:** 390px
- **Small Mobile:** 360px

---

## 🚢 Vercel Compatibility

Configured with `vercel.json` for single-page application routing and standard HTTP security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
