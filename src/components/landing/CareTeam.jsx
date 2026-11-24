import React from 'react';
import { SectionHeading } from '../common/SectionHeading.jsx';
import { CARE_TEAM_ROLES } from '../../data/team.js';

export function CareTeam() {
  return (
    <section
      id="care-team"
      style={{
        padding: '90px 0',
        backgroundColor: 'var(--pk-cream)'
      }}
    >
      <div className="pk-container">
        <SectionHeading
          kicker="Care Team Structure"
          title="Dedicated Caretakers. Care Coordinators. Licensed Vets."
          subtitle="PawKeep establishes distinct, professional roles to coordinate routine pet-care services and partner medical care."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            marginBottom: '40px'
          }}
        >
          {CARE_TEAM_ROLES.map((role) => (
            <div
              key={role.id}
              style={{
                borderRadius: '24px',
                background: 'var(--pk-white)',
                border: '1.5px solid var(--pk-border-subtle)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img
                  src={role.image}
                  alt={role.imageAlt || role.roleTitle}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
                  <span className={role.isLicensedVet ? 'pk-badge pk-badge-coral' : 'pk-badge pk-badge-charcoal'}>
                    {role.badge}
                  </span>
                </div>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--pk-text-muted)', letterSpacing: '0.04em' }}>
                  {role.category}
                </span>

                <h3
                  style={{
                    margin: '6px 0 2px',
                    fontFamily: 'var(--font-brand)',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: 'var(--pk-charcoal)',
                    letterSpacing: '-0.4px'
                  }}
                >
                  {role.roleTitle}
                </h3>

                <p style={{ margin: '0 0 12px', fontSize: '13px', color: 'var(--pk-coral)', fontWeight: 700 }}>
                  {role.roleScope}
                </p>

                <p style={{ margin: '0 0 16px', fontSize: '14px', lineHeight: 1.5, color: 'var(--pk-text-secondary)', flex: 1 }}>
                  {role.description}
                </p>

                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: '12px',
                    background: 'var(--pk-cream)',
                    fontSize: '12px',
                    lineHeight: 1.4,
                    color: 'var(--pk-text-secondary)'
                  }}
                >
                  <div><strong>Core Scope:</strong> {role.coreResponsibility}</div>
                </div>

                {role.regulatoryNote && (
                  <div style={{ marginTop: '12px', fontSize: '11px', color: 'var(--pk-text-muted)', fontStyle: 'italic' }}>
                    * {role.regulatoryNote}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Operational Boundary Note */}
        <div
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            padding: '16px 20px',
            borderRadius: '16px',
            background: 'var(--pk-white)',
            border: '1.5px solid var(--pk-border-subtle)',
            fontSize: '13px',
            color: 'var(--pk-text-secondary)',
            textAlign: 'center',
            lineHeight: 1.5
          }}
        >
          <strong>Operational Structure:</strong> PawKeep provides care coordination, scheduling logistics, and routine home care through dedicated field providers. Clinical examinations, medical procedures, and prescription care are conducted exclusively by independently licensed Doctors of Veterinary Medicine (DVM) and partner veterinary clinics.
        </div>
      </div>
    </section>
  );
}
