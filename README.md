# PawKeep landing page

React + Vite version of the PawKeep landing page (design Version 8: story scroll).

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

## Files

| File | What it is |
| --- | --- |
| `src/PawKeepLanding.jsx` | The whole page: state and logic in `renderVals()`, scroll engine in `componentDidMount()`, markup in `render()` |
| `src/pawkeep.css` | Keyframes, hover effects, responsive rules, reduced-motion rules |
| `src/sx.js` | Helper that turns inline CSS strings into React style objects |
| `index.html` | Page shell, meta tags and Google Fonts (Unbounded + Manrope) |

## Page sections (in order)

1. Sticky frosted header
2. **Story scroll**: a pinned yard scene with 6 chapters (Before, Scooping, Grooming, Vet visit, Training, Your plan). Pet name and dog/cat picker in chapter 1 personalise the whole page.
3. Plan builder with live monthly total (`#plan`)
4. "Booking apps vs PawKeep" comparison (`#why`)
5. HOA / apartment community quote form (`#communities`)
6. Farewell care (`#farewell`)
7. FAQ, final call to action, footer
8. Floating plan bar that appears once services are picked

## How the scroll story works

The story is smooth because it does **not** re-render React on every scroll frame:

- `componentDidMount()` runs a `requestAnimationFrame` loop that eases the scroll position (`this._cur` follows `this._target` at 12% per frame).
- `_apply()` writes CSS variables onto the story `<section>`: `--p` (overall progress), `--wipe` (yard clean-up), `--r0..--r5` (chapter bar fill), `--t0..--t3` (checklist ticks).
- Styles read those variables directly, for example `clip-path: inset(0 calc((1 - var(--wipe)) * 100%) 0 0)`.
- React state (`ch`, `piles`) only changes when the chapter or pile count changes, so the page re-renders a handful of times per scroll-through.
- Story length is the section height (`5400px`); the stage height is `min(100vh, 880px)`.

Keep this pattern if you add scroll effects: drive them with CSS variables, not `setState`.

## Data and state

All state lives in `this.state`: `ch`, `piles`, `petName`, `petType` (`dog` | `cat`), `scoop` (0 to 3 visits a week), `pets`, `groom` (0 to 2 a month), `vet`, `train`, `picked`. Prices are in `renderVals()`:

| Service | Placeholder price |
| --- | --- |
| Poop scooping | $79 / $139 / $189 a month for 1 / 2 / 3 visits a week |
| Extra pet | +$12 a month each |
| Grooming | $69 per session |
| Vet at home | $49 a month |
| Training | $119 a month |

## To do before launch

- **Replace placeholders:** all prices, `[YOUR PHONE NUMBER]`, `[YOUR EMAIL]`, the farewell-care FAQ answer, and the sample names Biscuit and Jamie.
- **Wire up the forms and buttons:** the community quote form and ZIP check use `noSubmit` (they do nothing yet); "Subscribe" and "Sign in" link to `#subscribe` and `#signin`.
- **Check the claims:** the comparison with "typical sitter booking apps", the 24-hour redo promise, and "licensed partner vets" must match what the business actually offers. If you name competitors (Rover, Care.com), verify every row first.
- **Add real photos** of caretakers and pets when you have them; the yard and objects are inline SVG illustrations.

## Suggested next steps for refactoring

- Split `render()` into section components (`StoryScroll`, `PlanBuilder`, `Comparison`, `Communities`, `FarewellCare`, `Faq`, `Footer`).
- Move the two yard SVGs (before / after) into their own components; they are the largest blocks in the file.
- Move prices and chapter copy into a config file or CMS.
- Optionally migrate to TypeScript, and to function components with hooks (`useRef` + `useEffect` for the scroll engine).

## Accessibility

Real buttons, labels and form controls throughout; `aria-live` on changing totals; visible focus rings; and every animation is switched off for visitors with "reduce motion" enabled.
# pet-scooping-UI-demo
