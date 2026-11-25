import React, { useEffect, useRef, useState } from 'react';
import { sx } from '../../sx.js';
import '../../pawkeep.css';

const storyPhotos = {
  dog: [
    { src: '/images/story/dog-yard-before.jpg', alt: 'Residential backyard before PawKeep pet care' },
    { src: '/images/story/dog-yard-after.jpg', alt: 'Clean, spotless manicured lawn after PawKeep scooping' },
    { src: '/images/story/dog-grooming.jpg', alt: 'Gentle in-home dog grooming and coat care' },
    { src: '/images/story/dog-vet.jpg', alt: 'Calm in-home veterinary wellness examination' },
    { src: '/images/story/dog-training.jpg', alt: 'Positive reinforcement dog manners and leash training' },
    { src: '/images/story/dog-plan.jpg', alt: 'Healthy, happy family dog resting contentedly at home' }
  ],
  cat: [
    { src: '/images/story/cat-yard-before.jpg', alt: 'Home living area before PawKeep cat care' },
    { src: '/images/story/cat-yard-after.jpg', alt: 'Fresh, sanitized home and spotless litter area' },
    { src: '/images/story/cat-grooming.jpg', alt: 'Stress-free in-home cat coat brushing and de-shedding' },
    { src: '/images/story/cat-vet.jpg', alt: 'Gentle couch-side cat health and wellness checkup' },
    { src: '/images/story/cat-training.jpg', alt: 'Engaging cat enrichment and positive routine session' },
    { src: '/images/story/cat-plan.jpg', alt: 'Content, healthy indoor cat relaxing peacefully at home' }
  ]
};

export function StoryScroll({ petName: globalPetName, petType: globalPetType }) {
  const storyRef = useRef(null);
  const [ch, setCh] = useState(0);
  const [piles, setPiles] = useState(5);
  const [localPetName, setLocalPetName] = useState(globalPetName || '');
  const [localPetType, setLocalPetType] = useState(globalPetType || 'dog');

  useEffect(() => {
    if (globalPetName) setLocalPetName(globalPetName);
    if (globalPetType) setLocalPetType(globalPetType);
  }, [globalPetName, globalPetType]);

  useEffect(() => {
    const el = storyRef.current;
    if (!el) return;

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cur = 0;
    let target = 0;
    let raf = 0;
    const clamp = (v) => Math.min(1, Math.max(0, v));

    const apply = (p) => {
      const currentCh = Math.min(5, Math.floor(p * 6));
      const local = clamp(p * 6 - currentCh);
      const wipe = currentCh === 1 ? clamp(local * 1.18) : (currentCh > 1 ? 1 : 0);
      const st = el.style;

      st.setProperty('--p', p.toFixed(4));
      st.setProperty('--wipe', wipe.toFixed(4));
      st.setProperty('--wipeOp', currentCh === 1 && wipe < 1 ? '1' : '0');
      
      const scene = el.querySelector('.pk-tiltable');
      if (scene) st.setProperty('--sceneW', scene.offsetWidth + 'px');
      
      for (let i = 0; i < 6; i++) {
        st.setProperty('--r' + i, (i < currentCh ? 1 : i === currentCh ? local : 0).toFixed(4));
      }
      for (let i = 0; i < 4; i++) {
        st.setProperty('--t' + i, clamp(local * 5 - i - 0.2).toFixed(3));
      }

      const remPiles = [16.7, 28.3, 38.3, 63.3, 81.7].filter((x) => x > wipe * 100).length;
      setCh(currentCh);
      setPiles(remPiles);
    };

    const measure = () => {
      const r = el.getBoundingClientRect();
      const stage = (el.firstElementChild && el.firstElementChild.offsetHeight) || 750;
      const total = Math.max(1, r.height - stage);
      target = Math.min(0.9999, clamp(-r.top / total));
    };

    const frame = () => {
      raf = 0;
      measure();
      const d = target - cur;
      cur = reduce || Math.abs(d) < 0.0004 ? target : cur + d * 0.14;
      apply(cur);
      if (cur !== target) raf = requestAnimationFrame(frame);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    document.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', onScroll);
    measure();
    cur = target;
    apply(cur);

    return () => {
      document.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = (i) => {
    const el = storyRef.current;
    if (!el) return;
    const se = document.scrollingElement || document.documentElement;
    const stage = (el.firstElementChild && el.firstElementChild.offsetHeight) || 750;
    const total = Math.max(1, el.offsetHeight - stage);
    const top = el.getBoundingClientRect().top + se.scrollTop;
    se.scrollTo({ top: top + total * (i + 0.12) / 6, behavior: 'smooth' });
  };

  const name = localPetName.trim() || 'your pet';
  const poss = localPetName.trim() ? `${localPetName.trim()}’s` : 'your';
  const isCat = localPetType === 'cat';

  const chData = [
    {
      kicker: 'A normal week',
      title: isCat ? `This is ${poss} home. Before PawKeep.` : `This is ${poss} yard. Before PawKeep.`,
      body: isCat
        ? 'A litter box you keep meaning to clean, a coat that needs brushing, and never enough weekend time.'
        : 'Piles you keep meaning to get to, an unkempt lawn, and never enough weekend time.',
      askName: true
    },
    {
      kicker: isCat ? 'Litter box care' : 'Poop scooping',
      title: isCat ? 'Every week, clean and sanitized.' : 'Every week, our care team scoops it.',
      body: isCat
        ? 'Our care team scoops, sanitizes, and refreshes the litter box on a regular cadence you choose.'
        : 'Our field care team clears the mess, bags it and hauls it away, on a recurring cadence you choose.'
    },
    {
      kicker: 'Grooming',
      title: 'Bath day, without the wrestling.',
      body: `Warm bath, brush, nails and ears for ${name}, done right at your home without noisy salon cages.`
    },
    {
      kicker: 'Vet at home',
      title: 'Check-ups on your own couch.',
      body: 'A state-licensed partner vet comes directly to you. No scary carrier, no car ride, no waiting room.'
    },
    {
      kicker: isCat ? 'Enrichment' : 'Training',
      title: isCat ? 'Enrichment and calm routines.' : 'Better manners, built in.',
      body: isCat
        ? 'Positive enrichment routines, scratching post guidance, and stress-free acclimation.'
        : 'Two one-hour positive reinforcement sessions a month for calm walks and polite hellos.'
    },
    {
      kicker: 'One plan',
      title: 'All of it. One caring team. One bill.',
      body: `Pick what ${name} needs and see your illustrative price in seconds. Plans start at $79 a month.`,
      isPlan: true
    }
  ];

  const railLabels = ['Before', isCat ? 'Litter box' : 'Scooping', 'Grooming', 'Vet visit', isCat ? 'Enrichment' : 'Training', 'Your plan'];
  const bgs = ['#F6F4F5', '#EEF5EF', '#EEF2FB', '#FBEDEF', '#FBF4D6', '#FBE9EC'];
  const cams = [
    ['scale(1)', '50% 50%'],
    ['scale(1.02)', '50% 50%'],
    ['scale(1.04)', '50% 50%'],
    ['scale(1.04)', '50% 50%'],
    ['scale(1.04)', '50% 50%'],
    ['scale(1)', '50% 50%']
  ];

  const cards = {
    2: {
      k: 'Grooming checklist',
      t: isCat ? 'Gentle cat grooming at home' : 'Full groom at home',
      items: isCat
        ? ['Coat de-shed & brush', 'Nail trim', 'Ear & eye cleanse', 'No salon cage stress']
        : ['Warm bath', 'Brush-out', 'Nail trim', 'Ear clean']
    },
    3: {
      k: 'Vet visit report',
      t: 'Healthy and happy',
      items: ['Weight checked', 'Heart and lungs', 'Vaccines up to date', 'Next check in 3 months']
    },
    4: {
      k: isCat ? 'Enrichment log' : 'Training log',
      t: 'Session 2 of 2',
      items: isCat
        ? ['Scratching post redirection', 'Interactive puzzle play', 'Carrier acclimation', 'Calm environment']
        : ['Sit and stay', 'Loose-leash walk', 'Wait at the door', 'Calm hello for guests']
    }
  };
  const stCard = cards[ch];

  const currentPhotos = storyPhotos[localPetType] || storyPhotos.dog;

  const show = (on) => (on ? 'opacity: 1; transform: none' : 'opacity: 0; transform: translateY(14px) scale(.9); pointer-events: none');

  return (
    <section
      id="story"
      ref={storyRef}
      aria-label="A week with PawKeep, told as a story"
      style={{
        position: 'relative',
        height: '3200px',
        ['--p']: 0,
        ['--wipe']: 0,
        ['--wipeOp']: 0
      }}
    >
      <div className="pk-story-sticky" style={{ backgroundColor: bgs[ch] }}>
        {/* Progress bar */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '3px',
            width: '100%',
            transformOrigin: 'left center',
            transform: 'scaleX(var(--p))',
            background: 'linear-gradient(90deg, #F4C7CF, #C2415B)',
            zIndex: 10
          }}
        />

        <div className="pk-story-body">
          {/* Chapter rail */}
          <div
            className="pk-rail"
            role="group"
            aria-label="Story Chapters"
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '4px',
              flexShrink: 0
            }}
          >
            {railLabels.map((label, idx) => {
              const isCurrent = idx === ch;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goTo(idx)}
                  aria-current={isCurrent ? 'step' : 'false'}
                  style={{
                    flex: '1 0 110px',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: '44px',
                    padding: '0 12px',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: 800,
                    transition: 'background .3s ease, color .3s ease',
                    background: isCurrent ? '#232326' : (idx < ch ? '#FFFFFF' : 'rgba(255,255,255,.6)'),
                    color: isCurrent ? '#FFFFFF' : '#232326'
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      height: '3px',
                      width: '100%',
                      transformOrigin: 'left center',
                      background: '#C2415B',
                      transform: `scaleX(var(--r${idx}))`
                    }}
                  />
                  <span style={{ position: 'relative' }}>
                    {String(idx + 1).padStart(2, '0')} {label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Chapter content & interactive scene */}
          <div className="pk-story-cols">
            {/* Story Text Column */}
            <div className="pk-story-text-col">
              <div className="pk-story-grid">
                {chData.map((c, i) => {
                  const on = i === ch;
                  return (
                    <div
                      key={i}
                      className="pk-story-grid-item"
                      aria-hidden={!on}
                      style={{
                        visibility: on ? 'visible' : 'hidden',
                        opacity: on ? 1 : 0,
                        pointerEvents: on ? 'auto' : 'none',
                        transform: on ? 'none' : `translateY(${i < ch ? -12 : 12}px)`
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          borderRadius: '9px',
                          background: '#FFFFFF',
                          fontSize: '12px',
                          fontWeight: 800,
                          color: '#C2415B',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                        }}
                      >
                        {c.kicker}
                      </p>

                      <h3
                        style={{
                          margin: '12px 0 0',
                          fontFamily: 'var(--font-brand)',
                          fontWeight: 700,
                          fontSize: 'clamp(24px, 2.6vw, 38px)',
                          lineHeight: 1.12,
                          letterSpacing: '-1px',
                          color: '#232326'
                        }}
                      >
                        {c.title}
                      </h3>

                      <p
                        style={{
                          margin: '10px 0 0',
                          fontSize: '15px',
                          lineHeight: 1.55,
                          color: '#4B4A50',
                          maxWidth: '30em'
                        }}
                      >
                        {c.body}
                      </p>

                      {cards[i] && (
                        <div style={{ marginTop: '14px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {cards[i].items.map((it, idx) => (
                            <span
                              key={idx}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '5px 12px',
                                borderRadius: '999px',
                                background: '#FFFFFF',
                                border: '1px solid #ECE7E9',
                                fontSize: '13px',
                                fontWeight: 700,
                                color: '#3E3540',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                              }}
                            >
                              <span style={{ color: '#2E7D32', fontWeight: 900 }}>✓</span> {it}
                            </span>
                          ))}
                        </div>
                      )}

                      {c.askName && (
                        <div
                          className="pk-story-personalize"
                          style={{
                            marginTop: '16px',
                            padding: '14px 16px',
                            borderRadius: '16px',
                            background: '#FFFFFF',
                            border: '1.5px solid #ECE7E9',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            maxWidth: '460px'
                          }}
                        >
                          <label
                            htmlFor="story-name-input"
                            style={{
                              display: 'block',
                              fontSize: '13px',
                              fontWeight: 800,
                              color: '#232326',
                              marginBottom: '8px'
                            }}
                          >
                            Personalize this story:
                          </label>
                          <div className="pk-story-personalize-row">
                            <input
                              id="story-name-input"
                              maxLength={20}
                              placeholder="Your pet’s name"
                              value={localPetName}
                              onChange={(e) => setLocalPetName(e.target.value.slice(0, 20))}
                              style={{
                                flex: '1 1 180px',
                                minWidth: 0,
                                height: '44px',
                                padding: '0 14px',
                                borderRadius: '10px',
                                border: '1.5px solid #ECE7E9',
                                background: '#FAF9F9',
                                fontSize: '14px',
                                fontWeight: 700,
                                color: '#232326',
                                outline: 'none'
                              }}
                            />
                            <div
                              className="pk-pet-toggle"
                              role="group"
                              aria-label="Pet type"
                              style={{
                                display: 'flex',
                                padding: '3px',
                                borderRadius: '10px',
                                background: '#F0ECEE',
                                border: '1px solid #ECE7E9',
                                flexShrink: 0
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => setLocalPetType('dog')}
                                aria-pressed={localPetType === 'dog'}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '6px',
                                  padding: '0 14px',
                                  height: '36px',
                                  borderRadius: '8px',
                                  border: 'none',
                                  background: localPetType === 'dog' ? '#232326' : 'transparent',
                                  color: localPetType === 'dog' ? '#FFFFFF' : '#4B4A50',
                                  fontWeight: 800,
                                  fontSize: '13px',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                <span aria-hidden="true">🐶</span> Dog
                              </button>
                              <button
                                type="button"
                                onClick={() => setLocalPetType('cat')}
                                aria-pressed={localPetType === 'cat'}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '6px',
                                  padding: '0 14px',
                                  height: '36px',
                                  borderRadius: '8px',
                                  border: 'none',
                                  background: localPetType === 'cat' ? '#232326' : 'transparent',
                                  color: localPetType === 'cat' ? '#FFFFFF' : '#4B4A50',
                                  fontWeight: 800,
                                  fontSize: '13px',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                <span aria-hidden="true">🐱</span> Cat
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {c.isPlan && (
                        <div style={{ marginTop: '18px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                          <a
                            href="#plan"
                            style={{
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              minHeight: '48px',
                              padding: '0 22px',
                              borderRadius: '14px',
                              background: '#C2415B',
                              color: '#FFFFFF',
                              fontWeight: 800,
                              fontSize: '15px'
                            }}
                          >
                            Build {poss} plan
                          </a>
                          <a
                            href="#why"
                            style={{
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              minHeight: '48px',
                              padding: '0 18px',
                              borderRadius: '14px',
                              background: '#FFFFFF',
                              color: '#232326',
                              fontWeight: 800,
                              fontSize: '15px',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                            }}
                          >
                            Why Not A Sitter App?
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {ch < 5 && (
                <div
                  style={{
                    marginTop: '20px',
                    paddingTop: '14px',
                    borderTop: '1px solid rgba(0,0,0,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px',
                    fontSize: '13px',
                    color: '#6A6870'
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                    <span style={{ animation: 'pkFloat 2s infinite ease-in-out', display: 'inline-block' }}>↓</span> Scroll to see each service in action
                  </span>
                  <a
                    href="#plan"
                    style={{
                      color: '#C2415B',
                      fontWeight: 800,
                      textDecoration: 'underline',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    Skip to Pricing Calculator →
                  </a>
                </div>
              )}
            </div>

            {/* Interactive Scene Column with Photorealistic Story */}
            <div className="pk-story-scene-col">
              <div
                className="pk-tiltable"
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1200 / 680',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: '#232326',
                  boxShadow: '0 25px 50px -20px rgba(35,35,38,.45)'
                }}
              >
                <div
                  className="pk-cam"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    willChange: 'transform',
                    transition: 'transform 1.2s cubic-bezier(.65,0,.15,1)',
                    transformOrigin: cams[ch][1],
                    transform: cams[ch][0]
                  }}
                >
                  {/* Base Scene 0 (Before State Photo) */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: ch <= 1 ? 1 : 0,
                      transition: 'opacity 0.6s ease',
                      zIndex: 1
                    }}
                  >
                    <img
                      src={currentPhotos[0].src}
                      alt={currentPhotos[0].alt}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block'
                      }}
                    />
                    {/* Before Label Indicator */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '16px',
                        bottom: '16px',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        background: 'rgba(35,35,38,0.75)',
                        backdropFilter: 'blur(6px)',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.5px'
                      }}
                    >
                      BEFORE PAWKEEP
                    </div>
                  </div>

                  {/* Clean Scene 1 (After Scooping / Box Care with Wipe Mask) */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      clipPath: ch === 0 ? 'inset(0 100% 0 0)' : (ch === 1 ? 'inset(0 calc((1 - var(--wipe)) * 100%) 0 0)' : 'inset(0 0 0 0)'),
                      opacity: ch <= 1 ? 1 : 0,
                      transition: ch > 1 ? 'opacity 0.6s ease' : 'none',
                      zIndex: 2
                    }}
                  >
                    <img
                      src={currentPhotos[1].src}
                      alt={currentPhotos[1].alt}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block'
                      }}
                    />
                    {/* Clean Label Indicator */}
                    <div
                      style={{
                        position: 'absolute',
                        right: '16px',
                        bottom: '16px',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        background: 'rgba(46,125,50,0.85)',
                        backdropFilter: 'blur(6px)',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.5px'
                      }}
                    >
                      CLEAN & MAINTAINED
                    </div>
                  </div>

                  {/* Wipe dividing line in Scene 1 */}
                  {ch === 1 && (
                    <div
                      className="pk-wipe"
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        width: '3px',
                        marginLeft: '-1.5px',
                        background: '#FFFFFF',
                        boxShadow: '0 0 16px rgba(255,255,255,1), 0 0 4px rgba(0,0,0,0.4)',
                        transform: 'translateX(calc(var(--wipe) * var(--sceneW, 800px)))',
                        opacity: 'var(--wipeOp)',
                        zIndex: 6
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: '#FFFFFF',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          color: '#232326',
                          fontWeight: 900
                        }}
                      >
                        ↔
                      </div>
                    </div>
                  )}

                  {/* Scene 2 (Grooming Photo) */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: ch === 2 ? 1 : 0,
                      pointerEvents: 'none',
                      transition: 'opacity 0.7s ease',
                      zIndex: 3
                    }}
                  >
                    <img
                      src={currentPhotos[2].src}
                      alt={currentPhotos[2].alt}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block'
                      }}
                    />
                  </div>

                  {/* Scene 3 (Vet Photo) */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: ch === 3 ? 1 : 0,
                      pointerEvents: 'none',
                      transition: 'opacity 0.7s ease',
                      zIndex: 3
                    }}
                  >
                    <img
                      src={currentPhotos[3].src}
                      alt={currentPhotos[3].alt}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block'
                      }}
                    />
                  </div>

                  {/* Scene 4 (Training / Enrichment Photo) */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: ch === 4 ? 1 : 0,
                      pointerEvents: 'none',
                      transition: 'opacity 0.7s ease',
                      zIndex: 3
                    }}
                  >
                    <img
                      src={currentPhotos[4].src}
                      alt={currentPhotos[4].alt}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block'
                      }}
                    />
                  </div>

                  {/* Scene 5 (One Plan / Content Pet Photo) */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: ch === 5 ? 1 : 0,
                      pointerEvents: 'none',
                      transition: 'opacity 0.7s ease',
                      zIndex: 3
                    }}
                  >
                    <img
                      src={currentPhotos[5].src}
                      alt={currentPhotos[5].alt}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block'
                      }}
                    />
                  </div>
                </div>

                {/* Status Pill in Scene 1 */}
                <div
                  style={sx(`position: absolute; left: 16px; top: 16px; z-index: 8; display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 999px; background: rgba(35,35,38,0.78); backdrop-filter: blur(8px); color: #FFFFFF; font-size: 12px; font-weight: 700; box-shadow: 0 4px 12px rgba(0,0,0,0.2); transition: opacity .4s ease; ${show(ch === 1)}`)}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: piles === 0 ? '#4CAF50' : '#FF9800', display: 'inline-block' }} />
                  <span>{isCat ? (piles === 0 ? 'Box refreshed & sanitized' : 'Sanitizing & refreshing box') : (piles === 0 ? 'Yard is spotless! Waste hauled.' : `${piles} areas cleared & hauled`)}</span>
                </div>

                {/* Subtle Kicker Chip in Scenes 2-5 */}
                {ch >= 2 && (
                  <div
                    style={{
                      position: 'absolute',
                      right: '16px',
                      top: '16px',
                      zIndex: 8,
                      padding: '5px 12px',
                      borderRadius: '8px',
                      background: 'rgba(35,35,38,0.72)',
                      backdropFilter: 'blur(6px)',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      transition: 'opacity 0.4s ease',
                      pointerEvents: 'none'
                    }}
                  >
                    {chData[ch]?.kicker}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
