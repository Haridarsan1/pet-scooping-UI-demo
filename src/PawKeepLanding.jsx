// PawKeep landing page (Version 8: story scroll).
// Converted from the design canvas into a plain React component.
// - All page data and interactions live in renderVals() below; the JSX at the bottom reads from it.
// - Inline styles are kept as CSS strings and turned into React style objects by sx(), so they stay readable.
// - Prices, names (Biscuit, Jamie) and [BRACKETED] text are placeholders.
import React from 'react';
import { sx } from './sx.js';
import './pawkeep.css';

export default class PawKeepLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  componentDidMount() {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this._cur = 0; this._target = 0;
    const clamp = (v) => Math.min(1, Math.max(0, v));
    this._apply = (p) => {
      const el = this._story; if (!el) return;
      const ch = Math.min(5, Math.floor(p * 6));
      const local = clamp(p * 6 - ch);
      const wipe = ch === 1 ? clamp(local * 1.18) : (ch > 1 ? 1 : 0);
      const st = el.style;
      st.setProperty('--p', p.toFixed(4));
      st.setProperty('--wipe', wipe.toFixed(4));
      st.setProperty('--wipeOp', ch === 1 && wipe < 1 ? '1' : '0');
      const scene = el.querySelector('.pk-tiltable');
      if (scene) st.setProperty('--sceneW', scene.offsetWidth + 'px');
      for (let i = 0; i < 6; i++) st.setProperty('--r' + i, (i < ch ? 1 : i === ch ? local : 0).toFixed(4));
      for (let i = 0; i < 4; i++) st.setProperty('--t' + i, clamp(local * 5 - i - 0.2).toFixed(3));
      const piles = [16.7, 28.3, 38.3, 63.3, 81.7].filter((x) => x > wipe * 100).length;
      const s0 = this.state || {};
      if (ch !== (s0.ch ?? 0) || piles !== (s0.piles ?? 5)) this.setState({ ch: ch, piles: piles });
    };
    this._measure = () => {
      const el = this._story; if (!el) return;
      const r = el.getBoundingClientRect();
      const stage = (el.firstElementChild && el.firstElementChild.offsetHeight) || 800;
      const total = Math.max(1, r.height - stage);
      this._target = Math.min(0.9999, clamp(-r.top / total));
    };
    this._frame = () => {
      this._raf = 0;
      this._measure();
      const d = this._target - this._cur;
      this._cur = reduce || Math.abs(d) < 0.0004 ? this._target : this._cur + d * 0.12;
      this._apply(this._cur);
      if (this._cur !== this._target) this._raf = requestAnimationFrame(this._frame);
    };
    this._onScroll = () => { if (!this._raf) this._raf = requestAnimationFrame(this._frame); };
    document.addEventListener('scroll', this._onScroll, { passive: true, capture: true });
    window.addEventListener('resize', this._onScroll);
    this._measure(); this._cur = this._target; this._apply(this._cur);
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this._onScroll, { capture: true });
    window.removeEventListener('resize', this._onScroll);
    if (this._raf) cancelAnimationFrame(this._raf);
  }
  renderVals() {
    const s = this.state || {};
    const scoop = s.scoop ?? 1, pets = s.pets ?? 1, groom = s.groom ?? 0, vet = s.vet ?? false, train = s.train ?? false;
    const set = (k, v) => () => this.setState({ [k]: v });
    const mk = (list, k, cur) => list.map((o) => ({ label: o.l, on: o.v === cur, off: o.v !== cur, pick: set(k, o.v) }));
    const scoopPrice = { 0: 0, 1: 79, 2: 139, 3: 189 }[scoop];
    const petExtra = scoop > 0 ? (pets - 1) * 12 : 0;
    const groomPrice = groom * 69, vetPrice = vet ? 49 : 0, trainPrice = train ? 119 : 0;
    const lines = [];
    if (scoop > 0) lines.push({ name: 'Yard scooping, ' + scoop + '× a week', price: '$' + scoopPrice });
    if (petExtra > 0) lines.push({ name: 'Extra pets (' + (pets - 1) + ')', price: '$' + petExtra });
    if (groom > 0) lines.push({ name: 'Grooming, ' + groom + '× a month', price: '$' + groomPrice });
    if (vet) lines.push({ name: 'Home vet visits', price: '$' + vetPrice });
    if (train) lines.push({ name: 'Training', price: '$' + trainPrice });
    const total = scoopPrice + petExtra + groomPrice + vetPrice + trainPrice;

    const clean = s.clean ?? 32;
    const touched = !!s.touched;
    const left = [16.7, 28.3, 38.3, 63.3, 81.7].filter((p) => p > clean).length;
    const done = clean >= 97;
    const statusText = done ? 'Spotless. ' + (((s.petName || '').trim()) || 'Your pet') + ' approves.' : left === 0 ? 'Almost there. Keep going.' : left + (left === 1 ? ' pile' : ' piles') + ' left. Keep dragging.';
    const card = (k) => { const after = !!s[k]; return { after: after, before: !after, toAfter: () => this.setState({ [k]: true }), toBefore: () => this.setState({ [k]: false }) }; };

    const petName = (s.petName || '').trim();
    const petType = s.petType || 'dog';
    const petLabel = petName || 'your pet';
    const possessive = petName ? petName + '’s' : 'Your pet’s';
    const tog = (k, onVal) => () => { const cur = k === 'scoop' ? scoop > 0 : k === 'groom' ? groom > 0 : !!s[k]; this.setState({ [k]: cur ? (onVal === true ? false : 0) : onVal, picked: true }); };
    const pk = (on, k, onVal) => ({ on: on, off: !on, toggle: tog(k, onVal) });
    const pickCount = (scoop > 0 ? 1 : 0) + (groom > 0 ? 1 : 0) + (vet ? 1 : 0) + (train ? 1 : 0);

    const ch = s.ch ?? 0;
    const pn = ((s.petName || '').trim());
    const name = pn || 'your pet';
    const poss = pn ? pn + '’s' : 'your';
    const isCat = s.petType === 'cat';
    const chData = [
      { kicker: 'A normal week', title: 'This is ' + poss + ' yard. Before PawKeep.', body: isCat ? 'A litter box you keep meaning to get to, a coat that needs care, and never enough time.' : 'Piles you keep meaning to get to, a muddy dog, and never enough time.', askName: true },
      { kicker: isCat ? 'Litter box care' : 'Poop scooping', title: 'Every week, Jamie scoops it.', body: 'Your caretaker clears the mess, bags it and takes it away, on a schedule you set once.' },
      { kicker: 'Grooming', title: 'Bath day, without the wrestling.', body: 'Bath, brush, nails and ears for ' + name + ', done right at your home.' },
      { kicker: 'Vet at home', title: 'Check-ups on your own couch.', body: 'A licensed partner vet comes to you. No carrier, no car ride, no waiting room.' },
      { kicker: 'Training', title: 'Better manners, built in.', body: 'Two one-hour sessions a month for calm walks and polite hellos.' },
      { kicker: 'One plan', title: 'All of it. One caretaker. One bill.', body: 'Pick what ' + name + ' needs and see your price in seconds. Plans start at $79 a month.', isPlan: true }
    ];
    const railLabels = ['Before', isCat ? 'Litter box' : 'Scooping', 'Grooming', 'Vet visit', 'Training', 'Your plan'];
    const bgs = ['#F6F4F5', '#EEF5EF', '#EEF2FB', '#FBEDEF', '#FBF4D6', '#FBE9EC'];
    const cams = [['scale(1.06)', '50% 60%'], ['scale(1)', '50% 50%'], ['scale(1.5)', '52% 72%'], ['scale(1.38)', '50% 66%'], ['scale(1.3)', '30% 82%'], ['scale(.96)', '50% 50%']];
    const show = (on) => on ? 'opacity: 1; transform: none' : 'opacity: 0; transform: translateY(14px) scale(.9); pointer-events: none';
    const piles = s.piles ?? 5;
    const cards = {
      2: { k: 'Grooming checklist', t: 'Full groom at home', items: ['Warm bath', 'Brush-out', 'Nail trim', 'Ear clean'] },
      3: { k: 'Vet visit report', t: 'Healthy and happy', items: ['Weight checked', 'Heart and lungs', 'Vaccines up to date', 'Next check in 3 months'] },
      4: { k: 'Training log', t: 'Session 2 of 2', items: ['Sit and stay', 'Loose-leash walk', 'Wait at the door', 'Calm hello for guests'] }
    };
    const stCard = cards[ch];
    const goTo = (i) => () => {
      const el = this._story; if (!el) return;
      const se = document.scrollingElement || document.documentElement;
      const stage = (el.firstElementChild && el.firstElementChild.offsetHeight) || 800;
      const total = Math.max(1, el.offsetHeight - stage);
      const top = el.getBoundingClientRect().top + se.scrollTop;
      se.scrollTo({ top: top + total * (i + 0.12) / 6, behavior: 'smooth' });
    };
    return {
      storyRef: (el) => { this._story = el; },
      stageBg: bgs[ch],
      rail: railLabels.map((l, i) => ({ label: l, num: String(i + 1).padStart(2, '0'), go: goTo(i), current: i === ch ? 'step' : 'false', look: i === ch ? 'background: #232326; color: #FFFFFF' : (i < ch ? 'background: #FFFFFF; color: #232326' : 'background: rgba(255,255,255,.55); color: #5E5C63'), fill: 'transform: scaleX(var(--r' + i + '))' })),
      chapters: chData.map((c, i) => { const on = i === ch; const a = (d, y) => on ? 'transform: none; opacity: 1; transition-delay: ' + d + 's' : 'transform: translateY(' + (i < ch ? -y : y) + 'px); opacity: 0; transition-delay: 0s'; return { kicker: c.kicker, title: c.title, body: c.body, askName: !!c.askName, isPlan: !!c.isPlan, hidden: on ? 'false' : 'true', vis: on ? 'visibility: visible; transition: visibility 0s' : 'visibility: hidden; pointer-events: none; transition: visibility 0s .6s', a1: a(0.05, 40), a2: a(0.12, 70), a3: a(0.22, 30), a4: a(0.3, 30) }; }),
      notLastChapter: ch !== 5,
      cam: cams[ch][0], camOrigin: cams[ch][1],
      scoopStatus: piles === 0 ? 'All clear. Waste bagged.' : piles + (piles === 1 ? ' pile' : ' piles') + ' to go',
      s1: show(ch === 1), s2: show(ch === 2), s3: show(ch === 3), s4: show(ch === 4), s5: show(ch === 5),
      cardVis: show(!!stCard),
      cardKicker: stCard ? stCard.k : '', cardTitle: stCard ? stCard.t : '',
      cardItems: (stCard ? stCard.items : ['', '', '', '']).map((t, i) => ({ text: t, look: 'opacity: calc(.45 + .55 * var(--t' + i + '))', box: 'opacity: var(--t' + i + ')' })),
      onTilt: (e) => { const el = e.currentTarget; const r = el.getBoundingClientRect(); el.style.setProperty('--mx', (((e.clientX - r.left) / r.width) - 0.5).toFixed(3)); el.style.setProperty('--my', (((e.clientY - r.top) / r.height) - 0.5).toFixed(3)); },
      onTiltEnd: (e) => { const el = e.currentTarget; el.style.setProperty('--mx', '0'); el.style.setProperty('--my', '0'); },
      storyTag: ch === 0 ? 'Before' : 'With PawKeep', tagVis: 'opacity: ' + (ch === 5 ? 0 : 1),
      scoopShort: isCat ? 'Litter box' : 'Scooping',
      petNameVal: s.petName || '',
      onPetName: (e) => this.setState({ petName: String(e.target.value).slice(0, 20) }),
      dogOn: petType === 'dog', catOn: petType === 'cat',
      pickDog: () => this.setState({ petType: 'dog' }), pickCat: () => this.setState({ petType: 'cat' }),
      petLabel: petLabel,
      startLabel: petName ? 'Build ' + possessive + ' plan' : 'Build my pet’s plan',
      nextVisitLabel: petName ? possessive + ' next visit' : 'Next visit',
      planTitle: possessive + ' plan',
      scoopTitle: petType === 'cat' ? 'Litter box care' : 'Poop scooping',
      scoopDesc: petType === 'cat' ? 'Litter scooped, changed and box cleaned on schedule.' : 'Yard cleared, bagged and hauled away on schedule.',
      pkScoop: pk(scoop > 0, 'scoop', 1), pkGroom: pk(groom > 0, 'groom', 1), pkVet: pk(vet, 'vet', true), pkTrain: pk(train, 'train', true),
      pickCount: pickCount,
      showBar: !!s.picked && pickCount > 0,
      barTitle: pickCount + (pickCount === 1 ? ' service' : ' services') + ' for ' + petLabel,
      primary: this.props.primary ?? '#C2415B',
      noSubmit: (e) => { if (e && e.preventDefault) e.preventDefault(); },
      clean: clean, cleanPct: clean + '%', clip: 'inset(0 ' + (100 - clean) + '% 0 0)',
      onSlide: (e) => this.setState({ clean: Number(e.target.value), touched: true }),
      touched: touched, untouched: !touched, done: done, statusText: statusText,
      groomCard: card('groomAfter'), vetCard: card('vetAfter'), trainCard: card('trainAfter'),
      scoopOpts: mk([{ l: 'None', v: 0 }, { l: 'Once a week', v: 1 }, { l: 'Twice a week', v: 2 }, { l: '3× a week', v: 3 }], 'scoop', scoop),
      petOpts: mk([{ l: '1', v: 1 }, { l: '2', v: 2 }, { l: '3', v: 3 }, { l: '4+', v: 4 }], 'pets', pets),
      groomOpts: mk([{ l: 'None', v: 0 }, { l: 'Once a month', v: 1 }, { l: 'Twice a month', v: 2 }], 'groom', groom),
      vetOpts: mk([{ l: 'No', v: false }, { l: 'Add', v: true }], 'vet', vet),
      trainOpts: mk([{ l: 'No', v: false }, { l: 'Add', v: true }], 'train', train),
      lines: lines, noLines: lines.length === 0, total: '$' + total,
      ctaLabel: total > 0 ? 'Subscribe for $' + total + '/mo' : 'Pick a service to start'
    };
  }

  render() {
    const v = this.renderVals();
    return (
      <div style={sx("font-family: 'Manrope', 'Helvetica Neue', Arial, sans-serif; color: #232326; background: #FFFFFF; width: 100%; overflow-x: clip")}>

        {/* Nav */}
        <header style={sx("position: sticky; top: 0; z-index: 50; background: rgba(255,255,255,.82); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px)")}>
          <nav aria-label="Main" style={sx("max-width: 1280px; margin: 0 auto; padding: 14px 24px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px")}>
            <a href="#top" style={sx("display: flex; align-items: center; gap: 10px; text-decoration: none; color: #232326")}>
              <svg width="38" height="38" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="12" fill="#232326"></rect><g fill="#F4C7CF"><ellipse cx="13" cy="15" rx="3" ry="3.8"></ellipse><ellipse cx="20" cy="12" rx="3" ry="3.8"></ellipse><ellipse cx="27" cy="15" rx="3" ry="3.8"></ellipse><path d="M20 19c-4.6 0-8 4.6-8 8 0 2.4 1.8 3.6 3.9 3.6 1.6 0 2.6-.9 4.1-.9s2.5.9 4.1.9c2.1 0 3.9-1.2 3.9-3.6 0-3.4-3.4-8-8-8z"></path></g></svg>
              <span style={sx("font-family: 'Unbounded', 'Manrope', sans-serif; font-weight: 700; font-size: 21px; letter-spacing: -0.6px")}>pawkeep</span>
            </a>
            <div style={sx("display: flex; flex-wrap: wrap; gap: 4px; padding: 5px; border-radius: 14px; background: #F6F4F5; font-size: 14px; font-weight: 700")}>
              <a href="#services" style={sx("text-decoration: none; padding: 10px 14px; border-radius: 10px")}>Services</a>
              <a href="#why" style={sx("text-decoration: none; padding: 10px 14px; border-radius: 10px")}>Why PawKeep</a>
              <a href="#plan" style={sx("text-decoration: none; padding: 10px 14px; border-radius: 10px")}>Pricing</a>
              <a href="#communities" style={sx("text-decoration: none; padding: 10px 14px; border-radius: 10px")}>Communities</a>
              <a href="#farewell" style={sx("text-decoration: none; padding: 10px 14px; border-radius: 10px")}>Farewell care</a>
            </div>
            <div style={sx("display: flex; align-items: center; gap: 8px")}>
              <a href="#signin" style={sx("text-decoration: none; font-size: 14px; font-weight: 700; padding: 12px 10px")}>Sign in</a>
              <a href="#plan" style={sx("text-decoration: none; display: inline-flex; align-items: center; min-height: 46px; padding: 0 20px; border-radius: 14px; background: #232326; color: #FFFFFF; font-weight: 700; font-size: 14px")}>Start my plan</a>
            </div>
          </nav>
        </header>


        {/* Story */}
        <section ref={v.storyRef} aria-label="A week with PawKeep, told as a story" style={sx("position: relative; height: 5400px; --p: 0; --wipe: 0; --wipeOp: 0; --r0: 0; --r1: 0; --r2: 0; --r3: 0; --r4: 0; --r5: 0; --t0: 0; --t1: 0; --t2: 0; --t3: 0")}>
          <div style={sx(`position: sticky; top: 0; height: min(100vh, 880px); min-height: 660px; overflow: hidden; transition: background-color .8s ease; background-color: ${v.stageBg}`)}>
            <div aria-hidden="true" style={sx("position: absolute; left: 0; top: 0; height: 3px; width: 100%; transform-origin: left center; transform: scaleX(var(--p)); background: linear-gradient(90deg, #F4C7CF, #C2415B); z-index: 2")}></div>
            <div style={sx("height: 100%; max-width: 1280px; margin: 0 auto; padding: 78px 24px 22px; display: flex; flex-direction: column; gap: 18px")}>

              <div className="pk-rail" role="group" aria-label="Chapters" style={sx("display: flex; gap: 8px; overflow-x: auto; padding-bottom: 2px")}>
                {(v.rail || []).map((r, r_i) => (<React.Fragment key={r_i}>
                  <button type="button" onClick={r.go} aria-current={r.current} style={sx(`flex: 1 0 120px; position: relative; overflow: hidden; min-height: 46px; padding: 0 12px; border-radius: 12px; border: none; cursor: pointer; text-align: left; font-size: 13px; font-weight: 800; transition: background .3s ease, color .3s ease; ${r.look}`)}>
                    <span aria-hidden="true" style={sx(`position: absolute; left: 0; bottom: 0; height: 3px; width: 100%; transform-origin: left center; background: #C2415B; ${r.fill}`)}></span>
                    <span style={sx("position: relative")}>{r.num}  {r.label}</span>
                  </button>
                </React.Fragment>))}
              </div>

              <div style={sx("flex: 1 1 auto; min-height: 0; display: flex; flex-wrap: wrap; align-items: center; gap: 32px")}>
                <div className="pk-story-text" style={sx("flex: 1 1 340px; min-width: 0; position: relative; align-self: stretch; display: flex; flex-direction: column; justify-content: center")}>
                  <div style={sx("position: relative; min-height: 330px")}>
                    {(v.chapters || []).map((c, c_i) => (<React.Fragment key={c_i}>
                      <div aria-hidden={c.hidden} style={sx(`position: absolute; inset: 0; ${c.vis}`)}>
                        <div style={sx("overflow: hidden; padding-bottom: 2px")}><p style={sx(`margin: 0; display: inline-flex; align-items: center; gap: 8px; padding: 6px 10px; border-radius: 9px; background: #FFFFFF; font-size: 13px; font-weight: 800; color: #C2415B; transition: transform .7s cubic-bezier(.16,1,.3,1), opacity .5s ease; ${c.a1}`)}>{c.kicker}</p></div>
                        <div style={sx("overflow: hidden; margin-top: 14px; padding-bottom: 6px")}><h1 style={sx(`margin: 0; font-family: 'Unbounded', 'Manrope', sans-serif; font-weight: 700; font-size: clamp(30px, 3.5vw, 50px); line-height: 1.04; letter-spacing: -1.6px; transition: transform .9s cubic-bezier(.16,1,.3,1), opacity .6s ease; ${c.a2}`)}>{c.title}</h1></div>
                        <p style={sx(`margin: 12px 0 0; font-size: 18px; line-height: 1.55; color: #4B4A50; max-width: 28em; transition: transform .9s cubic-bezier(.16,1,.3,1), opacity .7s ease; ${c.a3}`)}>{c.body}</p>
                        <div style={sx(`transition: transform .9s cubic-bezier(.16,1,.3,1), opacity .7s ease; ${c.a4}`)}>
                        {c.askName ? (<>
                          <div style={sx("margin-top: 22px; display: flex; flex-wrap: wrap; gap: 8px; max-width: 420px")}>
                            <label htmlFor="story-name" style={sx("flex-basis: 100%; font-size: 14px; font-weight: 800")}>Make it about your pet</label>
                            <input id="story-name" maxLength="20" autoComplete="off" placeholder="Your pet’s name" value={v.petNameVal} onChange={v.onPetName} style={sx("flex: 1 1 160px; min-width: 0; min-height: 52px; padding: 0 16px; border-radius: 12px; border: 1.5px solid #ECE7E9; background: #FFFFFF; font-size: 16px; font-weight: 700; color: #232326")} />
                            <div role="group" aria-label="Pet type" style={sx("display: flex; padding: 4px; border-radius: 12px; background: #FFFFFF; border: 1.5px solid #ECE7E9")}>
                              {v.dogOn ? (<><button type="button" aria-pressed="true" style={sx("min-height: 42px; padding: 0 14px; border-radius: 9px; border: none; background: #232326; color: #FFFFFF; font-weight: 800; cursor: pointer")}>Dog</button><button type="button" aria-pressed="false" onClick={v.pickCat} style={sx("min-height: 42px; padding: 0 14px; border-radius: 9px; border: none; background: transparent; color: #232326; font-weight: 800; cursor: pointer")}>Cat</button></>) : null}
                              {v.catOn ? (<><button type="button" aria-pressed="false" onClick={v.pickDog} style={sx("min-height: 42px; padding: 0 14px; border-radius: 9px; border: none; background: transparent; color: #232326; font-weight: 800; cursor: pointer")}>Dog</button><button type="button" aria-pressed="true" style={sx("min-height: 42px; padding: 0 14px; border-radius: 9px; border: none; background: #232326; color: #FFFFFF; font-weight: 800; cursor: pointer")}>Cat</button></>) : null}
                            </div>
                          </div>
                        </>) : null}
                        {c.isPlan ? (<>
                          <div style={sx("margin-top: 24px; display: flex; flex-wrap: wrap; gap: 10px")}>
                            <a href="#plan" style={sx(`text-decoration: none; display: inline-flex; align-items: center; min-height: 56px; padding: 0 24px; border-radius: 14px; background: ${v.primary}; color: #FFFFFF; font-weight: 800; font-size: 16px`)}>{v.startLabel}</a>
                            <a href="#why" style={sx("text-decoration: none; display: inline-flex; align-items: center; min-height: 56px; padding: 0 20px; border-radius: 14px; background: #FFFFFF; color: #232326; font-weight: 800; font-size: 16px")}>Why not a sitter app?</a>
                          </div>
                        </>) : null}
                        </div>
                      </div>
                    </React.Fragment>))}
                  </div>
                  {v.notLastChapter ? (<>
                    <p style={sx("margin: 8px 0 0; display: flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 700; color: #4B4A50")}><svg className="pk-float" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#232326" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6"></path></svg>Keep scrolling<a href="#plan" style={sx("margin-left: auto; font-weight: 800")}>Skip to plans</a></p>
                  </>) : null}
                </div>

                <div className="pk-story-scene" style={sx("flex: 1.5 1 520px; min-width: 0; perspective: 1600px")}>
                  <div onMouseMove={v.onTilt} onMouseLeave={v.onTiltEnd} className="pk-tiltable" style={sx("position: relative; width: 100%; aspect-ratio: 1200 / 680; border-radius: 30px; overflow: hidden; background: #232326; box-shadow: 0 50px 90px -50px rgba(35,35,38,.7)")}>
                    <div className="pk-cam" style={sx(`position: absolute; inset: 0; will-change: transform; transition: transform 1.6s cubic-bezier(.65,0,.15,1); transform-origin: ${v.camOrigin}; transform: ${v.cam}`)}>
                      <div style={sx("position: absolute; inset: 0")}><svg viewBox="0 0 1200 620" style={sx("position: absolute; inset: 0; width: 100%; height: 100%; display: block")} aria-hidden="true"><defs><linearGradient id="m-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#B9BFB3"></stop><stop offset="1" stopColor="#DEDACB"></stop></linearGradient><linearGradient id="m-lawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#A2A46A"></stop><stop offset="1" stopColor="#76783F"></stop></linearGradient></defs>
      <rect width="1200" height="620" fill="url(#m-sky)"></rect>
      <g fill="#A3A99E"><ellipse cx="260" cy="110" rx="130" ry="46"></ellipse><ellipse cx="350" cy="90" rx="90" ry="48"></ellipse><ellipse cx="880" cy="140" rx="150" ry="50"></ellipse><ellipse cx="980" cy="110" rx="100" ry="50"></ellipse></g>
      <path d="M0 330 Q300 270 600 310 T1200 300 V620 H0Z" fill="#8F9870"></path>
      <path d="M-10 400 V342 L4 330 L18 342 V400 Z" fill="#B9AE97"></path><path d="M34 400 V342 L48 330 L62 342 V400 Z" fill="#B9AE97"></path><path d="M78 400 V342 L92 330 L106 342 V400 Z" fill="#B9AE97"></path><path d="M122 400 V342 L136 330 L150 342 V400 Z" fill="#B9AE97"></path><path d="M166 400 V342 L180 330 L194 342 V400 Z" fill="#B9AE97"></path><path d="M210 400 V342 L224 330 L238 342 V400 Z" fill="#B9AE97" transform="rotate(-14 224 400)"></path><path d="M254 400 V342 L268 330 L282 342 V400 Z" fill="#B9AE97" transform="rotate(12 268 400)"></path><path d="M298 400 V342 L312 330 L326 342 V400 Z" fill="#B9AE97"></path><path d="M342 400 V342 L356 330 L370 342 V400 Z" fill="#B9AE97"></path><path d="M386 400 V342 L400 330 L414 342 V400 Z" fill="#B9AE97"></path><path d="M430 400 V342 L444 330 L458 342 V400 Z" fill="#B9AE97"></path><path d="M474 400 V342 L488 330 L502 342 V400 Z" fill="#B9AE97"></path><path d="M518 400 V342 L532 330 L546 342 V400 Z" fill="#B9AE97"></path><path d="M562 400 V342 L576 330 L590 342 V400 Z" fill="#B9AE97" transform="rotate(-14 576 400)"></path><path d="M606 400 V342 L620 330 L634 342 V400 Z" fill="#B9AE97"></path><path d="M650 400 V342 L664 330 L678 342 V400 Z" fill="#B9AE97"></path><path d="M694 400 V342 L708 330 L722 342 V400 Z" fill="#B9AE97"></path><path d="M738 400 V342 L752 330 L766 342 V400 Z" fill="#B9AE97"></path><path d="M782 400 V342 L796 330 L810 342 V400 Z" fill="#B9AE97"></path><path d="M826 400 V342 L840 330 L854 342 V400 Z" fill="#B9AE97"></path><path d="M870 400 V342 L884 330 L898 342 V400 Z" fill="#B9AE97"></path><path d="M914 400 V342 L928 330 L942 342 V400 Z" fill="#B9AE97"></path><path d="M958 400 V342 L972 330 L986 342 V400 Z" fill="#B9AE97"></path><path d="M1002 400 V342 L1016 330 L1030 342 V400 Z" fill="#B9AE97"></path><path d="M1046 400 V342 L1060 330 L1074 342 V400 Z" fill="#B9AE97"></path><path d="M1090 400 V342 L1104 330 L1118 342 V400 Z" fill="#B9AE97"></path><path d="M1134 400 V342 L1148 330 L1162 342 V400 Z" fill="#B9AE97"></path><path d="M1178 400 V342 L1192 330 L1206 342 V400 Z" fill="#B9AE97"></path><rect x="0" y="348" width="1200" height="10" fill="#9C917A"></rect><rect x="0" y="378" width="1200" height="10" fill="#9C917A"></rect>
      <path d="M0 410 Q600 370 1200 410 V620 H0Z" fill="url(#m-lawn)"></path>
      <g fill="#9C7B4C" opacity=".75"><ellipse cx="160" cy="560" rx="110" ry="24"></ellipse><ellipse cx="420" cy="470" rx="80" ry="16"></ellipse><ellipse cx="820" cy="580" rx="140" ry="26"></ellipse><ellipse cx="1080" cy="560" rx="80" ry="18"></ellipse></g>
      <g stroke="#6E7236" strokeWidth="5" strokeLinecap="round" fill="none"><path d="M60 470 l10 -50 l8 46"></path><path d="M120 440 l6 -40 l10 42"></path><path d="M300 600 l8 -56 l10 54"></path><path d="M700 470 l6 -44 l10 46"></path><path d="M1150 470 l8 -50 l8 48"></path><path d="M1010 610 l6 -46 l10 44"></path></g>
      <defs><linearGradient id="dh-f-m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#B8A88C"></stop><stop offset="1" stopColor="#94816A"></stop></linearGradient><linearGradient id="dh-s-m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#857360"></stop><stop offset="1" stopColor="#6A5A48"></stop></linearGradient><linearGradient id="dh-r-m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#9E7C74"></stop><stop offset="1" stopColor="#6E5650"></stop></linearGradient></defs>
      <g transform="translate(860 330) scale(1.15)"><ellipse cx="100" cy="174" rx="100" ry="14" fill="#1B2430" opacity=".18"></ellipse><polygon points="120,72 178,52 178,150 120,170" fill="url(#dh-s-m)"></polygon><polygon points="22,72 70,24 120,72 120,170 22,170" fill="url(#dh-f-m)"></polygon><polygon points="70,14 128,-6 192,50 134,74" fill="url(#dh-r-m)"></polygon><polygon points="70,14 134,74 131,82 70,23" fill="#5A4540"></polygon><polygon points="4,82 70,14 70,23 14,90" fill="#AE928A"></polygon><path d="M48 170 V128 a22 22 0 0 1 44 0 V170 Z" fill="#3A2E26"></path><rect x="54" y="92" width="34" height="12" rx="4" fill="#C9BBA6"></rect><g fill="#5E4630" opacity=".55"><ellipse cx="40" cy="160" rx="18" ry="7"></ellipse><ellipse cx="150" cy="140" rx="12" ry="18"></ellipse><circle cx="100" cy="120" r="6"></circle></g><path d="M30 110 l14 18 l-6 6 l16 12" stroke="#5A4A3A" strokeWidth="2" fill="none"></path></g>
      <g transform="translate(700 560) rotate(-30)"><path d="M-40 0 Q0 30 40 0 L34 -14 L-34 -14 Z" fill="#7E8B9A"></path><ellipse cx="0" cy="-14" rx="34" ry="8" fill="#5F6B78"></ellipse></g>
      <g transform="translate(380 560) rotate(18)"><rect x="-36" y="-10" width="72" height="20" rx="10" fill="#B7A27E"></rect><path d="M-20 -10 l6 10 l-8 6 M14 -10 l-6 12 l10 4" stroke="#7C6A4E" strokeWidth="3" fill="none"></path></g>
      <g transform="translate(200 520) scale(1)"><ellipse cx="0" cy="0" rx="30" ry="12" fill="#5A3820"></ellipse><ellipse cx="0" cy="-12" rx="22" ry="10" fill="#6B4426"></ellipse><ellipse cx="2" cy="-22" rx="13" ry="8" fill="#7A4E2C"></ellipse><ellipse cx="-6" cy="-24" rx="5" ry="3" fill="#A87A4E" opacity=".7"></ellipse><g className="pk-fly"><circle cx="18" cy="-46" r="3" fill="#1B2430"></circle><ellipse cx="15" cy="-50" rx="4" ry="2.5" fill="#FFFFFF" opacity=".8"></ellipse></g></g><g transform="translate(340 476) scale(0.85)"><ellipse cx="0" cy="0" rx="30" ry="12" fill="#5A3820"></ellipse><ellipse cx="0" cy="-12" rx="22" ry="10" fill="#6B4426"></ellipse><ellipse cx="2" cy="-22" rx="13" ry="8" fill="#7A4E2C"></ellipse><ellipse cx="-6" cy="-24" rx="5" ry="3" fill="#A87A4E" opacity=".7"></ellipse><g className="pk-fly"><circle cx="18" cy="-46" r="3" fill="#1B2430"></circle><ellipse cx="15" cy="-50" rx="4" ry="2.5" fill="#FFFFFF" opacity=".8"></ellipse></g></g><g transform="translate(460 590) scale(1.05)"><ellipse cx="0" cy="0" rx="30" ry="12" fill="#5A3820"></ellipse><ellipse cx="0" cy="-12" rx="22" ry="10" fill="#6B4426"></ellipse><ellipse cx="2" cy="-22" rx="13" ry="8" fill="#7A4E2C"></ellipse><ellipse cx="-6" cy="-24" rx="5" ry="3" fill="#A87A4E" opacity=".7"></ellipse><g className="pk-fly"><circle cx="18" cy="-46" r="3" fill="#1B2430"></circle><ellipse cx="15" cy="-50" rx="4" ry="2.5" fill="#FFFFFF" opacity=".8"></ellipse></g></g><g transform="translate(760 520) scale(0.9)"><ellipse cx="0" cy="0" rx="30" ry="12" fill="#5A3820"></ellipse><ellipse cx="0" cy="-12" rx="22" ry="10" fill="#6B4426"></ellipse><ellipse cx="2" cy="-22" rx="13" ry="8" fill="#7A4E2C"></ellipse><ellipse cx="-6" cy="-24" rx="5" ry="3" fill="#A87A4E" opacity=".7"></ellipse><g className="pk-fly"><circle cx="18" cy="-46" r="3" fill="#1B2430"></circle><ellipse cx="15" cy="-50" rx="4" ry="2.5" fill="#FFFFFF" opacity=".8"></ellipse></g></g><g transform="translate(980 600) scale(1)"><ellipse cx="0" cy="0" rx="30" ry="12" fill="#5A3820"></ellipse><ellipse cx="0" cy="-12" rx="22" ry="10" fill="#6B4426"></ellipse><ellipse cx="2" cy="-22" rx="13" ry="8" fill="#7A4E2C"></ellipse><ellipse cx="-6" cy="-24" rx="5" ry="3" fill="#A87A4E" opacity=".7"></ellipse><g className="pk-fly"><circle cx="18" cy="-46" r="3" fill="#1B2430"></circle><ellipse cx="15" cy="-50" rx="4" ry="2.5" fill="#FFFFFF" opacity=".8"></ellipse></g></g>
      <ellipse cx="600" cy="578" rx="120" ry="16" fill="#1B2430" opacity=".18"></ellipse><path d="M660 548 C700 560 728 552 740 540" stroke="#8F7C68" strokeWidth="20" fill="none" strokeLinecap="round"></path><ellipse cx="600" cy="494" rx="74" ry="82" fill="#8F7C68"></ellipse><ellipse cx="600" cy="512" rx="42" ry="56" fill="#B3A08A"></ellipse><rect x="563" y="520" width="28" height="64" rx="14" fill="#8F7C68"></rect><rect x="609" y="520" width="28" height="64" rx="14" fill="#8F7C68"></rect><ellipse cx="577" cy="582" rx="20" ry="10" fill="#B3A08A"></ellipse><ellipse cx="623" cy="582" rx="20" ry="10" fill="#B3A08A"></ellipse><circle cx="600" cy="388" r="64" fill="#8F7C68"></circle><ellipse cx="540" cy="398" rx="20" ry="46" fill="#6E5A47" transform="rotate(10 540 398)"></ellipse><ellipse cx="660" cy="398" rx="20" ry="46" fill="#6E5A47" transform="rotate(-10 660 398)"></ellipse><ellipse cx="600" cy="416" rx="32" ry="24" fill="#B3A08A"></ellipse><ellipse cx="600" cy="402" rx="11" ry="8" fill="#2E2218"></ellipse><path d="M566 380 q10 6 20 0" stroke="#2E2218" strokeWidth="6" fill="none" strokeLinecap="round"></path><path d="M614 380 q10 6 20 0" stroke="#2E2218" strokeWidth="6" fill="none" strokeLinecap="round"></path><path d="M590 428 q10 -6 20 0" stroke="#2E2218" strokeWidth="4" fill="none" strokeLinecap="round"></path><g fill="#5E4630" opacity=".85"><ellipse cx="560" cy="470" rx="16" ry="11"></ellipse><ellipse cx="640" cy="520" rx="13" ry="9"></ellipse><ellipse cx="582" cy="574" rx="14" ry="7"></ellipse><ellipse cx="630" cy="350" rx="10" ry="7"></ellipse><ellipse cx="575" cy="420" rx="7" ry="5"></ellipse></g><g stroke="#5C4A39" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".8"><path d="M548 330 l8 -10 l6 10 l8 -12"></path><path d="M630 326 l6 -12 l8 10 l6 -10"></path><path d="M538 500 l10 -6 l-4 12 l10 -6"></path><path d="M652 470 l10 -4 l-4 12 l10 -4"></path></g>
      </svg></div>
                      <div style={sx("position: absolute; inset: 0; clip-path: inset(0 calc((1 - var(--wipe)) * 100%) 0 0)")}><svg viewBox="0 0 1200 620" style={sx("position: absolute; inset: 0; width: 100%; height: 100%; display: block")} aria-hidden="true"><defs><linearGradient id="c-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7CC4FF"></stop><stop offset="1" stopColor="#D8F0FF"></stop></linearGradient><radialGradient id="c-lawn" cx="45%" cy="10%" r="90%"><stop offset="0" stopColor="#9BE6AE"></stop><stop offset=".5" stopColor="#4CB873"></stop><stop offset="1" stopColor="#2B8A50"></stop></radialGradient><radialGradient id="c-sun" cx="40%" cy="35%" r="70%"><stop offset="0" stopColor="#FFF6C2"></stop><stop offset=".6" stopColor="#FFD447"></stop><stop offset="1" stopColor="#F5A70A"></stop></radialGradient><radialGradient id="c-ball" cx="35%" cy="30%" r="75%"><stop offset="0" stopColor="#F6FBA8"></stop><stop offset=".55" stopColor="#CADB2F"></stop><stop offset="1" stopColor="#7A9010"></stop></radialGradient></defs>
      <rect width="1200" height="620" fill="url(#c-sky)"></rect>
      <circle cx="1050" cy="110" r="84" fill="#FFE98A" opacity=".45"></circle><circle cx="1050" cy="110" r="58" fill="url(#c-sun)"></circle>
      <g fill="#FFFFFF"><ellipse cx="260" cy="110" rx="110" ry="36"></ellipse><ellipse cx="330" cy="90" rx="70" ry="40"></ellipse><ellipse cx="200" cy="96" rx="56" ry="32"></ellipse><ellipse cx="760" cy="80" rx="80" ry="26"></ellipse><ellipse cx="810" cy="66" rx="50" ry="28"></ellipse></g>
      <path d="M0 330 Q300 270 600 310 T1200 300 V620 H0Z" fill="#6CCB8B"></path>
      <path d="M-10 400 V342 L4 330 L18 342 V400 Z" fill="#FFFFFF"></path><path d="M34 400 V342 L48 330 L62 342 V400 Z" fill="#FFFFFF"></path><path d="M78 400 V342 L92 330 L106 342 V400 Z" fill="#FFFFFF"></path><path d="M122 400 V342 L136 330 L150 342 V400 Z" fill="#FFFFFF"></path><path d="M166 400 V342 L180 330 L194 342 V400 Z" fill="#FFFFFF"></path><path d="M210 400 V342 L224 330 L238 342 V400 Z" fill="#FFFFFF"></path><path d="M254 400 V342 L268 330 L282 342 V400 Z" fill="#FFFFFF"></path><path d="M298 400 V342 L312 330 L326 342 V400 Z" fill="#FFFFFF"></path><path d="M342 400 V342 L356 330 L370 342 V400 Z" fill="#FFFFFF"></path><path d="M386 400 V342 L400 330 L414 342 V400 Z" fill="#FFFFFF"></path><path d="M430 400 V342 L444 330 L458 342 V400 Z" fill="#FFFFFF"></path><path d="M474 400 V342 L488 330 L502 342 V400 Z" fill="#FFFFFF"></path><path d="M518 400 V342 L532 330 L546 342 V400 Z" fill="#FFFFFF"></path><path d="M562 400 V342 L576 330 L590 342 V400 Z" fill="#FFFFFF"></path><path d="M606 400 V342 L620 330 L634 342 V400 Z" fill="#FFFFFF"></path><path d="M650 400 V342 L664 330 L678 342 V400 Z" fill="#FFFFFF"></path><path d="M694 400 V342 L708 330 L722 342 V400 Z" fill="#FFFFFF"></path><path d="M738 400 V342 L752 330 L766 342 V400 Z" fill="#FFFFFF"></path><path d="M782 400 V342 L796 330 L810 342 V400 Z" fill="#FFFFFF"></path><path d="M826 400 V342 L840 330 L854 342 V400 Z" fill="#FFFFFF"></path><path d="M870 400 V342 L884 330 L898 342 V400 Z" fill="#FFFFFF"></path><path d="M914 400 V342 L928 330 L942 342 V400 Z" fill="#FFFFFF"></path><path d="M958 400 V342 L972 330 L986 342 V400 Z" fill="#FFFFFF"></path><path d="M1002 400 V342 L1016 330 L1030 342 V400 Z" fill="#FFFFFF"></path><path d="M1046 400 V342 L1060 330 L1074 342 V400 Z" fill="#FFFFFF"></path><path d="M1090 400 V342 L1104 330 L1118 342 V400 Z" fill="#FFFFFF"></path><path d="M1134 400 V342 L1148 330 L1162 342 V400 Z" fill="#FFFFFF"></path><path d="M1178 400 V342 L1192 330 L1206 342 V400 Z" fill="#FFFFFF"></path><rect x="0" y="348" width="1200" height="10" fill="#E7EDF3"></rect><rect x="0" y="378" width="1200" height="10" fill="#E7EDF3"></rect>
      <path d="M0 410 Q600 370 1200 410 V620 H0Z" fill="url(#c-lawn)"></path>
      <path d="M0 440 Q600 400 1200 440" stroke="#FFFFFF" strokeWidth="40" opacity=".08" fill="none"></path>
      <g stroke="#2E8A50" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".7"><path d="M90 520 l5 -14 l5 14"></path><path d="M250 600 l5 -14 l5 14"></path><path d="M520 470 l5 -14 l5 14"></path><path d="M880 600 l5 -14 l5 14"></path><path d="M1120 520 l5 -14 l5 14"></path></g>
      <path d="M200 510 V474" stroke="#2E8A50" strokeWidth="4"></path><ellipse cx="209" cy="496" rx="9" ry="4" fill="#2E8A50" transform="rotate(-30 209 496)"></ellipse><circle cx="200" cy="460" r="8" fill="#FF8FB0"></circle><circle cx="210" cy="467" r="8" fill="#FF8FB0"></circle><circle cx="206" cy="479" r="8" fill="#FF8FB0"></circle><circle cx="194" cy="479" r="8" fill="#FF8FB0"></circle><circle cx="190" cy="467" r="8" fill="#FF8FB0"></circle><circle cx="200" cy="470" r="6" fill="#FFD447"></circle><path d="M340 470 V434" stroke="#2E8A50" strokeWidth="4"></path><ellipse cx="349" cy="456" rx="9" ry="4" fill="#2E8A50" transform="rotate(-30 349 456)"></ellipse><circle cx="340" cy="420" r="8" fill="#FFFFFF"></circle><circle cx="350" cy="427" r="8" fill="#FFFFFF"></circle><circle cx="346" cy="439" r="8" fill="#FFFFFF"></circle><circle cx="334" cy="439" r="8" fill="#FFFFFF"></circle><circle cx="330" cy="427" r="8" fill="#FFFFFF"></circle><circle cx="340" cy="430" r="6" fill="#FFD447"></circle><path d="M460 580 V544" stroke="#2E8A50" strokeWidth="4"></path><ellipse cx="469" cy="566" rx="9" ry="4" fill="#2E8A50" transform="rotate(-30 469 566)"></ellipse><circle cx="460" cy="530" r="8" fill="#8FB8FF"></circle><circle cx="470" cy="537" r="8" fill="#8FB8FF"></circle><circle cx="466" cy="549" r="8" fill="#8FB8FF"></circle><circle cx="454" cy="549" r="8" fill="#8FB8FF"></circle><circle cx="450" cy="537" r="8" fill="#8FB8FF"></circle><circle cx="460" cy="540" r="6" fill="#FFD447"></circle><path d="M760 516 V480" stroke="#2E8A50" strokeWidth="4"></path><ellipse cx="769" cy="502" rx="9" ry="4" fill="#2E8A50" transform="rotate(-30 769 502)"></ellipse><circle cx="760" cy="466" r="8" fill="#FFFFFF"></circle><circle cx="770" cy="473" r="8" fill="#FFFFFF"></circle><circle cx="766" cy="485" r="8" fill="#FFFFFF"></circle><circle cx="754" cy="485" r="8" fill="#FFFFFF"></circle><circle cx="750" cy="473" r="8" fill="#FFFFFF"></circle><circle cx="760" cy="476" r="6" fill="#FFD447"></circle><path d="M990 590 V554" stroke="#2E8A50" strokeWidth="4"></path><ellipse cx="999" cy="576" rx="9" ry="4" fill="#2E8A50" transform="rotate(-30 999 576)"></ellipse><circle cx="990" cy="540" r="8" fill="#FF8FB0"></circle><circle cx="1000" cy="547" r="8" fill="#FF8FB0"></circle><circle cx="996" cy="559" r="8" fill="#FF8FB0"></circle><circle cx="984" cy="559" r="8" fill="#FF8FB0"></circle><circle cx="980" cy="547" r="8" fill="#FF8FB0"></circle><circle cx="990" cy="550" r="6" fill="#FFD447"></circle><path d="M110 480 V444" stroke="#2E8A50" strokeWidth="4"></path><ellipse cx="119" cy="466" rx="9" ry="4" fill="#2E8A50" transform="rotate(-30 119 466)"></ellipse><circle cx="110" cy="430" r="8" fill="#FFD447"></circle><circle cx="120" cy="437" r="8" fill="#FFD447"></circle><circle cx="116" cy="449" r="8" fill="#FFD447"></circle><circle cx="104" cy="449" r="8" fill="#FFD447"></circle><circle cx="100" cy="437" r="8" fill="#FFD447"></circle><circle cx="110" cy="440" r="6" fill="#FFD447"></circle>
      <defs><linearGradient id="dh-f-c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFD083"></stop><stop offset="1" stopColor="#F0913A"></stop></linearGradient><linearGradient id="dh-s-c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#D9822F"></stop><stop offset="1" stopColor="#A3521A"></stop></linearGradient><linearGradient id="dh-r-c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F56E5E"></stop><stop offset="1" stopColor="#B5372E"></stop></linearGradient></defs>
      <g transform="translate(860 330) scale(1.15)"><ellipse cx="100" cy="174" rx="100" ry="14" fill="#1B2430" opacity=".18"></ellipse><polygon points="120,72 178,52 178,150 120,170" fill="url(#dh-s-c)"></polygon><polygon points="22,72 70,24 120,72 120,170 22,170" fill="url(#dh-f-c)"></polygon><polygon points="70,14 128,-6 192,50 134,74" fill="url(#dh-r-c)"></polygon><polygon points="70,14 134,74 131,82 70,23" fill="#9A2C24"></polygon><polygon points="4,82 70,14 70,23 14,90" fill="#F98576"></polygon><path d="M48 170 V128 a22 22 0 0 1 44 0 V170 Z" fill="#4A2614"></path><rect x="54" y="92" width="34" height="12" rx="4" fill="#FFF3DD"></rect></g>
      <g transform="translate(720 540)"><ellipse cx="0" cy="24" rx="44" ry="8" fill="#1B2430" opacity=".15"></ellipse><path d="M-42 0 Q0 34 42 0 L36 -14 L-36 -14 Z" fill="#2F6FD0"></path><ellipse cx="0" cy="-14" rx="36" ry="8" fill="#9CC8FF"></ellipse><ellipse cx="-12" cy="-6" rx="16" ry="4" fill="#FFFFFF" opacity=".5"></ellipse></g>
      <g transform="translate(380 540)"><ellipse cx="0" cy="34" rx="30" ry="6" fill="#1B2430" opacity=".18"></ellipse><circle cx="0" cy="0" r="30" fill="url(#c-ball)"></circle><path d="M-26 -10c12 4 16 16 12 32" stroke="#FFFFFF" strokeWidth="4" fill="none" strokeLinecap="round"></path><path d="M26 10c-12 -4 -16 -16 -12 -32" stroke="#FFFFFF" strokeWidth="4" fill="none" strokeLinecap="round"></path></g>
      <ellipse cx="600" cy="578" rx="120" ry="16" fill="#1B2430" opacity=".18"></ellipse><path d="M660 540 C720 530 735 470 712 440" stroke="#F2C27B" strokeWidth="22" fill="none" strokeLinecap="round"></path><ellipse cx="600" cy="494" rx="74" ry="82" fill="#F2C27B"></ellipse><ellipse cx="600" cy="512" rx="42" ry="56" fill="#FFE4B5"></ellipse><rect x="563" y="520" width="28" height="64" rx="14" fill="#F2C27B"></rect><rect x="609" y="520" width="28" height="64" rx="14" fill="#F2C27B"></rect><ellipse cx="577" cy="582" rx="20" ry="10" fill="#FFE4B5"></ellipse><ellipse cx="623" cy="582" rx="20" ry="10" fill="#FFE4B5"></ellipse><rect x="548" y="436" width="104" height="18" rx="9" fill="#C2415B"></rect><circle cx="600" cy="466" r="12" fill="#FFD447" stroke="#D8A400" strokeWidth="3"></circle><circle cx="600" cy="388" r="64" fill="#F2C27B"></circle><ellipse cx="545" cy="352" rx="22" ry="44" fill="#D9964A" transform="rotate(24 545 352)"></ellipse><ellipse cx="655" cy="352" rx="22" ry="44" fill="#D9964A" transform="rotate(-24 655 352)"></ellipse><ellipse cx="575" cy="350" rx="22" ry="12" fill="#FFFFFF" opacity=".35" transform="rotate(-20 575 350)"></ellipse><ellipse cx="600" cy="416" rx="32" ry="24" fill="#FFE4B5"></ellipse><ellipse cx="600" cy="402" rx="11" ry="8" fill="#3B2414"></ellipse><path d="M566 378 q10 -12 20 0" stroke="#3B2414" strokeWidth="6" fill="none" strokeLinecap="round"></path><path d="M614 378 q10 -12 20 0" stroke="#3B2414" strokeWidth="6" fill="none" strokeLinecap="round"></path><path d="M586 422 q14 12 28 0" stroke="#3B2414" strokeWidth="4" fill="none" strokeLinecap="round"></path><path d="M592 426 q8 22 16 0 Z" fill="#F0607E"></path><circle cx="556" cy="404" r="9" fill="#F59AB0" opacity=".55"></circle><circle cx="644" cy="404" r="9" fill="#F59AB0" opacity=".55"></circle>
      <g fill="#FFFFFF"><path className="pk-twinkle" d="M520 300 l6 16 l16 6 l-16 6 l-6 16 l-6 -16 l-16 -6 l16 -6 Z"></path><path className="pk-twinkle pk-d2" d="M700 320 l4 11 l11 4 l-11 4 l-4 11 l-4 -11 l-11 -4 l11 -4 Z"></path><path className="pk-twinkle pk-d4" d="M680 460 l5 13 l13 5 l-13 5 l-5 13 l-5 -13 l-13 -5 l13 -5 Z"></path><path className="pk-twinkle pk-d3" d="M500 450 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 Z"></path></g>
      </svg></div>
                      <div className="pk-wipe" aria-hidden="true" style={sx("position: absolute; top: 0; bottom: 0; left: 0; width: 4px; margin-left: -2px; background: #FFFFFF; box-shadow: 0 0 24px rgba(255,255,255,.9); transform: translateX(calc(var(--wipe) * var(--sceneW, 900px))); opacity: var(--wipeOp)")}></div>
                      <div style={sx(`position: absolute; left: 56%; top: 52%; width: 9%; transition: opacity .7s ease, transform .9s cubic-bezier(.16,1,.3,1); ${v.s2}`)}><div className="pk-bubbles"><svg width="100%" height="100%" viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="gS-bub" cx="35%" cy="30%" r="70%"><stop offset="0" stopColor="#FFFFFF" stopOpacity=".95"></stop><stop offset=".45" stopColor="#FAD4DC" stopOpacity=".9"></stop><stop offset="1" stopColor="#C2415B"></stop></radialGradient></defs><circle cx="40" cy="60" r="32" fill="url(#gS-bub)"></circle><circle cx="74" cy="30" r="20" fill="url(#gS-bub)"></circle><circle cx="80" cy="78" r="13" fill="url(#gS-bub)"></circle></svg></div></div>
                      <div style={sx(`position: absolute; left: 37%; top: 46%; width: 6%; transition: opacity .7s ease, transform .9s cubic-bezier(.16,1,.3,1); ${v.s2}`)}><div className="pk-bubbles pk-d3"><svg width="100%" height="100%" viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="gS-bub2" cx="35%" cy="30%" r="70%"><stop offset="0" stopColor="#FFFFFF" stopOpacity=".95"></stop><stop offset=".45" stopColor="#FAD4DC" stopOpacity=".9"></stop><stop offset="1" stopColor="#C2415B"></stop></radialGradient></defs><circle cx="40" cy="60" r="32" fill="url(#gS-bub2)"></circle><circle cx="74" cy="30" r="20" fill="url(#gS-bub2)"></circle><circle cx="80" cy="78" r="13" fill="url(#gS-bub2)"></circle></svg></div></div>
                      <div style={sx(`position: absolute; left: 56%; top: 44%; width: 7%; transition: opacity .7s ease, transform .9s cubic-bezier(.16,1,.3,1); ${v.s3}`)}><div className="pk-beat"><svg width="100%" height="100%" viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="gS-heart" cx="32%" cy="28%" r="80%"><stop offset="0" stopColor="#FFC2CE"></stop><stop offset=".5" stopColor="#D8576F"></stop><stop offset="1" stopColor="#9E2F45"></stop></radialGradient></defs><path d="M50 88C20 68 6 52 6 34 6 19 18 8 32 8c8 0 14 4 18 11 4-7 10-11 18-11 14 0 26 11 26 26 0 18-14 34-44 54z" fill="url(#gS-heart)"></path><rect x="44" y="28" width="12" height="34" rx="4" fill="#FFFFFF"></rect><rect x="33" y="39" width="34" height="12" rx="4" fill="#FFFFFF"></rect></svg></div></div>
                      <div style={sx(`position: absolute; left: 22%; top: 74%; width: 7%; transition: opacity .7s ease, transform .9s cubic-bezier(.16,1,.3,1); ${v.s4}`)}><div className="pk-hop"><svg width="100%" height="100%" viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="gS-ball" cx="35%" cy="30%" r="75%"><stop offset="0" stopColor="#F6FBA8"></stop><stop offset=".55" stopColor="#CADB2F"></stop><stop offset="1" stopColor="#7A9010"></stop></radialGradient></defs><circle cx="50" cy="50" r="44" fill="url(#gS-ball)"></circle><path d="M14 32c18 6 24 24 18 48" stroke="#FFFFFF" strokeWidth="5" fill="none" strokeLinecap="round"></path><path d="M86 68c-18-6-24-24-18-48" stroke="#FFFFFF" strokeWidth="5" fill="none" strokeLinecap="round"></path></svg></div></div>
                    </div>
                    <div aria-hidden="true" style={sx("position: absolute; inset: 0; pointer-events: none; background: radial-gradient(120% 90% at 50% 45%, rgba(0,0,0,0) 55%, rgba(20,16,24,.28) 100%)")}></div>
                    <div aria-hidden="true" style={sx("position: absolute; inset: 0; pointer-events: none; mix-blend-mode: soft-light; background: linear-gradient(120deg, rgba(255,255,255,.35), rgba(255,255,255,0) 40%)")}></div>

                    <div style={sx(`position: absolute; left: 3%; top: 5%; display: flex; align-items: center; gap: 10px; padding: 10px 14px 10px 10px; border-radius: 16px; background: #FFFFFF; box-shadow: 0 20px 30px -16px rgba(0,0,0,.45); transition: opacity .6s ease, transform .8s cubic-bezier(.16,1,.3,1); ${v.s1}`)}>
                      <span aria-hidden="true" style={sx("width: 38px; height: 38px; border-radius: 12px; background: #C2415B; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-family: 'Unbounded', 'Manrope', sans-serif; font-weight: 700; font-size: 13px")}>JR</span>
                      <span style={sx("font-size: 13px; line-height: 1.35")}><strong>Jamie is scooping</strong><br />{v.scoopStatus}</span>
                    </div>

                    <div style={sx(`position: absolute; right: 3%; top: 5%; width: min(250px, 42%); padding: 16px; border-radius: 18px; background: #FFFFFF; box-shadow: 0 24px 40px -20px rgba(0,0,0,.5); transition: opacity .6s ease, transform .8s cubic-bezier(.16,1,.3,1); ${v.cardVis}`)}>
                      <p style={sx("margin: 0; font-size: 12px; font-weight: 800; color: #C2415B")}>{v.cardKicker}</p>
                      <p style={sx("margin: 4px 0 0; font-family: 'Unbounded', 'Manrope', sans-serif; font-weight: 600; font-size: 16px")}>{v.cardTitle}</p>
                      <div style={sx("margin-top: 10px; display: flex; flex-direction: column; gap: 6px")}>
                        {(v.cardItems || []).map((it, it_i) => (<React.Fragment key={it_i}>
                          <div style={sx(`display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; ${it.look}`)}><span aria-hidden="true" style={sx("position: relative; flex: none; width: 20px; height: 20px; border-radius: 7px; display: flex; align-items: center; justify-content: center; background: #D9D3D6; overflow: hidden")}><span style={sx(`position: absolute; inset: 0; background: #C2415B; ${it.box}`)}></span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" style={sx("position: relative")}><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg></span>{it.text}</div>
                        </React.Fragment>))}
                      </div>
                    </div>

                    <div style={sx(`position: absolute; left: 50%; bottom: 5%; width: min(400px, 86%); padding: 18px 20px; border-radius: 20px; background: #232326; color: #FFFFFF; box-shadow: 0 30px 50px -20px rgba(0,0,0,.6); transition: opacity .7s ease, transform .9s cubic-bezier(.16,1,.3,1); ${v.s5}`)}>
                      <p style={sx("margin: 0; font-size: 12px; font-weight: 800; color: #F4C7CF")}>{v.planTitle}</p>
                      <div style={sx("margin-top: 10px; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px")}>
                        <span style={sx("padding: 8px 6px; border-radius: 9px; background: rgba(255,255,255,.1); font-size: 11px; font-weight: 800; text-align: center")}>{v.scoopShort}</span><span style={sx("padding: 8px 6px; border-radius: 9px; background: rgba(255,255,255,.1); font-size: 11px; font-weight: 800; text-align: center")}>Grooming</span><span style={sx("padding: 8px 6px; border-radius: 9px; background: rgba(255,255,255,.1); font-size: 11px; font-weight: 800; text-align: center")}>Vet</span><span style={sx("padding: 8px 6px; border-radius: 9px; background: rgba(255,255,255,.1); font-size: 11px; font-weight: 800; text-align: center")}>Training</span>
                      </div>
                      <div style={sx("margin-top: 12px; display: flex; align-items: baseline; justify-content: space-between; gap: 10px")}><span style={sx("font-size: 13px; color: #D8D5DA")}>One caretaker, one bill</span><span style={sx("font-family: 'Unbounded', 'Manrope', sans-serif; font-weight: 700; font-size: 22px")}>from $79/mo</span></div>
                    </div>

                    <span style={sx(`position: absolute; right: 14px; bottom: 14px; padding: 6px 12px; border-radius: 9px; background: rgba(35,35,38,.75); color: #FFFFFF; font-size: 12px; font-weight: 800; transition: opacity .4s ease; ${v.tagVis}`)}>{v.storyTag}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Plan builder */}
        <section id="plan" style={sx("background: #FBE9EC")}>
          <div style={sx("max-width: 1280px; margin: 0 auto; padding: 90px 24px")}>
            <h2 className="pk-reveal" style={sx("margin: 0; font-family: 'Unbounded', 'Manrope', sans-serif; font-weight: 700; font-size: clamp(32px, 3.6vw, 50px); letter-spacing: -1.6px; line-height: 1.05")}>{v.planTitle}</h2>
            <p style={sx("margin: 14px 0 0; font-size: 17px; line-height: 1.55; color: #4B4A50")}>Only pay for what you use. Change or pause anytime.</p>
            <div className="bento" style={sx("margin-top: 40px; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 16px; align-items: start")}>
              <div style={sx("grid-column: span 7; border-radius: 28px; background: #FFFFFF; padding: 34px; display: flex; flex-direction: column; gap: 30px")}>
                <fieldset style={sx("border: none; margin: 0; padding: 0")}><legend style={sx("padding: 0; font-family: 'Unbounded', 'Manrope', sans-serif; font-weight: 600; font-size: 17px; display: flex; align-items: center; gap: 10px")}><span aria-hidden="true" style={sx("width: 12px; height: 12px; border-radius: 4px; background: #C2415B")}></span>Yard scooping</legend><div style={sx("margin-top: 14px; display: flex; flex-wrap: wrap; gap: 8px")}>
                      {(v.scoopOpts || []).map((opt, opt_i) => (<React.Fragment key={opt_i}>
                        {opt.on ? (<><button type="button" aria-pressed="true" onClick={opt.pick} style={sx("min-height: 46px; padding: 0 18px; border-radius: 12px; border: 1.5px solid #232326; background: #232326; color: #FFFFFF; font-size: 15px; font-weight: 700; cursor: pointer")}>{opt.label}</button></>) : null}
                        {opt.off ? (<><button type="button" aria-pressed="false" onClick={opt.pick} style={sx("min-height: 46px; padding: 0 18px; border-radius: 12px; border: 1.5px solid #ECE7E9; background: #FFFFFF; color: #232326; font-size: 15px; font-weight: 700; cursor: pointer")}>{opt.label}</button></>) : null}
                      </React.Fragment>))}
                    </div></fieldset>
                <fieldset style={sx("border: none; margin: 0; padding: 0")}><legend style={sx("padding: 0; font-family: 'Unbounded', 'Manrope', sans-serif; font-weight: 600; font-size: 17px; display: flex; align-items: center; gap: 10px")}><span aria-hidden="true" style={sx("width: 12px; height: 12px; border-radius: 4px; background: #232326")}></span>How many pets?</legend><div style={sx("margin-top: 14px; display: flex; flex-wrap: wrap; gap: 8px")}>
                      {(v.petOpts || []).map((opt, opt_i) => (<React.Fragment key={opt_i}>
                        {opt.on ? (<><button type="button" aria-pressed="true" onClick={opt.pick} style={sx("min-width: 56px; min-height: 46px; padding: 0 18px; border-radius: 12px; border: 1.5px solid #232326; background: #232326; color: #FFFFFF; font-size: 15px; font-weight: 700; cursor: pointer")}>{opt.label}</button></>) : null}
                        {opt.off ? (<><button type="button" aria-pressed="false" onClick={opt.pick} style={sx("min-width: 56px; min-height: 46px; padding: 0 18px; border-radius: 12px; border: 1.5px solid #ECE7E9; background: #FFFFFF; color: #232326; font-size: 15px; font-weight: 700; cursor: pointer")}>{opt.label}</button></>) : null}
                      </React.Fragment>))}
                    </div></fieldset>
                <fieldset style={sx("border: none; margin: 0; padding: 0")}><legend style={sx("padding: 0; font-family: 'Unbounded', 'Manrope', sans-serif; font-weight: 600; font-size: 17px; display: flex; align-items: center; gap: 10px")}><span aria-hidden="true" style={sx("width: 12px; height: 12px; border-radius: 4px; background: #F4C7CF")}></span>Grooming</legend><div style={sx("margin-top: 14px; display: flex; flex-wrap: wrap; gap: 8px")}>
                      {(v.groomOpts || []).map((opt, opt_i) => (<React.Fragment key={opt_i}>
                        {opt.on ? (<><button type="button" aria-pressed="true" onClick={opt.pick} style={sx("min-height: 46px; padding: 0 18px; border-radius: 12px; border: 1.5px solid #232326; background: #232326; color: #FFFFFF; font-size: 15px; font-weight: 700; cursor: pointer")}>{opt.label}</button></>) : null}
                        {opt.off ? (<><button type="button" aria-pressed="false" onClick={opt.pick} style={sx("min-height: 46px; padding: 0 18px; border-radius: 12px; border: 1.5px solid #ECE7E9; background: #FFFFFF; color: #232326; font-size: 15px; font-weight: 700; cursor: pointer")}>{opt.label}</button></>) : null}
                      </React.Fragment>))}
                    </div></fieldset>
                <div style={sx("display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 30px")}>
                  <fieldset style={sx("border: none; margin: 0; padding: 0")}><legend style={sx("padding: 0; font-family: 'Unbounded', 'Manrope', sans-serif; font-weight: 600; font-size: 17px; display: flex; align-items: center; gap: 10px")}><span aria-hidden="true" style={sx("width: 12px; height: 12px; border-radius: 4px; background: #D8576F")}></span>Home vet visits</legend><p style={sx("margin: 6px 0 0; font-size: 14px; color: #5E5C63")}>Quarterly check-up plus vet chat</p><div style={sx("margin-top: 14px; display: flex; flex-wrap: wrap; gap: 8px")}>
                      {(v.vetOpts || []).map((opt, opt_i) => (<React.Fragment key={opt_i}>
                        {opt.on ? (<><button type="button" aria-pressed="true" onClick={opt.pick} style={sx("min-height: 46px; padding: 0 18px; border-radius: 12px; border: 1.5px solid #232326; background: #232326; color: #FFFFFF; font-size: 15px; font-weight: 700; cursor: pointer")}>{opt.label}</button></>) : null}
                        {opt.off ? (<><button type="button" aria-pressed="false" onClick={opt.pick} style={sx("min-height: 46px; padding: 0 18px; border-radius: 12px; border: 1.5px solid #ECE7E9; background: #FFFFFF; color: #232326; font-size: 15px; font-weight: 700; cursor: pointer")}>{opt.label}</button></>) : null}
                      </React.Fragment>))}
                    </div></fieldset>
                  <fieldset style={sx("border: none; margin: 0; padding: 0")}><legend style={sx("padding: 0; font-family: 'Unbounded', 'Manrope', sans-serif; font-weight: 600; font-size: 17px; display: flex; align-items: center; gap: 10px")}><span aria-hidden="true" style={sx("width: 12px; height: 12px; border-radius: 4px; background: #E0BE3A")}></span>Training</legend><p style={sx("margin: 6px 0 0; font-size: 14px; color: #5E5C63")}>Two one-hour sessions a month</p><div style={sx("margin-top: 14px; display: flex; flex-wrap: wrap; gap: 8px")}>
                      {(v.trainOpts || []).map((opt, opt_i) => (<React.Fragment key={opt_i}>
                        {opt.on ? (<><button type="button" aria-pressed="true" onClick={opt.pick} style={sx("min-height: 46px; padding: 0 18px; border-radius: 12px; border: 1.5px solid #232326; background: #232326; color: #FFFFFF; font-size: 15px; font-weight: 700; cursor: pointer")}>{opt.label}</button></>) : null}
                        {opt.off ? (<><button type="button" aria-pressed="false" onClick={opt.pick} style={sx("min-height: 46px; padding: 0 18px; border-radius: 12px; border: 1.5px solid #ECE7E9; background: #FFFFFF; color: #232326; font-size: 15px; font-weight: 700; cursor: pointer")}>{opt.label}</button></>) : null}
                      </React.Fragment>))}
                    </div></fieldset>
                </div>
              </div>
              <aside aria-label="Your plan" style={sx("grid-column: span 5; position: relative; border-radius: 28px; background: #232326; color: #FFFFFF; padding: 32px 30px")}>
                <span aria-hidden="true" style={sx("position: absolute; left: -14px; top: 178px; width: 28px; height: 28px; border-radius: 50%; background: #FBE9EC")}></span>
                <span aria-hidden="true" style={sx("position: absolute; right: -14px; top: 178px; width: 28px; height: 28px; border-radius: 50%; background: #FBE9EC")}></span>
                <p style={sx("margin: 0; font-size: 13px; font-weight: 800; color: #F4C7CF")}>Your monthly plan</p>
                <p style={sx("margin: 10px 0 0; font-family: 'Unbounded', 'Manrope', sans-serif; font-weight: 700; font-size: 64px; letter-spacing: -2.5px; line-height: 1")}>{v.total}</p>
                <p style={sx("margin: 8px 0 0; font-size: 14px; color: #D8D5DA")}>per month, billed after your first visit</p>
                <div aria-hidden="true" style={sx("margin: 26px 0 20px; border-top: 2px dashed rgba(255,255,255,.2)")}></div>
                <div style={sx("display: flex; flex-direction: column; gap: 12px; min-height: 110px")}>
                  {v.noLines ? (<><p style={sx("margin: 0; font-size: 15px; color: #D8D5DA")}>Pick at least one service to see your price.</p></>) : null}
                  {(v.lines || []).map((line, line_i) => (<React.Fragment key={line_i}>
                    <div style={sx("display: flex; justify-content: space-between; gap: 16px; font-size: 15px")}><span style={sx("color: #E7E4E9")}>{line.name}</span><span style={sx("font-weight: 800")}>{line.price}</span></div>
                  </React.Fragment>))}
                </div>
                <button type="button" style={sx(`margin-top: 26px; width: 100%; min-height: 58px; border: none; border-radius: 16px; background: ${v.primary}; color: #FFFFFF; font-size: 16px; font-weight: 800; cursor: pointer`)}>{v.ctaLabel}</button>
              </aside>
            </div>
          </div>
        </section>

        {/* Why PawKeep */}
        <section id="why" style={sx("max-width: 1280px; margin: 0 auto; padding: 80px 24px")}>
          <h2 className="pk-reveal" style={sx("margin: 0; font-family: 'Unbounded', 'Manrope', sans-serif; font-weight: 700; font-size: clamp(32px, 3.6vw, 50px); letter-spacing: -1.6px; line-height: 1.05; max-width: 18ch")}>Booking apps find you a sitter. We give you a caretaker.</h2>
          <div className="bento" style={sx("margin-top: 40px; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 16px; align-items: stretch")}>
            <div style={sx("grid-column: span 5; border-radius: 28px; background: #F6F4F5; padding: 32px")}>
              <p style={sx("margin: 0; font-family: 'Unbounded', 'Manrope', sans-serif; font-weight: 500; font-size: 19px; color: #5E5C63")}>Typical sitter booking apps</p>
              <ul style={sx("margin: 18px 0 0; padding: 0; list-style: none")}><li style={sx("display: flex; gap: 12px; align-items: flex-start; padding: 14px 0; border-bottom: 1px solid #ECE7E9; font-size: 16px; color: #5E5C63")}><span aria-hidden="true" style={sx("flex: none; width: 20px; text-align: center; font-weight: 800; color: #9A979E")}>–</span>Whoever is free that day</li><li style={sx("display: flex; gap: 12px; align-items: flex-start; padding: 14px 0; border-bottom: 1px solid #ECE7E9; font-size: 16px; color: #5E5C63")}><span aria-hidden="true" style={sx("flex: none; width: 20px; text-align: center; font-weight: 800; color: #9A979E")}>–</span>Search and book every time</li><li style={sx("display: flex; gap: 12px; align-items: flex-start; padding: 14px 0; border-bottom: 1px solid #ECE7E9; font-size: 16px; color: #5E5C63")}><span aria-hidden="true" style={sx("flex: none; width: 20px; text-align: center; font-weight: 800; color: #9A979E")}>–</span>Not usually offered</li><li style={sx("display: flex; gap: 12px; align-items: flex-start; padding: 14px 0; border-bottom: 1px solid #ECE7E9; font-size: 16px; color: #5E5C63")}><span aria-hidden="true" style={sx("flex: none; width: 20px; text-align: center; font-weight: 800; color: #9A979E")}>–</span>Not usually offered</li><li style={sx("display: flex; gap: 12px; align-items: flex-start; padding: 14px 0; border-bottom: 1px solid #ECE7E9; font-size: 16px; color: #5E5C63")}><span aria-hidden="true" style={sx("flex: none; width: 20px; text-align: center; font-weight: 800; color: #9A979E")}>–</span>Not usually offered</li><li style={sx("display: flex; gap: 12px; align-items: flex-start; padding: 14px 0; border-bottom: 1px solid #ECE7E9; font-size: 16px; color: #5E5C63")}><span aria-hidden="true" style={sx("flex: none; width: 20px; text-align: center; font-weight: 800; color: #9A979E")}>–</span>Pay per booking</li></ul>
            </div>
            <div style={sx("grid-column: span 7; border-radius: 28px; background: #232326; color: #FFFFFF; padding: 32px; position: relative; overflow: hidden")}>
              <div aria-hidden="true" style={sx("position: absolute; width: 340px; height: 340px; right: -100px; top: -120px; border-radius: 50%; background: #C2415B; filter: blur(90px); opacity: .55")}></div>
              <p style={sx("position: relative; margin: 0; font-family: 'Unbounded', 'Manrope', sans-serif; font-weight: 700; font-size: 22px")}>PawKeep</p>
              <ul style={sx("position: relative; margin: 18px 0 0; padding: 0; list-style: none")}><li style={sx("display: flex; gap: 12px; align-items: flex-start; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,.12); font-size: 16px; font-weight: 600")}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4C7CF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={sx("flex: none")}><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>The same caretaker every visit</li><li style={sx("display: flex; gap: 12px; align-items: flex-start; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,.12); font-size: 16px; font-weight: 600")}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4C7CF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={sx("flex: none")}><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>Set once, repeats on its own</li><li style={sx("display: flex; gap: 12px; align-items: flex-start; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,.12); font-size: 16px; font-weight: 600")}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4C7CF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={sx("flex: none")}><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>Yard scooping included</li><li style={sx("display: flex; gap: 12px; align-items: flex-start; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,.12); font-size: 16px; font-weight: 600")}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4C7CF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={sx("flex: none")}><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>Home visits from licensed partner vets</li><li style={sx("display: flex; gap: 12px; align-items: flex-start; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,.12); font-size: 16px; font-weight: 600")}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4C7CF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={sx("flex: none")}><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>Farewell care and grief support</li><li style={sx("display: flex; gap: 12px; align-items: flex-start; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,.12); font-size: 16px; font-weight: 600")}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4C7CF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={sx("flex: none")}><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>One monthly bill for everything</li></ul>
              <div style={sx("position: relative; margin-top: 22px; display: flex; flex-wrap: wrap; align-items: center; gap: 14px; padding: 16px 18px; border-radius: 16px; background: rgba(255,255,255,.08)")}>
                <p style={sx("margin: 0; flex: 1 1 260px; font-size: 15px; line-height: 1.5")}><strong>The PawKeep promise.</strong> If a visit isn’t right, we come back within 24 hours and redo it, free.</p>
                <a href="#plan" style={sx("text-decoration: none; display: inline-flex; align-items: center; min-height: 46px; padding: 0 18px; border-radius: 14px; background: #F4C7CF; color: #232326; font-weight: 800; font-size: 14px")}>Start my plan</a>
              </div>
            </div>
          </div>
        </section>

        {/* Communities */}
        <section id="communities" style={sx("max-width: 1280px; margin: 0 auto; padding: 90px 24px")}>
          <div style={sx("border-radius: 32px; background: #232326; color: #FFFFFF; padding: clamp(28px, 4vw, 56px); display: flex; flex-wrap: wrap; gap: 40px; align-items: center; position: relative; overflow: hidden")}>
            <div aria-hidden="true" style={sx("position: absolute; width: 420px; height: 420px; left: -140px; bottom: -220px; border-radius: 50%; background: #C2415B; filter: blur(100px); opacity: .45")}></div>
            <div style={sx("position: relative; flex: 1 1 400px; min-width: 0")}>
              <h2 className="pk-reveal" style={sx("margin: 0; font-family: 'Unbounded', 'Manrope', sans-serif; font-weight: 700; font-size: clamp(30px, 3.2vw, 44px); letter-spacing: -1.4px; line-height: 1.06; max-width: 16ch")}>Run an HOA or apartment community?</h2>
              <p style={sx("margin: 16px 0 0; font-size: 17px; line-height: 1.6; color: #D8D5DA; max-width: 30em")}>Clean common areas, stocked pet waste stations, resident discounts on every service, and one monthly invoice with visit reports.</p>
            </div>
            <form onSubmit={v.noSubmit} style={sx("position: relative; flex: 1 1 380px; min-width: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px")}>
              <div style={sx("grid-column: span 2; display: flex; flex-direction: column; gap: 6px")}><label htmlFor="c-prop" style={sx("font-size: 14px; font-weight: 700")}>Community or property name</label><input id="c-prop" style={sx("min-height: 50px; padding: 0 14px; border-radius: 12px; border: none; background: #FFFFFF; font-size: 16px; color: #232326")} /></div>
              <div style={sx("display: flex; flex-direction: column; gap: 6px")}><label htmlFor="c-units" style={sx("font-size: 14px; font-weight: 700")}>Homes or units</label><input id="c-units" inputMode="numeric" style={sx("min-height: 50px; padding: 0 14px; border-radius: 12px; border: none; background: #FFFFFF; font-size: 16px; color: #232326")} /></div>
              <div style={sx("display: flex; flex-direction: column; gap: 6px")}><label htmlFor="c-zip" style={sx("font-size: 14px; font-weight: 700")}>ZIP code</label><input id="c-zip" inputMode="numeric" maxLength="5" style={sx("min-height: 50px; padding: 0 14px; border-radius: 12px; border: none; background: #FFFFFF; font-size: 16px; color: #232326")} /></div>
              <div style={sx("grid-column: span 2; display: flex; flex-direction: column; gap: 6px")}><label htmlFor="c-email" style={sx("font-size: 14px; font-weight: 700")}>Work email</label><input id="c-email" type="email" autoComplete="email" style={sx("min-height: 50px; padding: 0 14px; border-radius: 12px; border: none; background: #FFFFFF; font-size: 16px; color: #232326")} /></div>
              <button type="submit" style={sx("grid-column: span 2; min-height: 54px; border: none; border-radius: 14px; background: #F4C7CF; color: #232326; font-size: 16px; font-weight: 800; cursor: pointer")}>Request a community quote</button>
            </form>
          </div>
        </section>

        {/* Farewell care */}
        <section id="farewell" style={sx("background: #F4EFF2")}>
          <div style={sx("max-width: 1000px; margin: 0 auto; padding: 110px 24px; text-align: center")}>
            <h2 style={sx("margin: 0; font-family: 'Unbounded', 'Manrope', sans-serif; font-weight: 400; font-size: clamp(28px, 3vw, 40px); letter-spacing: -0.8px; line-height: 1.2; color: #3E3540")}>When it’s time to say goodbye</h2>
            <p style={sx("margin: 20px auto 0; font-size: 18px; line-height: 1.75; color: #574D59; max-width: 36em")}>Losing a pet is one of the hardest things a family goes through. Our farewell care team handles every arrangement, gently and at your pace, so you can spend the time that matters with your pet.</p>
            <div style={sx("margin-top: 44px; display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; text-align: left")}><div style={sx("padding: 26px; border-radius: 20px; background: rgba(255,255,255,.6); border: 1px solid #E6DEE2")}><h3 style={sx("margin: 0; font-family: 'Unbounded', 'Manrope', sans-serif; font-weight: 500; font-size: 18px; color: #3E3540")}>Peaceful passing at home</h3><p style={sx("margin: 10px 0 0; font-size: 16px; line-height: 1.65; color: #574D59")}>A licensed partner vet comes to you, so your pet rests somewhere familiar.</p></div><div style={sx("padding: 26px; border-radius: 20px; background: rgba(255,255,255,.6); border: 1px solid #E6DEE2")}><h3 style={sx("margin: 0; font-family: 'Unbounded', 'Manrope', sans-serif; font-weight: 500; font-size: 18px; color: #3E3540")}>Aftercare, handled for you</h3><p style={sx("margin: 10px 0 0; font-size: 16px; line-height: 1.65; color: #574D59")}>Cremation or burial arranged with trusted local partners, returned with care.</p></div><div style={sx("padding: 26px; border-radius: 20px; background: rgba(255,255,255,.6); border: 1px solid #E6DEE2")}><h3 style={sx("margin: 0; font-family: 'Unbounded', 'Manrope', sans-serif; font-weight: 500; font-size: 18px; color: #3E3540")}>Keepsakes to remember them</h3><p style={sx("margin: 10px 0 0; font-size: 16px; line-height: 1.65; color: #574D59")}>A clay paw print, a lock of fur, or a framed portrait, when you’re ready.</p></div><div style={sx("padding: 26px; border-radius: 20px; background: rgba(255,255,255,.6); border: 1px solid #E6DEE2")}><h3 style={sx("margin: 0; font-family: 'Unbounded', 'Manrope', sans-serif; font-weight: 500; font-size: 18px; color: #3E3540")}>Grief support for your family</h3><p style={sx("margin: 10px 0 0; font-size: 16px; line-height: 1.65; color: #574D59")}>Sessions with a pet loss counselor for adults and children, for as long as it helps.</p></div></div>
            <div style={sx("margin-top: 36px; display: flex; flex-wrap: wrap; justify-content: center; gap: 12px")}>
              <a href="#farewell-talk" style={sx("text-decoration: none; display: inline-flex; align-items: center; min-height: 50px; padding: 0 22px; border-radius: 14px; background: #4A3F50; color: #FFFFFF; font-weight: 700")}>Talk with our care team</a>
              <a href="#farewell-plan" style={sx("text-decoration: none; display: inline-flex; align-items: center; min-height: 50px; padding: 0 22px; border-radius: 14px; border: 1.5px solid #9A8E9E; color: #3E3540; font-weight: 700")}>Plan ahead</a>
            </div>
            <p style={sx("margin: 18px 0 0; font-size: 15px; color: #6A5F6D")}>Call us any day at [YOUR PHONE NUMBER]</p>
          </div>
        </section>

        {/* FAQ */}
        <section style={sx("max-width: 1280px; margin: 0 auto; padding: 90px 24px; display: flex; flex-wrap: wrap; gap: 48px")}>
          <div style={sx("flex: 1 1 300px; min-width: 0")}>
            <h2 className="pk-reveal" style={sx("margin: 0; font-family: 'Unbounded', 'Manrope', sans-serif; font-weight: 700; font-size: clamp(32px, 3.6vw, 50px); letter-spacing: -1.6px; line-height: 1.05; max-width: 10ch")}>Questions, answered</h2>
            <p style={sx("margin: 16px 0 0; font-size: 16px; line-height: 1.6; color: #4B4A50")}>Something else? Email [YOUR EMAIL].</p>
          </div>
          <div style={sx("flex: 2 1 520px; min-width: 0; border-top: 1px solid #ECE7E9")}><details style={sx("border-bottom: 1px solid #ECE7E9")}><summary style={sx("display: flex; justify-content: space-between; align-items: center; gap: 16px; min-height: 72px; font-size: 18px; font-weight: 700")}>Do I need to be home for visits?<span className="faq-plus" aria-hidden="true" style={sx("flex: none; width: 36px; height: 36px; border-radius: 10px; background: #F6F4F5; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 500")}>+</span></summary><p style={sx("margin: 0 0 24px; font-size: 16px; line-height: 1.65; color: #4B4A50; max-width: 40em")}>Not for yard scooping. Leave a gate code and we’ll take care of it. For grooming, vet and training visits, an adult should be home.</p></details><details style={sx("border-bottom: 1px solid #ECE7E9")}><summary style={sx("display: flex; justify-content: space-between; align-items: center; gap: 16px; min-height: 72px; font-size: 18px; font-weight: 700")}>Can I change or pause my plan?<span className="faq-plus" aria-hidden="true" style={sx("flex: none; width: 36px; height: 36px; border-radius: 10px; background: #F6F4F5; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 500")}>+</span></summary><p style={sx("margin: 0 0 24px; font-size: 16px; line-height: 1.65; color: #4B4A50; max-width: 40em")}>Yes. Add or remove services, change frequency, or pause for vacations from the app. Changes apply from your next billing date.</p></details><details style={sx("border-bottom: 1px solid #ECE7E9")}><summary style={sx("display: flex; justify-content: space-between; align-items: center; gap: 16px; min-height: 72px; font-size: 18px; font-weight: 700")}>What if it rains or snows?<span className="faq-plus" aria-hidden="true" style={sx("flex: none; width: 36px; height: 36px; border-radius: 10px; background: #F6F4F5; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 500")}>+</span></summary><p style={sx("margin: 0 0 24px; font-size: 16px; line-height: 1.65; color: #4B4A50; max-width: 40em")}>We work in light rain. If weather makes a visit unsafe, we reschedule within two days and tell you first.</p></details><details style={sx("border-bottom: 1px solid #ECE7E9")}><summary style={sx("display: flex; justify-content: space-between; align-items: center; gap: 16px; min-height: 72px; font-size: 18px; font-weight: 700")}>Who provides the vet care?<span className="faq-plus" aria-hidden="true" style={sx("flex: none; width: 36px; height: 36px; border-radius: 10px; background: #F6F4F5; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 500")}>+</span></summary><p style={sx("margin: 0 0 24px; font-size: 16px; line-height: 1.65; color: #4B4A50; max-width: 40em")}>All medical care, including end-of-life care, comes from veterinarians licensed in your state who partner with PawKeep.</p></details><details style={sx("border-bottom: 1px solid #ECE7E9")}><summary style={sx("display: flex; justify-content: space-between; align-items: center; gap: 16px; min-height: 72px; font-size: 18px; font-weight: 700")}>Do I need a subscription to use farewell care?<span className="faq-plus" aria-hidden="true" style={sx("flex: none; width: 36px; height: 36px; border-radius: 10px; background: #F6F4F5; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 500")}>+</span></summary><p style={sx("margin: 0 0 24px; font-size: 16px; line-height: 1.65; color: #4B4A50; max-width: 40em")}>[Your policy here: for example, whether farewell care is open to every family or included for members.]</p></details></div>
        </section>

        {/* Final CTA */}
        <section style={sx("max-width: 1280px; margin: 0 auto; padding: 0 24px 90px")}>
          <div style={sx("position: relative; overflow: hidden; border-radius: 32px; background: #C2415B; color: #FFFFFF; padding: clamp(36px, 5vw, 72px); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 28px")}>
            <svg aria-hidden="true" width="340" height="340" viewBox="0 0 40 40" style={sx("position: absolute; right: -60px; top: -80px; opacity: .18")}><g fill="#FFFFFF"><ellipse cx="13" cy="15" rx="3" ry="3.8"></ellipse><ellipse cx="20" cy="12" rx="3" ry="3.8"></ellipse><ellipse cx="27" cy="15" rx="3" ry="3.8"></ellipse><path d="M20 19c-4.6 0-8 4.6-8 8 0 2.4 1.8 3.6 3.9 3.6 1.6 0 2.6-.9 4.1-.9s2.5.9 4.1.9c2.1 0 3.9-1.2 3.9-3.6 0-3.4-3.4-8-8-8z"></path></g></svg>
            <h2 style={sx("position: relative; margin: 0; font-family: 'Unbounded', 'Manrope', sans-serif; font-weight: 700; font-size: clamp(32px, 4vw, 56px); letter-spacing: -1.8px; line-height: 1.02; max-width: 14ch")}>A cleaner yard by next week.</h2>
            <a href="#plan" style={sx("position: relative; text-decoration: none; display: inline-flex; align-items: center; min-height: 60px; padding: 0 28px; border-radius: 14px; background: #FFFFFF; color: #232326; font-weight: 800; font-size: 17px")}>Start my plan</a>
          </div>
        </section>


        {v.showBar ? (<>
          <div className="pk-pop" style={sx("position: fixed; left: 50%; bottom: 18px; transform: translateX(-50%); z-index: 60; width: min(640px, calc(100% - 24px)); display: flex; align-items: center; gap: 14px; padding: 10px 10px 10px 18px; border-radius: 20px; background: #232326; color: #FFFFFF; box-shadow: 0 30px 60px -20px rgba(0,0,0,.55)")}>
            <span aria-hidden="true" style={sx("flex: none; width: 38px; height: 38px; border-radius: 12px; background: #F4C7CF; color: #232326; display: flex; align-items: center; justify-content: center; font-family: 'Unbounded', 'Manrope', sans-serif; font-weight: 700")}>{v.pickCount}</span>
            <p aria-live="polite" style={sx("margin: 0; flex: 1 1 auto; min-width: 0; font-size: 15px; line-height: 1.3")}><strong>{v.barTitle}</strong><br /><span style={sx("color: #D8D5DA")}>{v.total} a month</span></p>
            <a href="#plan" style={sx(`flex: none; text-decoration: none; display: inline-flex; align-items: center; min-height: 48px; padding: 0 18px; border-radius: 14px; background: ${v.primary}; color: #FFFFFF; font-weight: 800; font-size: 15px`)}>Review plan</a>
          </div>
        </>) : null}

        {/* Footer */}
        <footer style={sx("background: #232326; color: #D8D5DA")}>
          <div style={sx("max-width: 1280px; margin: 0 auto; padding: 56px 24px 36px; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 40px")}>
            <div style={sx("flex: 1 1 260px; min-width: 0")}><p style={sx("margin: 0; font-family: 'Unbounded', 'Manrope', sans-serif; font-weight: 700; font-size: 24px; color: #FFFFFF")}>pawkeep</p><p style={sx("margin: 10px 0 0; font-size: 15px; line-height: 1.6; max-width: 26em")}>Scooping, grooming, home vet care, training and farewell care, from one caretaker on one plan.</p></div>
            <div style={sx("display: flex; flex-wrap: wrap; gap: 56px; font-size: 15px")}>
              <div style={sx("display: flex; flex-direction: column; gap: 10px")}><p style={sx("margin: 0 0 4px; font-weight: 800; color: #FFFFFF")}>Services</p><a href="#services" style={sx("color: #D8D5DA; text-decoration: none")}>Grooming</a><a href="#services" style={sx("color: #D8D5DA; text-decoration: none")}>Home vet visits</a><a href="#services" style={sx("color: #D8D5DA; text-decoration: none")}>Training</a><a href="#farewell" style={sx("color: #D8D5DA; text-decoration: none")}>Farewell care</a></div>
              <div style={sx("display: flex; flex-direction: column; gap: 10px")}><p style={sx("margin: 0 0 4px; font-weight: 800; color: #FFFFFF")}>Company</p><a href="#about" style={sx("color: #D8D5DA; text-decoration: none")}>About</a><a href="#communities" style={sx("color: #D8D5DA; text-decoration: none")}>For communities</a><a href="#careers" style={sx("color: #D8D5DA; text-decoration: none")}>Careers</a></div>
              <div style={sx("display: flex; flex-direction: column; gap: 10px")}><p style={sx("margin: 0 0 4px; font-weight: 800; color: #FFFFFF")}>Contact</p><span>[YOUR EMAIL]</span><span>[YOUR PHONE NUMBER]</span></div>
            </div>
          </div>
          <div style={sx("max-width: 1280px; margin: 0 auto; padding: 20px 24px 30px; border-top: 1px solid #3A393E; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px; font-size: 14px; color: #B5B2B9")}><span>© 2026 PawKeep</span><span style={sx("display: flex; gap: 20px")}><a href="#privacy" style={sx("color: #B5B2B9")}>Privacy</a><a href="#terms" style={sx("color: #B5B2B9")}>Terms</a></span></div>
        </footer>
      </div>
    );
  }
}
