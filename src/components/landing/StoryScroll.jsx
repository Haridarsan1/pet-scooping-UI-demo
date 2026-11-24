import React, { useEffect, useRef, useState } from 'react';
import { sx } from '../../sx.js';
import '../../pawkeep.css';

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
      title: `This is ${poss} yard. Before PawKeep.`,
      body: isCat
        ? 'A litter box you keep meaning to clean, a coat that needs brushing, and never enough time.'
        : 'Piles you keep meaning to get to, a muddy lawn, and never enough weekend time.',
      askName: true
    },
    {
      kicker: isCat ? 'Litter box care' : 'Poop scooping',
      title: 'Every week, Jamie scoops it.',
      body: 'Your dedicated caretaker clears the mess, bags it and hauls it away, on a schedule you set once.'
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
      kicker: 'Training',
      title: 'Better manners, built in.',
      body: 'Two one-hour positive reinforcement sessions a month for calm walks and polite hellos.'
    },
    {
      kicker: 'One plan',
      title: 'All of it. One caring team. One bill.',
      body: `Pick what ${name} needs and see your price in seconds. Plans start at $79 a month.`,
      isPlan: true
    }
  ];

  const railLabels = ['Before', isCat ? 'Litter box' : 'Scooping', 'Grooming', 'Vet visit', 'Training', 'Your plan'];
  const bgs = ['#F6F4F5', '#EEF5EF', '#EEF2FB', '#FBEDEF', '#FBF4D6', '#FBE9EC'];
  const cams = [
    ['scale(1.06)', '50% 60%'],
    ['scale(1)', '50% 50%'],
    ['scale(1.5)', '52% 72%'],
    ['scale(1.38)', '50% 66%'],
    ['scale(1.3)', '30% 82%'],
    ['scale(.96)', '50% 50%']
  ];

  const cards = {
    2: { k: 'Grooming checklist', t: 'Full groom at home', items: ['Warm bath', 'Brush-out', 'Nail trim', 'Ear clean'] },
    3: { k: 'Vet visit report', t: 'Healthy and happy', items: ['Weight checked', 'Heart and lungs', 'Vaccines up to date', 'Next check in 3 months'] },
    4: { k: 'Training log', t: 'Session 2 of 2', items: ['Sit and stay', 'Loose-leash walk', 'Wait at the door', 'Calm hello for guests'] }
  };
  const stCard = cards[ch];

  const show = (on) => (on ? 'opacity: 1; transform: none' : 'opacity: 0; transform: translateY(14px) scale(.9); pointer-events: none');

  return (
    <section
      id="story"
      ref={storyRef}
      aria-label="A week with PawKeep, told as a story"
      style={{
        position: 'relative',
        height: '3200px', // Streamlined height for better scrolling usability
        ['--p']: 0,
        ['--wipe']: 0,
        ['--wipeOp']: 0
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: '78px',
          height: 'min(92vh, 800px)',
          minHeight: '620px',
          overflow: 'hidden',
          transition: 'background-color .8s ease',
          backgroundColor: bgs[ch]
        }}
      >
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
            zIndex: 2
          }}
        />

        <div
          style={{
            height: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '24px 24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {/* Chapter rail */}
          <div
            className="pk-rail"
            role="group"
            aria-label="Story Chapters"
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '4px'
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
          <div
            style={{
              flex: '1 1 auto',
              minHeight: 0,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '28px'
            }}
          >
            {/* Story Text Column */}
            <div
              className="pk-story-text"
              style={{
                flex: '1 1 340px',
                minWidth: 0,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <div style={{ position: 'relative', minHeight: '300px' }}>
                {chData.map((c, i) => {
                  const on = i === ch;
                  return (
                    <div
                      key={i}
                      aria-hidden={!on}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        visibility: on ? 'visible' : 'hidden',
                        opacity: on ? 1 : 0,
                        pointerEvents: on ? 'auto' : 'none',
                        transition: 'opacity 0.4s ease, transform 0.4s ease',
                        transform: on ? 'none' : `translateY(${i < ch ? -15 : 15}px)`
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
                          fontSize: 'clamp(26px, 3vw, 42px)',
                          lineHeight: 1.08,
                          letterSpacing: '-1.4px'
                        }}
                      >
                        {c.title}
                      </h3>

                      <p
                        style={{
                          margin: '12px 0 0',
                          fontSize: '16px',
                          lineHeight: 1.55,
                          color: '#4B4A50',
                          maxWidth: '28em'
                        }}
                      >
                        {c.body}
                      </p>

                      {c.askName && (
                        <div style={{ marginTop: '18px', display: 'flex', flexWrap: 'wrap', gap: '8px', maxWidth: '400px' }}>
                          <label htmlFor="story-name-input" style={{ flexBasis: '100%', fontSize: '13px', fontWeight: 800 }}>
                            Personalize this story:
                          </label>
                          <input
                            id="story-name-input"
                            maxLength={20}
                            placeholder="Your pet’s name"
                            value={localPetName}
                            onChange={(e) => setLocalPetName(e.target.value.slice(0, 20))}
                            style={{
                              flex: '1 1 150px',
                              minWidth: 0,
                              minHeight: '46px',
                              padding: '0 14px',
                              borderRadius: '12px',
                              border: '1.5px solid #ECE7E9',
                              background: '#FFFFFF',
                              fontSize: '15px',
                              fontWeight: 700
                            }}
                          />
                          <div
                            role="group"
                            aria-label="Pet type"
                            style={{ display: 'flex', padding: '3px', borderRadius: '12px', background: '#FFFFFF', border: '1.5px solid #ECE7E9' }}
                          >
                            <button
                              type="button"
                              onClick={() => setLocalPetType('dog')}
                              style={{
                                padding: '0 12px',
                                minHeight: '38px',
                                borderRadius: '9px',
                                background: localPetType === 'dog' ? '#232326' : 'transparent',
                                color: localPetType === 'dog' ? '#FFFFFF' : '#232326',
                                fontWeight: 800,
                                fontSize: '13px',
                                cursor: 'pointer'
                              }}
                            >
                              Dog
                            </button>
                            <button
                              type="button"
                              onClick={() => setLocalPetType('cat')}
                              style={{
                                padding: '0 12px',
                                minHeight: '38px',
                                borderRadius: '9px',
                                background: localPetType === 'cat' ? '#232326' : 'transparent',
                                color: localPetType === 'cat' ? '#FFFFFF' : '#232326',
                                fontWeight: 800,
                                fontSize: '13px',
                                cursor: 'pointer'
                              }}
                            >
                              Cat
                            </button>
                          </div>
                        </div>
                      )}

                      {c.isPlan && (
                        <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                          <a
                            href="#plan"
                            style={{
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              minHeight: '50px',
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
                              minHeight: '50px',
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
                <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#6A6870' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                    <span style={{ animation: 'pkFloat 2s infinite ease-in-out', display: 'inline-block' }}>↓</span> Scroll to see each service in action
                  </span>
                  <a href="#plan" style={{ color: '#C2415B', fontWeight: 800, textDecoration: 'underline' }}>
                    Skip to Pricing Calculator →
                  </a>
                </div>
              )}
            </div>

            {/* Interactive Scene Column */}
            <div
              className="pk-story-scene"
              style={{
                flex: '1.5 1 480px',
                minWidth: 0,
                perspective: '1600px'
              }}
            >
              <div
                className="pk-tiltable"
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1200 / 680',
                  borderRadius: '26px',
                  overflow: 'hidden',
                  background: '#232326',
                  boxShadow: '0 30px 60px -25px rgba(35,35,38,.5)'
                }}
              >
                <div
                  className="pk-cam"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    willChange: 'transform',
                    transition: 'transform 1.4s cubic-bezier(.65,0,.15,1)',
                    transformOrigin: cams[ch][1],
                    transform: cams[ch][0]
                  }}
                >
                  {/* Before Scene (Unclean yard) */}
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <svg viewBox="0 0 1200 620" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} aria-hidden="true">
                      <defs>
                        <linearGradient id="m-sky-s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#B9BFB3" /><stop offset="1" stopColor="#DEDACB" /></linearGradient>
                        <linearGradient id="m-lawn-s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#A2A46A" /><stop offset="1" stopColor="#76783F" /></linearGradient>
                      </defs>
                      <rect width="1200" height="620" fill="url(#m-sky-s)" />
                      <g fill="#A3A99E"><ellipse cx="260" cy="110" rx="130" ry="46" /><ellipse cx="880" cy="140" rx="150" ry="50" /></g>
                      <path d="M0 330 Q300 270 600 310 T1200 300 V620 H0Z" fill="#8F9870" />
                      <path d="M0 410 Q600 370 1200 410 V620 H0Z" fill="url(#m-lawn-s)" />
                      {/* Piles */}
                      <g transform="translate(200 520)"><ellipse cx="0" cy="0" rx="26" ry="10" fill="#5A3820" /><ellipse cx="0" cy="-10" rx="18" ry="8" fill="#6B4426" /></g>
                      <g transform="translate(460 590)"><ellipse cx="0" cy="0" rx="26" ry="10" fill="#5A3820" /><ellipse cx="0" cy="-10" rx="18" ry="8" fill="#6B4426" /></g>
                      <g transform="translate(760 520)"><ellipse cx="0" cy="0" rx="26" ry="10" fill="#5A3820" /><ellipse cx="0" cy="-10" rx="18" ry="8" fill="#6B4426" /></g>
                      <g transform="translate(980 600)"><ellipse cx="0" cy="0" rx="26" ry="10" fill="#5A3820" /><ellipse cx="0" cy="-10" rx="18" ry="8" fill="#6B4426" /></g>
                      {/* Pet */}
                      <ellipse cx="600" cy="578" rx="110" ry="14" fill="#1B2430" opacity=".18" />
                      <ellipse cx="600" cy="494" rx="74" ry="82" fill="#8F7C68" />
                      <circle cx="600" cy="388" r="64" fill="#8F7C68" />
                    </svg>
                  </div>

                  {/* Clean yard with wipe mask */}
                  <div style={{ position: 'absolute', inset: 0, clipPath: 'inset(0 calc((1 - var(--wipe)) * 100%) 0 0)' }}>
                    <svg viewBox="0 0 1200 620" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} aria-hidden="true">
                      <defs>
                        <linearGradient id="c-sky-s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7CC4FF" /><stop offset="1" stopColor="#D8F0FF" /></linearGradient>
                        <radialGradient id="c-lawn-s" cx="45%" cy="10%" r="90%"><stop offset="0" stopColor="#9BE6AE" /><stop offset=".5" stopColor="#4CB873" /><stop offset="1" stopColor="#2B8A50" /></radialGradient>
                      </defs>
                      <rect width="1200" height="620" fill="url(#c-sky-s)" />
                      <circle cx="1050" cy="110" r="58" fill="#FFD447" />
                      <path d="M0 330 Q300 270 600 310 T1200 300 V620 H0Z" fill="#6CCB8B" />
                      <path d="M0 410 Q600 370 1200 410 V620 H0Z" fill="url(#c-lawn-s)" />
                      {/* Happy Pet */}
                      <ellipse cx="600" cy="578" rx="110" ry="14" fill="#1B2430" opacity=".18" />
                      <ellipse cx="600" cy="494" rx="74" ry="82" fill="#F2C27B" />
                      <circle cx="600" cy="388" r="64" fill="#F2C27B" />
                      <circle cx="580" cy="380" r="6" fill="#3B2414" />
                      <circle cx="620" cy="380" r="6" fill="#3B2414" />
                      <ellipse cx="600" cy="402" rx="11" ry="8" fill="#3B2414" />
                    </svg>
                  </div>

                  {/* Wipe dividing line */}
                  <div
                    className="pk-wipe"
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: 0,
                      width: '4px',
                      marginLeft: '-2px',
                      background: '#FFFFFF',
                      boxShadow: '0 0 24px rgba(255,255,255,.9)',
                      transform: 'translateX(calc(var(--wipe) * var(--sceneW, 900px)))',
                      opacity: 'var(--wipeOp)'
                    }}
                  />

                  {/* Service Overlays */}
                  {/* Grooming Bubbles */}
                  <div style={sx(`position: absolute; left: 56%; top: 52%; width: 9%; transition: opacity .7s ease; ${show(ch === 2)}`)}>
                    <div className="pk-bubbles">
                      <svg width="60" height="60" viewBox="0 0 100 100">
                        <circle cx="40" cy="60" r="32" fill="#F4C7CF" opacity="0.9" />
                        <circle cx="74" cy="30" r="20" fill="#C2415B" opacity="0.8" />
                      </svg>
                    </div>
                  </div>

                  {/* Vet Stethoscope / Heart */}
                  <div style={sx(`position: absolute; left: 56%; top: 44%; width: 7%; transition: opacity .7s ease; ${show(ch === 3)}`)}>
                    <div className="pk-beat">
                      <svg width="50" height="50" viewBox="0 0 24 24" fill="#C2415B">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Status Badge in Scene */}
                <div
                  style={sx(`position: absolute; left: 3%; top: 5%; display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 14px; background: #FFFFFF; box-shadow: 0 10px 24px rgba(0,0,0,.25); transition: opacity .6s ease; ${show(ch === 1)}`)}
                >
                  <span style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#C2415B', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '12px' }}>
                    JR
                  </span>
                  <span style={{ fontSize: '13px', lineHeight: 1.35 }}>
                    <strong>Jamie is scooping</strong><br />
                    {piles === 0 ? 'Yard is spotless! Waste bagged.' : `${piles} piles left to haul`}
                  </span>
                </div>

                {/* Service Card In Scene */}
                {stCard && (
                  <div
                    style={sx(`position: absolute; right: 3%; top: 5%; width: min(240px, 45%); padding: 14px; border-radius: 16px; background: #FFFFFF; box-shadow: 0 14px 30px rgba(0,0,0,.3); transition: opacity .6s ease; ${show(!!stCard)}`)}
                  >
                    <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: '#C2415B' }}>{stCard.k}</p>
                    <p style={{ margin: '4px 0 8px', fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: '15px' }}>{stCard.t}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      {stCard.items.map((it, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#4B4A50' }}>
                          <span style={{ color: '#C2415B' }}>✓</span> {it}
                        </div>
                      ))}
                    </div>
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
