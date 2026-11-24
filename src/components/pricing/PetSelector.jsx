import React from 'react';

export function PetSelector({
  petType,
  setPetType,
  petName,
  setPetName,
  dogCount,
  setDogCount,
  catCount,
  setCatCount
}) {
  const isDog = petType === 'dog' || petType === 'both';
  const isCat = petType === 'cat' || petType === 'both';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Pet Type Picker */}
      <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
        <legend
          style={{
            padding: 0,
            fontFamily: 'var(--font-brand)',
            fontWeight: 700,
            fontSize: '16px',
            color: 'var(--pk-charcoal)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px'
          }}
        >
          <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'var(--pk-coral)' }} />
          1. Which pets are you caring for?
        </legend>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {[
            { id: 'dog', label: '🐶 Dogs Only', desc: 'Yard, grooming, vet, train' },
            { id: 'cat', label: '🐱 Cats Only', desc: 'Litter box, groom, vet' },
            { id: 'both', label: '🐾 Dogs & Cats', desc: 'Combined multi-pet care' }
          ].map((type) => {
            const active = petType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setPetType(type.id)}
                style={{
                  padding: '12px 14px',
                  borderRadius: '14px',
                  border: active ? '2px solid var(--pk-charcoal)' : '1.5px solid var(--pk-border-subtle)',
                  background: active ? 'var(--pk-charcoal)' : 'var(--pk-white)',
                  color: active ? 'var(--pk-white)' : 'var(--pk-charcoal)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease'
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '14px' }}>{type.label}</div>
                <div style={{ fontSize: '11px', marginTop: '4px', opacity: active ? 0.85 : 0.65 }}>
                  {type.desc}
                </div>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Pet Name & Counts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {/* Name input */}
        <div>
          <label
            htmlFor="pricing-pet-name"
            style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--pk-charcoal)' }}
          >
            Pet Name (Optional)
          </label>
          <input
            id="pricing-pet-name"
            type="text"
            placeholder="e.g. Biscuit or Luna"
            maxLength={25}
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            style={{
              width: '100%',
              minHeight: '46px',
              padding: '0 14px',
              borderRadius: '12px',
              border: '1.5px solid var(--pk-border-subtle)',
              background: 'var(--pk-cream)',
              fontWeight: 600,
              fontSize: '14px'
            }}
          />
        </div>

        {/* Dog Count if eligible */}
        {isDog && (
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--pk-charcoal)' }}>
              Number of Dogs
            </label>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setDogCount(n)}
                  style={{
                    flex: 1,
                    minHeight: '46px',
                    borderRadius: '12px',
                    border: dogCount === n ? '2px solid var(--pk-charcoal)' : '1.5px solid var(--pk-border-subtle)',
                    background: dogCount === n ? 'var(--pk-charcoal)' : 'var(--pk-white)',
                    color: dogCount === n ? 'var(--pk-white)' : 'var(--pk-charcoal)',
                    fontWeight: 800,
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  {n === 4 ? '4+' : n}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Cat Count if eligible */}
        {isCat && (
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--pk-charcoal)' }}>
              Number of Cats
            </label>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setCatCount(n)}
                  style={{
                    flex: 1,
                    minHeight: '46px',
                    borderRadius: '12px',
                    border: catCount === n ? '2px solid var(--pk-charcoal)' : '1.5px solid var(--pk-border-subtle)',
                    background: catCount === n ? 'var(--pk-charcoal)' : 'var(--pk-white)',
                    color: catCount === n ? 'var(--pk-white)' : 'var(--pk-charcoal)',
                    fontWeight: 800,
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  {n === 4 ? '4+' : n}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
