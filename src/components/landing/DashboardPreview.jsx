import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading.jsx';

export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'reports' | 'subscription'

  return (
    <section
      id="dashboard-preview"
      style={{
        padding: '90px 0',
        backgroundColor: 'var(--pk-white)'
      }}
    >
      <div className="pk-container">
        <SectionHeading
          kicker="Customer Experience"
          title="Your Complete Care Hub. Everything in One Place."
          subtitle="Preview the PawKeep member experience. Track upcoming visits, review completed visit notes, message your Care Coordinator, and review your subscription details with total clarity."
        />

        {/* Dashboard Showcase Mockup Window */}
        <div
          style={{
            maxWidth: '1060px',
            margin: '0 auto',
            borderRadius: '28px',
            background: 'var(--pk-cream)',
            border: '2px solid var(--pk-border-subtle)',
            boxShadow: 'var(--shadow-lg)',
            overflow: 'hidden'
          }}
        >
          {/* Mockup Window Header Bar */}
          <div
            style={{
              padding: '14px 20px',
              background: 'var(--pk-charcoal)',
              color: 'var(--pk-white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F56' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27C93F' }} />
              <span style={{ marginLeft: '12px', fontSize: '13px', fontWeight: 700, color: '#D8D5DA' }}>
                PawKeep Member Portal • Austin, TX
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="pk-badge pk-badge-prototype" style={{ fontSize: '10px' }}>
                Interactive Product Demonstration
              </span>
            </div>
          </div>

          {/* Member Sub-Header */}
          <div
            style={{
              padding: '20px 28px',
              background: 'var(--pk-white)',
              borderBottom: '1px solid var(--pk-border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--pk-coral-light)',
                  color: 'var(--pk-coral)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 800
                }}
              >
                🐶
              </div>
              <div>
                <h4 style={{ margin: 0, fontFamily: 'var(--font-brand)', fontSize: '18px', fontWeight: 700, color: 'var(--pk-charcoal)' }}>
                  Biscuit (Golden Retriever)
                </h4>
                <p style={{ margin: '2px 0 0', fontSize: '13px', color: 'var(--pk-text-secondary)' }}>
                  Active Care Plan • Care Coordinator: <strong>Assigned Coordinator</strong>
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '6px', background: 'var(--pk-cream)', padding: '4px', borderRadius: '12px' }}>
              <button
                type="button"
                onClick={() => setActiveTab('upcoming')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 700,
                  background: activeTab === 'upcoming' ? 'var(--pk-charcoal)' : 'transparent',
                  color: activeTab === 'upcoming' ? 'var(--pk-white)' : 'var(--pk-charcoal)',
                  cursor: 'pointer'
                }}
              >
                Upcoming Visits
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('reports')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 700,
                  background: activeTab === 'reports' ? 'var(--pk-charcoal)' : 'transparent',
                  color: activeTab === 'reports' ? 'var(--pk-white)' : 'var(--pk-charcoal)',
                  cursor: 'pointer'
                }}
              >
                Visit Reports
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('subscription')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 700,
                  background: activeTab === 'subscription' ? 'var(--pk-charcoal)' : 'transparent',
                  color: activeTab === 'subscription' ? 'var(--pk-white)' : 'var(--pk-charcoal)',
                  cursor: 'pointer'
                }}
              >
                Billing & Plan
              </button>
            </div>
          </div>

          {/* Tab Content Panes */}
          <div style={{ padding: '28px' }}>
            {activeTab === 'upcoming' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div style={{ padding: '20px', borderRadius: '18px', background: 'var(--pk-white)', border: '1.5px solid var(--pk-border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="pk-badge pk-badge-sage">Tomorrow • 10:30 AM</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--pk-coral)' }}>Confirmed</span>
                  </div>
                  <h5 style={{ margin: '0 0 6px', fontFamily: 'var(--font-brand)', fontSize: '16px' }}>
                    Weekly Yard Scooping
                  </h5>
                  <p style={{ margin: '0 0 12px', fontSize: '13px', color: 'var(--pk-text-secondary)' }}>
                    Caretaker: <strong>Assigned Field Caretaker</strong> • Gate Code: #404-Side
                  </p>
                  <div style={{ fontSize: '12px', color: '#6A6870', borderTop: '1px solid var(--pk-border-subtle)', paddingTop: '10px' }}>
                    Auto-alert enabled: You will receive a time-stamped photo once the gate is securely locked.
                  </div>
                </div>

                <div style={{ padding: '20px', borderRadius: '18px', background: 'var(--pk-white)', border: '1.5px solid var(--pk-border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="pk-badge pk-badge-coral">Saturday • 2:00 PM</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--pk-coral)' }}>In-Home Care</span>
                  </div>
                  <h5 style={{ margin: '0 0 6px', fontFamily: 'var(--font-brand)', fontSize: '16px' }}>
                    In-Home Grooming & Bath
                  </h5>
                  <p style={{ margin: '0 0 12px', fontSize: '13px', color: 'var(--pk-text-secondary)' }}>
                    Specialist: <strong>Assigned Grooming Specialist</strong> • Deshedding + gentle nail trim
                  </p>
                  <div style={{ fontSize: '12px', color: '#6A6870', borderTop: '1px solid var(--pk-border-subtle)', paddingTop: '10px' }}>
                    Adult household member must be present. Warm bath setup in guest bathroom.
                  </div>
                </div>

                <div style={{ padding: '20px', borderRadius: '18px', background: 'var(--pk-white)', border: '1.5px solid var(--pk-border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--pk-text-muted)' }}>Next Month</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--pk-sage)' }}>Routine Health</span>
                  </div>
                  <h5 style={{ margin: '0 0 6px', fontFamily: 'var(--font-brand)', fontSize: '16px' }}>
                    Quarterly Vet Wellness Visit
                  </h5>
                  <p style={{ margin: '0 0 12px', fontSize: '13px', color: 'var(--pk-text-secondary)' }}>
                    Partner: <strong>Licensed Partner Clinic</strong> • Living room checkup
                  </p>
                  <div style={{ fontSize: '12px', color: '#6A6870', borderTop: '1px solid var(--pk-border-subtle)', paddingTop: '10px' }}>
                    Includes core booster updates & digital preventative health log.
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reports' && (
              <div style={{ background: 'var(--pk-white)', borderRadius: '18px', padding: '24px', border: '1.5px solid var(--pk-border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <h5 style={{ margin: 0, fontFamily: 'var(--font-brand)', fontSize: '16px' }}>
                      Latest Completed Visit Report: Tuesday, 10:42 AM
                    </h5>
                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--pk-text-secondary)' }}>
                      Completed by Assigned Field Caretaker • Full perimeter walk & sanitization
                    </p>
                  </div>
                  <span className="pk-badge pk-badge-sage">✓ Passed Verification</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '16px' }}>
                  <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--pk-cream)', fontSize: '13px' }}>
                    <strong>Yard Waste Status:</strong>
                    <p style={{ margin: '4px 0 0', color: 'var(--pk-text-secondary)' }}>Cleared 4 waste points. All bagged and hauled away.</p>
                  </div>
                  <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--pk-cream)', fontSize: '13px' }}>
                    <strong>Gate Latch Check:</strong>
                    <p style={{ margin: '4px 0 0', color: 'var(--pk-text-secondary)' }}>Dual padlock engaged. Photo confirmation uploaded.</p>
                  </div>
                  <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--pk-cream)', fontSize: '13px' }}>
                    <strong>Pet Observation:</strong>
                    <p style={{ margin: '4px 0 0', color: 'var(--pk-text-secondary)' }}>Biscuit was happy & relaxed indoors. Water bowl refreshed.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'subscription' && (
              <div style={{ background: 'var(--pk-white)', borderRadius: '18px', padding: '24px', border: '1.5px solid var(--pk-border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <h5 style={{ margin: 0, fontFamily: 'var(--font-brand)', fontSize: '16px' }}>
                      Current Subscription: Coordinated Monthly Plan
                    </h5>
                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--pk-text-secondary)' }}>
                      Demonstration billing cycle • Illustrative recurring plan breakdown
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontFamily: 'var(--font-brand)', fontSize: '24px', fontWeight: 700 }}>
                      $148.00
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--pk-text-muted)' }}>/mo</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--pk-border-subtle)', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span>Weekly Yard Scooping (1× a week)</span>
                    <strong>$79.00/mo</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span>Monthly In-Home Grooming (1× a month)</span>
                    <strong>$69.00/mo</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--pk-sage)' }}>
                    <span>Initial Sanitization Promo</span>
                    <strong>$0.00 (Waived)</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
